import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
    static find(arg0: (u: any) => boolean) {
        throw new Error('Method not implemented.');
    }
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public avatar!: string; 

    static initialize(sequelize: Sequelize): void {
        this.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {  
                type: DataTypes.STRING,
                allowNull: true, 
            },
        }, {
            sequelize,
            modelName: 'User',
        });
    }
}