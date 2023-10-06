import {STATUS_CODES} from '@/constants/statusCodes.constants';
import {createException} from '@/exceptions/HttpException';

export const INVALID_VERSION_FORMAT = 'invalid_version_format';
export const invalidVersionFormatException = createException(
  INVALID_VERSION_FORMAT,
  STATUS_CODES.BAD_REQUEST
);

export const OTP_EXPIRED = 'otp_expired';
export const otpExpiredException = createException(
  OTP_EXPIRED,
  STATUS_CODES.CONFLICT
);

export const OTP_NOT_MATCHING = 'otp_not_matching';
export const otpNotMatchingException = createException(
  OTP_NOT_MATCHING,
  STATUS_CODES.CONFLICT
);

export const OTP_NOT_VERIFIED = 'otp_not_verified';
export const otpNotVerifiedException = createException(
  OTP_NOT_VERIFIED,
  STATUS_CODES.CONFLICT
);

export const VALIDATION_ERROR = 'validation_error';
export const validationErrorException = createException(
  VALIDATION_ERROR,
  STATUS_CODES.BAD_REQUEST
);

export const GENERIC_ERROR = 'generic_error';
export const genericErrorException = createException(
  GENERIC_ERROR,
  STATUS_CODES.CONFLICT
);

export const TOO_MANY_REQUESTS_ERROR = 'too_many_requests_error';
export const tooManyRequestsErrorException = createException(
  TOO_MANY_REQUESTS_ERROR,
  STATUS_CODES.TOO_MANY_REQUESTS
);
