import {Router} from 'express';
import AuthController from '@controllers/auth.controller';
import {
  ActivateAccountDto,
  LogInDto,
  LogOutDto,
  SignupDto,
  ResetPasswordVerifyDto,
  ResetPasswordEmailDto,
  ResetPasswordSMSDto,
  ChangePasswordEmailDto,
  ChangePasswordSMSDto,
  ResendActivateAccountEmailDto,
  ResendResetPasswordEmailDto,
  ResendResetPasswordSMSDto,
  ValidateOTPDto,
  //ValidateHashedOTPDto,
  CreateRefreshTokenDto
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
      authMiddleware(true),
      this.authController.logOut
    );
    this.router.post(
      `${this.path}reset_password_verify`,
      validationMiddleware(ResetPasswordVerifyDto, 'body'),
      this.authController.resetPasswordVerify
    );
    this.router.post(
      `${this.path}reset_password_email`,
      validationMiddleware(ResetPasswordEmailDto, 'body'),
      this.authController.resetPasswordEmail
    );
    this.router.post(
      `${this.path}reset_password_sms`,
      validationMiddleware(ResetPasswordSMSDto, 'body'),
      this.authController.resetPasswordSMS
    );
    this.router.post(
      `${this.path}change_password_email`,
      validationMiddleware(ChangePasswordEmailDto, 'body'),
      this.authController.changePasswordEmail
    );
    this.router.post(
      `${this.path}change_password_sms`,
      validationMiddleware(ChangePasswordSMSDto, 'body'),
      this.authController.changePasswordSMS
    );
    this.router.post(
      `${this.path}resend_activate_account_email`,
      validationMiddleware(ResendActivateAccountEmailDto, 'body'),
      this.authController.resendActivationAccountEmail
    );
    this.router.post(
      `${this.path}resend_reset_password_email`,
      validationMiddleware(ResendResetPasswordEmailDto, 'body'),
      this.authController.resendResetPasswordEmail
    );
    this.router.post(
      `${this.path}resend_reset_password_sms`,
      validationMiddleware(ResendResetPasswordSMSDto, 'body'),
      this.authController.resendResetPasswordSMS
    );
    this.router.post(
      `${this.path}validate_otp`,
      validationMiddleware(ValidateOTPDto, 'body'),
      this.authController.validateOTP
    );
    /*
    this.router.post(
      `${this.path}validate_hashed_otp`,
      validationMiddleware(ValidateHashedOTPDto, 'body'),
      otpAndEmailFromBase64,
      validationMiddleware(ValidateOTPDto, 'body'),
      this.authController.validateOTP
    );
    */
    this.router.post(
      `${this.path}refresh_token`,
      validationMiddleware(CreateRefreshTokenDto, 'body'),
      this.authController.refreshToken
    );
  }
}

export default AuthRoute;
