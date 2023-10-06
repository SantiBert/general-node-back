import {User} from '@prisma/client';
import prisma from '@/db';

import {getISONow} from '@/utils/time';

export class UserService{
    public user = prisma.user;

    public async findById(id: string): Promise<Partial<User> | null> {
        return await this.user.findFirst({
          select: {
            email: true,
            full_name:true,
            phone_number:true,
            status_id:true,
            role_id:true,
            created_at:true,
            is_active:true,

          },
          where: {id}
        });
      }
    
    public async findByEmail(email: string): Promise<Partial<User> | null> {
        return await this.user.findUnique({
          select: {
            id: true, 
            email: true,
            full_name:true,
            phone_number:true,
            status_id:true,
            role_id:true,
            created_at:true,
            is_active:true,
          },
          where: {email}
        });
      }
      public async findCurrent(id: string): Promise<Partial<User> | null> {
        return await this.user.findUnique({
          select: {
            id: true, 
            email: true,
            full_name:true,
            phone_number:true,
            status_id:true,
            role_id:true,
            created_at:true,
            is_active:true,
          },
          where: {id}
        });
      }

    public async create(data: User): Promise<Partial<User> | null> {
        return await this.user.create({select: {id: true, email: true}, data});
      }
    
    public async updateById(
        id: string,
        data: Partial<User>
      ): Promise<Partial<User> | null> {
        return await this.user.update({
          select: {id: true, email: true},
          data: {...data, updated_at: getISONow()},
          where: {id}
        });
      }
    public async isUserDeleted(email: string): Promise<boolean> {
      const user = await this.user.findUnique({
        select: {deleted_at: true},
        where: {email}
      });
      return user.deleted_at ? true : false;
      }
}