'use strict';

import { Dashboard } from '../models/Dashboard.model.js';
import { UpdatedFields } from '../types.js';

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
    return await Dashboard.create({ title });
  }

  async getDashboards(isOpened: boolean) {
    const where = {
      isOpened,
    };

    return await Dashboard.findAll({
      where,
      order: [
        ['isImportant', 'DESC'],
        ['createdAt', 'ASC'],
      ],
    });
  }

  async getDashboard(id: number) {
    return await Dashboard.findByPk(id);
  }

  async updateDashboard(id: number, updatedFields: UpdatedFields) {
    return await Dashboard.update(
      updatedFields,
      { where: { id } },
    );
  }

  async deleteDashboard(id: number) {
    return await Dashboard.destroy({
      where: { id },
    });
  }
}

export const dashboardService = DashboardService.getInstance();
