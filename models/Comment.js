// import sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
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
        // Comment text field
        comment_text: {
            // type string
            type: DataTypes.STRING,
            validate: {
                // at least one characters long
                len: [1]
            }
        },
        // Users ID reference
        user_id: {
            // type integer
            type: DataTypes.INTEGER,
            // must have a user
            allowNull: false,
            // get from 
            references: {
              model: 'user',
              key: 'id'
            }
        },
        // ID for post 
        post_id: {
            // type integer
            type: DataTypes.INTEGER,
            // must belong to a post id
            allowNull: false,
            // get from
            references: {
              model: 'post',
              key: 'id'
            }
        },
    },
    {
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // lowercase table name
        modelName: 'comment'
    }
);

module.exports = Comment;