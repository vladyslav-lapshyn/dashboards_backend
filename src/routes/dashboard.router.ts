'use strict';

import express from 'express';
import { dashboardController } from '../controlles/dashboard.controller.js';

export const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardController.getAllDashboards);
dashboardRouter.post('/create', dashboardController.createDashboard);
dashboardRouter.patch('/:id/update', dashboardController.updateDashboard);
dashboardRouter.delete('/:id/delete', dashboardController.deleteDashboard);
dashboardRouter.get('/:id/details', dashboardController.getDashboard);
