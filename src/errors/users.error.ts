import {STATUS_CODES} from '@/constants/statusCodes.constants';
import {createException} from '@/exceptions/HttpException';

export const USER_BAD_DATA = 'user_bad_data';
export const userBadDataException = createException(
  USER_BAD_DATA,
  STATUS_CODES.BAD_REQUEST
);

export const USER_ALREADY_ACTIVATED = 'user_already_activated';
export const userAlreadyActivatedException = createException(
  USER_ALREADY_ACTIVATED,
  STATUS_CODES.CONFLICT
);

export const USER_ALREADY_EXISTS = 'user_already_exists';
export const userAlreadyExistsException = createException(
  USER_ALREADY_EXISTS,
  STATUS_CODES.CONFLICT
);

export const USER_BLOCKED = 'user_blocked';
export const userBlockedException = createException(
  USER_BLOCKED,
  STATUS_CODES.CONFLICT
);

export const USER_INACTIVE = 'user_inactive';
export const userInactiveException = createException(
  USER_INACTIVE,
  STATUS_CODES.CONFLICT
);

export const USER_DISABLED = 'user_disabled';
export const userDisabledException = createException(
  USER_DISABLED,
  STATUS_CODES.CONFLICT
);

export const USER_NOT_ACTIVE = 'user_not_active';
export const userNotActiveException = createException(
  USER_NOT_ACTIVE,
  STATUS_CODES.CONFLICT
);

export const USER_NOT_FOUND = 'user_not_found';
export const userNotFoundException = createException(
  USER_NOT_FOUND,
  STATUS_CODES.NOT_FOUND
);

export const USER_OR_PASSWORD_WRONG = 'user_or_password_wrong';
export const userOrPasswordWrongException = createException(
  USER_OR_PASSWORD_WRONG,
  STATUS_CODES.CONFLICT
);

export const USER_PENDING_VERIFICATION = 'user_pending_verification';
export const userPendingVerificationException = createException(
  USER_PENDING_VERIFICATION,
  STATUS_CODES.CONFLICT
);

export const USER_ATTRIBUTE_NOT_SET = 'user_attribute_not_set';
export const userAttributeNotSetException = createException(
  USER_ATTRIBUTE_NOT_SET,
  STATUS_CODES.CONFLICT
);
