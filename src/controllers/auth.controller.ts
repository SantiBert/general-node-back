import {NextFunction, Request, Response} from 'express';
import {
    ActivateAccountDto, 
    LogInDto, 
    SignupDto 
} from '@/dtos/auth.dto';
import { 
    AuthService, 
    PasswordService,
    SessionService,
    UserService,
    ValidationService
} from '@/services';
import { 
    userAlreadyActivatedException, 
    userAlreadyExistsException,
    userDisabledException,
    userOrPasswordWrongException,
    userPendingVerificationException
} from '@/errors/users.error';
import { STATUS_CODES,UserRoles, UserStatus } from '@/constants';
import { getISONow } from '@/utils/time';
import { invalidTokenException } from '@/errors/auth.error';
import { checkUserLoginGuard } from '@/guards/users.guard';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@prisma/client';

const enum SignupFlow {
    CREATE = 'create',
    UPDATE = 'update'
  }

class AuthController {
    public auth = new AuthService();
    public users = new UserService();
    public password = new PasswordService();
    public session = new SessionService();
    public validation = new ValidationService();

    public signUp = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
            const userData:SignupDto = req.body;
            let flow = SignupFlow.CREATE;
            const findUser = await this.users.findByEmail(userData.email);
            if (findUser) {
                if (!findUser.is_active) {
                    throw userAlreadyExistsException(
                        `The email ${userData.email} already exists`
                      );
                }
                flow = SignupFlow.UPDATE;
            }
            const createUserData: any = {
                full_name: userData.full_name,
                phone_number: userData.phone_number,
                email: userData.email, role: {connect: {id: UserRoles.USER}},
                status: {connect: {id: UserStatus.PENDING_VERIFICATION}}
              };

            const createdUserData =
            flow === SignupFlow.CREATE 
            ? await this.users.create(createUserData)
            : await this.users.updateById(findUser.id, createUserData);
            
            const createPasswordData: any = 
            flow === SignupFlow.CREATE
            ? {
                hash: await this.auth.hashPassword(userData.password),
                user: {connect: {id: createdUserData.id}}
            }
            : {
                hash: await this.auth.hashPassword(userData.password)
            };

            const [createdValidation] = await Promise.all([
                this.validation.create(createdUserData.id),
                flow === SignupFlow.CREATE
                  ? this.password.create(createPasswordData)
                  : this.password.updateByUserId(findUser.id, createPasswordData),
              ]);

            if (flow === SignupFlow.UPDATE) {
                await this.users.updateById(createdUserData.id, {
                  deleted_at: null,
                  created_at: getISONow()
                });
              }
        

            res.status(STATUS_CODES.CREATED).json({
                data: createdUserData,
                message:
                  `Email: ${createdUserData.email} Password:  ${createdValidation.token}`
              });
        }catch (error) {
            next(error);
        }
    }

    public activateAccount = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const userData: ActivateAccountDto = req.body;
          const isTokenValid = await this.validation.isTokenValid(userData.hash);
          if (!isTokenValid) {
            throw invalidTokenException('Error activating account');
          }
    
          const validationData = await this.validation.findByToken(userData.hash);
          await this.validation.deleteByUserId(validationData.user_id);
    
          const findUser = await this.users.findById(validationData.user_id);
    
          if (findUser.status_id !== UserStatus.PENDING_VERIFICATION) {
            throw userAlreadyActivatedException('Error activating account');
          }
    
          this.users.updateById(validationData.user_id, {
            status_id: UserStatus.ACTIVE
          });
    
          res.status(STATUS_CODES.OK).json({
            data: {id: validationData.user_id},
            message: 'Account has been activated'
          });
        } catch (error) {
          next(error);
        }
    };

    public logIn = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          // always call isPasswordMatching for comparison even though the user do not exists to prevent timing attacks
          const userData: LogInDto = req.body;
          const findUser: any = await this.users.findByEmail(userData.email);
          const isPasswordMatching = await this.password.isPasswordMatching(
            findUser,
            userData.password
          );
          if (
            !findUser ||
            (await this.users.isUserDeleted(userData.email)) ||
            !isPasswordMatching
          ) {
            throw userOrPasswordWrongException('Invalid user or password.');
          }
    
          if (findUser.status_id === UserStatus.PENDING_VERIFICATION) {
            const validationData = await this.validation.findByUserId(findUser.id);
            const isTokenValid = await this.validation.isTokenValid(
              validationData ? validationData.token : ''
            );
            if (isTokenValid) {
              throw userPendingVerificationException(
                'You need to activate your account before login. Please check your email address for a confirmation email.'
              );
            }
            await this.validation.deleteIfUserHas(findUser.id);
            const createdValidation = await this.validation.create(findUser.id);
            
            //Imprimir token createdValidation.token
            
            throw userPendingVerificationException(
              'You need to activate your account before login in. Please check your email address for a confirmation email.'
            );
          } else if (findUser.status_id === UserStatus.DISABLED) {
            await this.validation.deleteIfUserHas(findUser.id);
            const createdValidation = await this.validation.create(findUser.id);
    
            //Imprimir token createdValidation.token

            throw userDisabledException(
              'Your account is disabled. We will send you a reactivation email.'
            );
          }
    
          checkUserLoginGuard(findUser);
         
          const token = this.auth.getToken(findUser.id);
          // const refreshToken = this.auth.getRefreshToken(findUser.id);
    
          // await this.session.create(findUser.id, refreshToken.token);
          await this.session.create(findUser.id, token.token);
    
          const tokenJWT = this.auth.createJWT(token);
          // const cookie = this.auth.createCookie(refreshToken);
    
          // res.setHeader('Set-Cookie', [cookie]);
          res.status(STATUS_CODES.OK).json({
            data: {id: findUser.id, token: tokenJWT},
            message: 'Login successful'
          });
        } catch (error) {
          next(error);
        }
    };

    public logOut = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const userData: User = req.user;
          const refreshToken: string = req.cookies['x-refresh-token'];
          await this.session.deleteByUserIdAndToken(userData.id, refreshToken);
    
          res.setHeader('Set-Cookie', [`x-refresh-token=; Secure; HttpOnly;`]);
          res.status(STATUS_CODES.OK).json({
            message: 'Logout successful'
          });
        } catch (error) {
          next(error);
        }
    };

}

export default AuthController;