'use strict';

import { Dashboard } from '../models/Dashboard.model.js';
import { Columns } from '../models/Columns.model.js';

class ColumnService {
  private static instance: ColumnService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): ColumnService {
    if (!ColumnService.instance) {
      ColumnService.instance = new ColumnService();
    }

    return ColumnService.instance;
  }

  async createColumn(dashboardId: number, title: string) {
    const dashboard = await Dashboard.findByPk(dashboardId);

    if (!dashboard) {
      throw new Error('Dashboard not found');
    }

    const column = await Columns.create({ title, dashboardId });

    return column;
  }

  async getAllColumns(dashboardId: number) {
    const columns = await Columns.findAll({
      where: { dashboardId }
    });

    return columns;
  }

  async updateColumn(id: number, title: string) {
    const updatedColumn = await Columns.update(
      { title, },
      { where: { id } }
    );

    return updatedColumn;
  }

  async deleteColumn(id: number) {
    const deletedColumn = await Columns.destroy(
      { where: { id } }
    );

    return deletedColumn;
  }
}

export const columnService = ColumnService.getInstance();
