"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static find(arg0) {
        throw new Error('Method not implemented.');
    }
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'User',
        });
    }
}
exports.User = User;
