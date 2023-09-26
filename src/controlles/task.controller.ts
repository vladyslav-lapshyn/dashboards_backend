'use strict';

import { taskService } from '../services/task.service.js';
import { Controller } from '../types.js';

class TaskController {
  private static instance: TaskController | null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!TaskController.instance) {
      TaskController.instance = new TaskController();
    }

    return TaskController.instance;
  }

  createTask: Controller = async (req, res) => {
    const { title } = req.body;
    const { columnId } = req.params;

    const normalizeColumnId = Number(columnId);

    if (!title || isNaN(normalizeColumnId)) {
      res.status(400).json({ message: 'Invalid request data' });

      return;
    }

    const taskData = await taskService.createTask(normalizeColumnId, title);

    res.status(200).json(taskData);
  };

  getTask: Controller = async (req, res) => {
    const { id } = req.params;

    const normalizeId = Number(id);

    const task = await taskService.getTask(normalizeId);

    res.status(200).json(task);
  };

  getAllTasksByColumn: Controller = async (req, res) => {
    const { columnId } = req.params;
    const normalizeColumnId = Number(columnId);

    const tasks = await taskService.getAllTasksByColumn(normalizeColumnId);

    res.status(200).json(tasks);
  };

  updateTask: Controller = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const normalizeId = Number(id);

    const updatedTask = await taskService.updateTask(
      normalizeId,
      title,
      description,
    );

    res.status(200).json(updatedTask);
  };

  deleteTask: Controller = async (req, res) => {
    const { id } = req.params;

    const normalizeId = Number(id);

    const deletedTask = await taskService.deleteTask(normalizeId);

    res.status(200).json(deletedTask);
  };
}

export const taskController = TaskController.getInstance();
