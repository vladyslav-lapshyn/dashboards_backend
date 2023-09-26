'use strict';

import { Dashboard } from '../models/Dashboard.model.js';

class DashboardService {
  private static instance: DashboardService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }

    return DashboardService.instance;
  }

  async createDashboard(title: string) {
    const dashboard = await Dashboard.create({ title });

    return dashboard;
  }

  async getAllDashboards() {
    const dashboards = await Dashboard.findAll();

    return dashboards;
  }

  async getDashboard(id: number) {
    const dashboard = await Dashboard.findByPk(id);

    return dashboard;
  }

  async updateDashboard(id: number, title: string) {
    const dashboard = await Dashboard.update(
      { title },
      { where: { id } },
    );

    return dashboard;
  }

  async deleteDashboard(id: number) {
    const dashboard = await Dashboard.destroy({
      where: { id },
    });

    return dashboard;
  }
}

export const dashboardService = DashboardService.getInstance();
