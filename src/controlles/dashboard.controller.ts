'use strict';

import { dashboardService } from '../services/dashboard.service.js';
import { Controller, UpdatedFields } from '../types.js';

class DashboardController {
  private static instance: DashboardController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!DashboardController.instance) {
      DashboardController.instance = new DashboardController();
    }

    return DashboardController.instance;
  }

  createDashboard: Controller = async (req, res) => {
    const { title } = req.body;

    if (!title) {
      res.status(400).json({ message: 'Title is required' });

      return;
    }

    const dashboard = await dashboardService.createDashboard(title);

    res.status(200).json(dashboard);
  };

  getDashboards: Controller = async (req, res) => {
    const { isOpened } = req.query;

    if (!isOpened) {
      res.status(400).json({ message: 'The isOpened parameter is required' });

      return;
    }

    if (isOpened !== 'true' && isOpened !== 'false') {
      res.status(400).json({
        message: 'The isOpened parameter can have only one parameter true or false',
      });

      return;
    }

    const isOpenedBoolean = isOpened === 'true';

    const dashboardData = await dashboardService.getDashboards(isOpenedBoolean);

    res.status(200).json(dashboardData);
  };

  getDashboard: Controller = async (req, res) => {
    const { id } = req.params;

    const normalizeId = Number(id);

    const dashboardData = await dashboardService.getDashboard(normalizeId);

    res.status(200).json(dashboardData);
  };

  updateDashboard: Controller = async (req, res) => {
    const { title, isOpened, important } = req.body;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'id parameter is required' });

      return;
    }

    if (!title && !isOpened && !important) {
      res.status(400).json({
        message: 'At least one field (title, isOpened, important) must be provided for updating',
      });

      return;
    }

    if (isOpened && isOpened !== 'true' && isOpened !== 'false') {
      res.status(400).json({
        message: 'Field isOpened can has only one of two value true or false',
      });

      return;
    }

    if (important && important !== 'true' && important !== 'false') {
      res.status(400).json({
        message: 'Field important can has only one of two value true or false',
      });
    }

    const updatedFields: UpdatedFields = {};

    if (title) {
      updatedFields.title = title;
    }

    if (isOpened) {
      updatedFields.isOpened = isOpened === 'true';
    }

    if (important) {
      updatedFields.important = important === 'true';
    }

    const normalizeId = Number(id);

    const dashboardData = await dashboardService.updateDashboard(normalizeId, updatedFields);

    if (dashboardData[0] === 0) {
      res.status(404).json({ message: `Dashboard with id ${normalizeId} not found` });

      return;
    }

    res.status(200).json({ message: 'Dashboard updated successfully' });
  };

  deleteDashboard: Controller = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'id parameter is required' });

      return;
    }

    const normalizeId = Number(id);

    const dashboardData = await dashboardService.deleteDashboard(normalizeId);

    if (dashboardData === 0) {
      res.status(404).json({ message: `Dashboard with id ${normalizeId} not found` });

      return;
    }

    console.log(dashboardData);

    res.status(200).json({ message: 'Dashboard deleted successfully' });
  };
}

export const dashboardController = DashboardController.getInstance();
