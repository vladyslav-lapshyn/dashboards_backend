'use strict';

import express from 'express';
import { dashboardController } from '../controlles/dashboard.controller.js';

export const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardController.getDashboards);
dashboardRouter.post('/create', dashboardController.createDashboard);
dashboardRouter.patch('/update/:id', dashboardController.updateDashboard);
dashboardRouter.delete('/delete/:id', dashboardController.deleteDashboard);
dashboardRouter.get('/:id/details', dashboardController.getDashboard);
