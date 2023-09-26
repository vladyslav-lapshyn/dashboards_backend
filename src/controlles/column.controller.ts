'use strict';

import { columnService } from '../services/column.service.js';
import { Controller } from '../types.js';

class ColumnController {
  private static instance: ColumnController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!ColumnController.instance) {
      ColumnController.instance = new ColumnController();
    }

    return ColumnController.instance;
  }

  createColumn: Controller = async (req, res) => {
    const { title } = req.body;
    const { dashboardId } = req.params;

    const normalizeDashboardId = Number(dashboardId);

    if (!title || isNaN(normalizeDashboardId)) {
      res.status(400).json({ message: 'Invalid request data' });

      return;
    }

    const columnData = await columnService.createColumn(
      normalizeDashboardId,
      title,
    );

    res.status(200).json(columnData);
  };

  getAllColumns: Controller = async (req, res) => {
    const { dashboardId } = req.params;

    const normalizeDashboardId = Number(dashboardId);

    const columns = await columnService.getAllColumns(normalizeDashboardId);

    res.status(200).json(columns);
  };

  updateColumn: Controller = async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    const normalizeId = Number(id);

    const updatedColumn = await columnService.updateColumn(
      normalizeId,
      title,
    );

    res.status(200).json(updatedColumn);
  };

  deleteColumn: Controller = async (req, res) => {
    const { id } = req.params;

    const normalizeId = Number(id);

    const deletedColumn = await columnService.deleteColumn(normalizeId);

    res.status(200).json(deletedColumn);
  };
}

export const columnController = ColumnController.getInstance();
