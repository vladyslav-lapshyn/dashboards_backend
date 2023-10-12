'use strict';

import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript';
import { Columns } from './Columns.model.js';

@Table({
  tableName: 'dashboards',
  timestamps: false,
})

export class Dashboard extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
    createdAt!: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    title!: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
    isImportant!: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
    isOpened!: boolean;

  @HasMany(() => Columns, {
    onDelete: 'CASCADE',
  })
    columns!: Columns[] | null;
}
