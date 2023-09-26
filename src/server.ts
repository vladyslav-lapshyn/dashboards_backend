'use strict';

import cors from 'cors';
import express from 'express';
import { initDB } from './utils/initDB.js';
import { dashboardRouter } from './routes/dashboard.router.js';
import { columnRouter } from './routes/column.router.js';
import { taskRouter } from './routes/task.router.js';

const corsOptions = {
  origin: '*',
};

export const createServer = () => {
  const app = express();

  initDB();
  app.use(cors(corsOptions));
  app.use('/dashboards', express.json(), dashboardRouter);
  app.use('/columns', express.json(), columnRouter);
  app.use('/tasks', express.json(), taskRouter);

  app.use('/', (_, res) => {
    res.send('Hello world');
  });

  return app;
};
