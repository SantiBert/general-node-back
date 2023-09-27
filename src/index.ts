import App from '@/app';
import HelloRoute from './routes/hello.routes';

const app = new App([
    new HelloRoute()
]);

app.listen();