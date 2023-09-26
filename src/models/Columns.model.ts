'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript';
import { Dashboard } from './Dashboard.model.js';
import { Task } from './Task.model.js';

@Table({
  tableName: 'columns',
  timestamps: false,
})

export class Columns extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
    createdAt!: Date;

  @AllowNull(false)
  @ForeignKey(() => Dashboard)
  @Column({
    type: DataType.INTEGER,
  })
    dashboardId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    title!: string;

  @BelongsTo(() => Dashboard, {
    onDelete: 'CASCADE',
    foreignKey: 'dashboardId',
    targetKey: 'id',
  })
    dashboard!: Dashboard | null;

  @HasMany(() => Task, {
    onDelete: 'CASCADE',
  })
    tasks!: Task[] | null;
}
