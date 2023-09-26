'use strict';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { models } from '../models/index.js';

dotenv.config();

export const initDB = () => {
  const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
  } = process.env;

  const DB_URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  return new Sequelize(DB_URI, {
    dialect: 'postgres',
    models,
    dialectOptions: {
      ssl: true,
    },
    logging: console.log,
  });
};
