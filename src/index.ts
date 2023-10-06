import App from '@/app';
import HelloRoute from './routes/hello.routes';
import AuthRoute from './routes/auth.routes';

const app = new App([
    new HelloRoute(),
    new AuthRoute()
]);

app.listen();