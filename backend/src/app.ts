import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
=======
import helmet from 'helmet';
>>>>>>> e054afa1 (Save 1)
import { env } from './config/env';
import { requestContext } from './middlewares/request-context.middleware';
import { routes } from './routes';
import { errorHandler, notFound } from './middlewares/error.middleware';

export function createApp() {
  const app = express();

<<<<<<< HEAD
  app.use(cors({ origin: env.corsOrigin === '*' ? true : env.corsOrigin }));
=======
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  const allowAll = env.corsOrigins.includes('*');
  app.use(
    cors({
      origin: allowAll ? true : env.corsOrigins,
      credentials: !allowAll,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
>>>>>>> e054afa1 (Save 1)
  app.use(express.json({ limit: '2mb' }));
  app.use(requestContext);

  app.use('/api', routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
