import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import {Routes} from '@interfaces/routes.interface';
import {logger} from '@utils/logger';

require('dotenv').config({ path: '.env.local' });
const BASE_PATH = config.app.base_path;
const APP_PORT = config.app.port;
const APP_ENV = config.environment;

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;
    public socket: any;

    public constructor(routes: Routes[]) {
        this.app = express();
        this.env = APP_ENV || 'development';
        this.port = APP_PORT || 3000;
    
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
      }

      public listen(): void {
        this.app.listen(this.port, () =>{
          logger.info(`=================================`);
          logger.info(`======= ENV: ${this.env} =======`);
          logger.info(`🚀 App listening on the port ${this.port}`);
          logger.info(`=================================`);
        });
      }

      private initializeMiddlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
      }
      private initializeRoutes(routes: Routes[]): void {
        routes.forEach((route) => {
          this.app.use(BASE_PATH, route.router);
        });
      }
      private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
      }
}
export default App;