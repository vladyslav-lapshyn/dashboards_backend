'use strict';

import { Columns } from '../models/Columns.model.js';
import { Task } from '../models/Task.model.js';

class TaskService {
  private static instance: TaskService | null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }

    return TaskService.instance;
  }

  async createTask(
    columnId: number,
    title: string,
  ) {
    const column = await Columns.findByPk(columnId);

    if (!column) {
      throw new Error('Column not found');
    }

    const description = 'qwewqe';

    const task = await Task.create({ title, columnId, description });

    return task;
  }

  async getTask(id: number) {
    const task = await Task.findByPk(id);

    return task;
  }

  async getAllTasksByColumn(columnId: number) {
    const tasks = Task.findAll({
      where: { columnId }
    });

    return tasks;
  }

  async updateTask(
    id: number,
    title: string,
    description?: string
  ) {
    const [, updatedTask] = await Task.update(
      { title, description },
      { where: { id }, returning: true }
    );

    return updatedTask;
  }

  async deleteTask(id: number) {
    const deletedTask = await Task.destroy({
      where: { id },
    });

    return deletedTask;
  }
}

export const taskService = TaskService.getInstance();
