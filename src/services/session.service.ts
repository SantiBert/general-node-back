import {getDiferentialFromNow} from '@/utils/time';
import {Session} from '@prisma/client';
import prisma from '@/db';

export class SessionService {
  public session = prisma.session;
  private tokenValidity = 1296000; // 15 days

  public async findByToken(token: string): Promise<Partial<Session> | null> {
    return await this.session.findUnique({
      select: {id: true, user_id: true, created_at: true},
      where: {token}
    });
  }

  public async findById(id: number): Promise<Partial<Session> | null> {
    return await this.session.findUnique({
      select: {token: true, user_id: true, created_at: true},
      where: {id}
    });
  }

  public async create(
    userId: string,
    refreshToken: string
  ): Promise<Partial<Session> | null> {
    return await this.session.create({
      select: {id: true},
      data: {
        user_id: userId,
        token: refreshToken
      }
    });
  }

  public async updateById(
    id: number,
    data: Partial<Session>
  ): Promise<Partial<Session> | null> {
    return await this.session.update({
      select: {token: true, user_id: true},
      data: data,
      where: {id}
    });
  }

  public async deleteManyByUserId(userId: string): Promise<void> {
    await this.session.deleteMany({where: {user_id: userId}});
  }

  public async deleteByUserIdAndToken(
    userId: string,
    token: string
  ): Promise<void> {
    await this.session.deleteMany({
      where: {
        AND: [{token}, {user_id: userId}]
      }
    });
  }

  public async isTokenValid(token: string): Promise<boolean> {
    // we always compare with create_at field, if we compare with update_at the refresh token won't ever expire
    const findToken:any = await this.findByToken(token);
    if (
      !findToken ||
      getDiferentialFromNow(findToken.created_at) >= this.tokenValidity
    ) {
      return false;
    }
    return true;
  }
}
