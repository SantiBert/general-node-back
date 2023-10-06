import {NextFunction, Response} from 'express';
import {verify} from 'jsonwebtoken';
import {SessionService, UserService} from '@/services';
import config from '@config';
import {DataStoredInToken, RequestWithUser} from '@interfaces/auth.interface';
import {
  missingAuthTokenException,
  wrongAuthTokenException
} from '@/errors/auth.error';

const authMiddleware =
  (publicRoute = false) =>
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const session = new SessionService();
    try {
      const authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1]: null;
      
      if (publicRoute && !authorization) {
        req.user = null;
        return next();
      }

      const validateSession = await session.findByToken(authorization);
      if (authorization && validateSession) {
        const secretKey: string = config.token.jwt_secret;
        const verificationResponse = (await verify(authorization, secretKey, {
          ignoreExpiration: true
        })) as DataStoredInToken;
        const userId = verificationResponse.id;

        const users = new UserService();
        const findUser = await users.findCurrent(userId);

        if (findUser) {
          req.user = {...findUser, id: userId} as any;
          req.token = authorization;
          next();
        } else {
          next(wrongAuthTokenException('Wrong authentication token'));
        }
      } else {
        next(missingAuthTokenException('Authentication token missing'));
      }
    } catch (error) {
      next(wrongAuthTokenException('Wrong authentication token'));
    }
  };

export default authMiddleware;
