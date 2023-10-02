import {compare, hash} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {getRandomInt} from '@/utils/math';
import {DataStoredInToken, TokenData} from '@/interfaces/authInterface';
import config from '@/config';

const JWT_SECRET = config.token.jwt_secret;
const SESSION_EXPIRY = config.token.session_expiry;
const REFRESH_TOKEN_SECRET = config.token.refresh_token_secret;
const REFRESH_TOKEN_EXPIRY = config.token.refresh_token_expiry;

export class AuthService {
  public async hashPassword(password: string | Buffer): Promise<string> {
    return await hash(password, getRandomInt(10, 12));
  }

  public async compareHash(
    data: string | Buffer,
    encrypted: string
  ): Promise<boolean> {
    return await compare(data, encrypted);
  }

  public createCookie(tokenData: TokenData): string {
    return `x-refresh-token=${tokenData.token}; Secure; HttpOnly;`;
  }

  public createJWT(tokenData: TokenData): string {
    return `${tokenData.token}`;
  }

  public getToken(userId: string): TokenData {
    return this.createToken(userId, JWT_SECRET, SESSION_EXPIRY);
  }

  public getRefreshToken(userId: string): TokenData {
    return this.createToken(userId, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY);
  }

  private createToken(
    userId: string,
    secret: string,
    expiration: number
  ): TokenData {
    const dataStoredInToken: DataStoredInToken = {id: userId};
    const secretKey = secret;
    const expiresIn = expiration;

    return {expiresIn, token: sign(dataStoredInToken, secretKey, {expiresIn})};
  }
}