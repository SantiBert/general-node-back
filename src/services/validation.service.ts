import {getRandomString} from '@/utils/math';
import {getDiferentialFromNow} from '@/utils/time';
import {Validation} from '@prisma/client';
import prisma from '@/db';

export class ValidationService {
  public validation = prisma.validation;
  private tokenSize = 64;
  private tokenValidity = 1800;

  public async findByToken(token: string): Promise<Partial<Validation> | null> {
    return await this.validation.findUnique({
      select: {user_id: true, created_at: true},
      where: {token}
    });
  }

  public async findByUserId(
    userId: string
  ): Promise<Partial<Validation> | null> {
    return await this.validation.findUnique({
      select: {token: true, created_at: true},
      where: {user_id: userId}
    });
  }

  public async create(userId: string): Promise<Partial<Validation> | null> {
    return await this.validation.create({
      select: {token: true, created_at: true},
      data: {
        user_id: userId,
        token: getRandomString(this.tokenSize)
      }
    });
  }

  public async deleteByToken(token: string): Promise<void> {
    await this.validation.delete({where: {token}});
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.validation.delete({where: {user_id: userId}});
  }

  public async deleteIfExists(token: string): Promise<void> {
    const findToken = await this.findByToken(token);
    if (findToken) {
      await this.deleteByToken(token);
    }
  }

  public async deleteIfUserHas(userId: string): Promise<void> {
    if (userId === undefined || !userId) {
      return;
    }
    const findToken = await this.findByUserId(userId);
    if (findToken) {
      await this.deleteByUserId(userId);
    }
  }

  public async isTokenValid(token: string): Promise<boolean> {
    const findToken = await this.findByToken(token);
    if (
      !findToken ||
      getDiferentialFromNow(findToken.created_at) >= this.tokenValidity
    ) {
      return false;
    }
    return true;
  }
}
