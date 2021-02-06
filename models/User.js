const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// use bcrypt
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init(
    {
        // define an id column
        id: {
            // type is an integer number
            type: DataTypes.INTEGER,
            // must have an ID
            allowNull: false,
            // is Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            // type string
            type: DataTypes.STRING,
            // must have a username
            allowNull: false
        },
        // define an email column
        email: {
            // type string
            type: DataTypes.STRING,
            // must have an email
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // make sure its an email
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            // type string
            type: DataTypes.STRING,
            // must have a password
            allowNull: false,
            validate: {
                // at least four characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        hooks: {
            // beforeCreate lifecycle
            async beforeCreate(newUserData) {
                // using bcrypt to hash password
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // beforeUpdate lifecycle
            async beforeUpdate(updatedUserData) {
                // using bcrypt to hash password
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // lowercase
        modelName: 'user'
    }
);

module.exports = User;