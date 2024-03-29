import { Sequelize } from 'sequelize';
import { User } from '../models/User';

const DB_NAME = process.env.DB_NAME ;
const DB_USER = process.env.DB_USER ;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelise = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: DB_HOST,
  dialect: 'mysql',
});

User.initialize(sequelise);

export {sequelise};