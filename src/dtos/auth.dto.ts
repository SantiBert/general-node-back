import {
    IsEmail,
    IsString,
    // isPhoneNumber,
    ValidateIf,
    MaxLength,
    IsHexadecimal
  } from 'class-validator';
  
  class EmailValidator {
    @IsEmail()
    public email: string;
  }
  
  export class SignupDto extends EmailValidator {
    @IsString()
    public full_name: string;
  
    // @IsPhoneNumber()
    @IsString()
    @ValidateIf((object, value) => value !== null)
    public phone_number: string | null;
  
    @IsString()
    @MaxLength(72)
    public password: string;
  }
  
  export class ActivateAccountDto {
    @IsHexadecimal()
    @MaxLength(128)
    public hash: string;
  }
  
  export class LogInDto extends EmailValidator {
    @IsString()
    @MaxLength(72)
    @ValidateIf((object, value) => value !== null)
    public password: string;
  }
  
  export class LogOutDto {}
  
  