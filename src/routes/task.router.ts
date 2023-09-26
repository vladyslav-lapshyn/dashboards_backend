'use strict';

import express from 'express';
import { taskController } from '../controlles/task.controller.js';

export const taskRouter = express.Router();

taskRouter.post('/create/:columnId', taskController.createTask);
taskRouter.get('/:id', taskController.getTask);
taskRouter.get('/column/:columnId', taskController.getAllTasksByColumn);
taskRouter.patch('/:id/update', taskController.updateTask);
taskRouter.delete('/:id/delete', taskController.deleteTask);
