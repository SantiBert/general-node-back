import {Request} from 'express';
import {User} from '@prisma/client';

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
  token?: string;
}

export interface RequestWithVersion extends Request {
  version: string;
}

export interface Logout {
  id: string;
  token: string;
}