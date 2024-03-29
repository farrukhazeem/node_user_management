"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelise = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const sequelise = new sequelize_1.Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    host: DB_HOST,
    dialect: 'mysql',
});
exports.sequelise = sequelise;
User_1.User.initialize(sequelise);
