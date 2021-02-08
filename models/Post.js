const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
    {
        // define id column
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
        // title column
        title: {
            // type string
            type: DataTypes.STRING,
            // must have a title
            allowNull: false
        },
        // content column
        content: {
            // type string
            type: DataTypes.STRING,
            // must have content
            allowNull: false,
        },
        // user's id
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // lowercase table name
        modelName: 'post'
    }
);

module.exports = Post;