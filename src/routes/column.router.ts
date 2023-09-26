'use strict';

import express from 'express';
import { columnController } from '../controlles/column.controller.js';

export const columnRouter = express.Router();

columnRouter.post('/create/:dashboardId', columnController.createColumn);
columnRouter.get('/dashboard/:dashboardId', columnController.getAllColumns);
columnRouter.patch('/:id/update', columnController.updateColumn);
columnRouter.delete('/:id/delete', columnController.deleteColumn);
