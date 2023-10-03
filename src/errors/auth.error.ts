import {STATUS_CODES} from '@/constants/statusCodes.constants';
import {createException} from '@/exceptions/HttpException';

export const ROLE_LACK_PERMISSION = 'role_lack_permission';
export const roleLackPermissionException = createException(
  ROLE_LACK_PERMISSION,
  STATUS_CODES.FORBIDDEN
);

export const MISSING_AUTH_TOKEN = 'missing_authentication_token';
export const missingAuthTokenException = createException(
  MISSING_AUTH_TOKEN,
  STATUS_CODES.NOT_FOUND
);

export const WRONG_AUTH_TOKEN = 'wrong_authentication_token';
export const wrongAuthTokenException = createException(
  WRONG_AUTH_TOKEN,
  STATUS_CODES.UNAUTHORIZED
);

export const MISSING_REFRESH_TOKEN = 'missing_refresh_token';
export const missingRefreshTokenException = createException(
  MISSING_REFRESH_TOKEN,
  STATUS_CODES.NOT_FOUND
);

export const WRONG_REFRESH_TOKEN = 'wrong_refresh_token';
export const wrongRefreshTokenException = createException(
  WRONG_REFRESH_TOKEN,
  STATUS_CODES.UNAUTHORIZED
);

export const CANT_CREATE_SESSION = 'cant_create_session';
export const cantCreateSessionException = createException(
  CANT_CREATE_SESSION,
  STATUS_CODES.CONFLICT
);

export const INVALID_TOKEN = 'invalid_token';
export const invalidTokenException = createException(
  INVALID_TOKEN,
  STATUS_CODES.CONFLICT
);
