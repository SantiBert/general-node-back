import {Router} from 'express';
import {Routes} from '@interfaces/routes.interface';
import MessageResponse from '@interfaces/response.interfaces';

class HelloRoute implements Routes {
  public path = '';
  public router = Router();

  public constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get<{}, MessageResponse>('/', (req, res) => {
        res.json({
          message: 'API - 👋🌎🌍🌏',
        });
      });
  }
}

export default HelloRoute;