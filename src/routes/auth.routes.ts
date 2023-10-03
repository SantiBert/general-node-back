import {Router} from 'express';
import AuthController from '@controllers/auth.controller';
import {
  ActivateAccountDto,
  LogInDto,
  LogOutDto,
  SignupDto
} from '@dtos/auth.dto';
import {Routes} from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  public constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}signup`,
      validationMiddleware(SignupDto, 'body'),
      this.authController.signUp
    );
    this.router.post(
      `${this.path}activate_account`,
      validationMiddleware(ActivateAccountDto, 'body'),
      this.authController.activateAccount
    );
    this.router.post(
      `${this.path}login`,
      validationMiddleware(LogInDto, 'body'),
      this.authController.logIn
    );
    this.router.post(
      `${this.path}logout`,
      validationMiddleware(LogOutDto, 'body'),
      authMiddleware(),
      this.authController.logOut
    );
  }
}

export default AuthRoute;
