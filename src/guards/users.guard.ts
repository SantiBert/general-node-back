import {UserStatus} from '@/constants/user.constants';
import {
  userDisabledException,
  userBlockedException,
  userInactiveException,
  userPendingVerificationException
} from '@/errors/users.error';
import {User} from '@prisma/client';

export function isUserDisabledGuard(user: User): void {
  if (user.status_id === UserStatus.DISABLED) {
    throw userDisabledException('User disabled');
  }
}

export function isUserBlockedGuard(user: User): void {
  if (user.status_id === UserStatus.BLOCKED) {
    throw userBlockedException('User blocked');
  }
}

export function isUserInactiveGuard(user: User): void {
  if (user.status_id === UserStatus.INACTIVE) {
    throw userInactiveException('User inactive');
  }
}

export function isUserPendingVerificationGuard(user: User): void {
  if (user.status_id === UserStatus.PENDING_VERIFICATION) {
    throw userPendingVerificationException('User not verified');
  }
}

export function checkUserLoginGuard(user: User): void {
  isUserBlockedGuard(user);
  isUserInactiveGuard(user);
}

export function checkUserValidateOTPGuard(user: User): void {
  isUserBlockedGuard(user);
  isUserInactiveGuard(user);
}
