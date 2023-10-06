import config from '@/config';
import {generateOTP} from '@/utils/otp';
import {getDiferentialFromNow} from '@/utils/time';
import {OTP} from '@prisma/client';
import prisma from '@/db';

export class OTPService {
  public otp = prisma.oTP;
  private otpValidity = config.otp.expiry;

  public async findByOTP(otp: string): Promise<Partial<OTP> | null> {
    return await this.otp.findUnique({
      select: {user_id: true, created_at: true},
      where: {code: otp}
    });
  }

  public async findByUserId(userId: string): Promise<Partial<OTP> | null> {
    return await this.otp.findUnique({
      select: {code: true, created_at: true},
      where: {user_id: userId}
    });
  }

  public async create(userId: string): Promise<Partial<OTP> | null> {
    return await this.otp.create({
      select: {code: true, created_at: true},
      data: {
        code: generateOTP(),
        user_id: userId
      }
    });
  }

  public async deleteByOTP(otp: string): Promise<void> {
    await this.otp.delete({where: {code: otp}});
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.otp.delete({where: {user_id: userId}});
  }

  public async deleteIfExists(otp: string): Promise<void> {
    const findOTP = await this.findByOTP(otp);
    if (findOTP) {
      await this.deleteByOTP(otp);
    }
  }

  public async deleteIfUserHas(userId: string): Promise<void> {
    const findOTP = await this.findByUserId(userId);
    if (findOTP) {
      await this.deleteByUserId(userId);
    }
  }

  public async isOTPValid(otp: string): Promise<boolean> {
    const findOTP = await this.findByOTP(otp);
    if (
      !findOTP ||
      getDiferentialFromNow(findOTP.created_at) >= this.otpValidity
    ) {
      return false;
    }
    return true;
  }
}
