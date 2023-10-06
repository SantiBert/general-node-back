import {Password} from '@prisma/client';
import {compare, hash} from 'bcrypt';
import {getRandomInt} from '@/utils/math';
import prisma from '@/db';

export class PasswordService {
  public password = prisma.password;

  public async findByUserId(userId: string): Promise<Partial<Password> | null> {
    return await this.password.findUnique({
      select: {hash: true},
      where: {user_id: userId}
    });
  }

  public async create(data: Password): Promise<Partial<Password> | null> {
    return await this.password.create({select: {id: true}, data});
  }

  public async updateByUserId(
    userId: string,
    data: Partial<Password>
  ): Promise<Partial<Password> | null> {
    return await this.password.update({
      select: {hash: true},
      data,
      where: {user_id: userId}
    });
  }

  public async hashPassword(password: string | Buffer): Promise<string> {
    return await hash(password, getRandomInt(10, 12));
  }

  public async isPasswordMatching(
    user: any,
    password: string
  ): Promise<boolean> {
    const userPassword:any = await this.findByUserId(user ? user.id : '');
    return this.compareHash(
      password,
      userPassword ? userPassword.hash : await hash('', 10)
    );
  }

  private async compareHash(
    data: string | Buffer,
    encrypted: string
  ): Promise<boolean> {
    return await compare(data, encrypted);
  }
}
