'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { Columns } from './Columns.model.js';

@Table({
  tableName: 'tasks',
  timestamps: false,
})

export class Task extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
    createdAt!: Date;

  @AllowNull(false)
  @ForeignKey(() => Columns)
  @Column({
    type: DataType.INTEGER,
  })
    columnId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    title!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    description?: string | null;

  @BelongsTo(() => Columns, {
    onDelete: 'CASCADE',
    foreignKey: 'columnId',
    targetKey: 'id',
  })
    column!: Columns | null;
}
