import * as otpGenerator from 'otp-generator';
import config from '@/config';

const OTP_LEN = config.otp.length;

export function generateOTP(
  opts: Record<string, boolean> = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  }
): string {
  return otpGenerator.generate(OTP_LEN, opts);
}
