import {config} from 'dotenv';
import {Config} from './types';
import {ENVIRONMENTS} from '@/constants';

config({path: `.env.local`});

const generateConfig = (): Config => {
  const missingKeys: string[] = [];
  const getEnvVar = (key: string, defaultValue?: string): string => {
    if (!process.env[key] && defaultValue === undefined) {
      missingKeys.push(key);
    }
    return (process.env[key] || defaultValue) as string;
  };
  const environment = process.env.NODE_ENV || ENVIRONMENTS.LOCAL;

  const config: Config = {
    environment,
    app: {
      base_path: getEnvVar('BASE_PATH', '/api'),
      log_dir: getEnvVar('LOG_DIR','../logs'),
      port: Number(getEnvVar('PORT', '3000')),
    },
    token: {
      jwt_secret: getEnvVar('JWT_SECRET'),
      session_expiry: Number(getEnvVar('SESSION_EXPIRY')),
      refresh_token_secret: getEnvVar('REFRESH_TOKEN_SECRET'),
      refresh_token_expiry: Number(getEnvVar('REFRESH_TOKEN_EXPIRY'))
    }
  };
  if (missingKeys.length) {
    throw new Error(
      `The following environment variables are missing: ${missingKeys}`
    );
  }
  
  return config;
};

export default generateConfig();
