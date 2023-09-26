'use strict';

import { dashboardService } from '../services/dashboard.service.js';
import { Controller } from '../types.js';

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
      res.status(400).json({ message: 'Title is requeried' });

      return;
    }

    const dashboard = await dashboardService.createDashboard(title);

    res.status(200).json(dashboard);
  };

  getAllDashboards: Controller = async (req, res) => {
    const dashboardData = await dashboardService.getAllDashboards();

    res.status(200).json(dashboardData);
  };

  getDashboard: Controller = async (req, res) => {
    const { id } = req.params;

    const normalizeId = Number(id);

    const dashboardData = await dashboardService.getDashboard(normalizeId);

    res.status(200).json(dashboardData);
  };

  updateDashboard: Controller = async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    const normalizeId = Number(id);

    const dashboardData = await dashboardService.updateDashboard(normalizeId, title);

    res.status(200).json(dashboardData);
  };

  deleteDashboard: Controller = async (req, res) => {
    const { id } = req.params;

    const normalizeId = Number(id);

    const dashboardData = await dashboardService.deleteDashboard(normalizeId);

    res.status(200).json(dashboardData);
  };
}

export const dashboardController = DashboardController.getInstance();
