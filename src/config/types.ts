
type AppConfig = {
  base_path: string;
  log_dir: string;
  port: number;
};

type TokenConfig = {
  jwt_secret: string;
  session_expiry: number;
  refresh_token_secret: string;
  refresh_token_expiry: number;
};

export type Config = {
  environment: string;
  app: AppConfig;
  token: TokenConfig;
};
