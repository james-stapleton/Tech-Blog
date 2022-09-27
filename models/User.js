const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {

    static async checkPassword(loginPw) {
        console.log(typeof loginPw);
        return bcrypt.compare(loginPw, this.password);
    }

    static async hashPassword(password) {
        return bcrypt.hash(password.toString(), parseInt('10'));
    }

}


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                // newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return await User.hashPassword(newUserData);
            },
            beforeUpdate: async (updatedPassword) => {
                // updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return await User.checkPassword(updatedPassword);
            }
        }
        ,
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }

)


module.exports = User;