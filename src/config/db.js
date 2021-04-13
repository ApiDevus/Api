const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE, host: process.env.DB_HOST});

module.exports = {
    createUser:function (user, cb) {
        return connection.execute('INSER INTO user(firstname, name, email, password) VALUES (?.?.?.?)', user, (err) => {
            cb(err);
        });
    },

    FindUserWithEmail:function (email, cb) {
        return connection.query('SELECT * FROM user WHER email = ?', [email], (err, row) => {
            cb(err, row);
        });
    },

    getUsers:function (cb) {
        return connection.query('SELECT * FROM user WHERE id = ?', (err, row) => {
            cb(err, row);
        });
    },

    finderUserWithId:function (id, cb) {
        return connection.query('SELECT * FROM user WHERE id = ?', [id], (err, row) => {
            cb(err, row);
        });
    },

    finderUserTodos:function (user, cb) {
        return connection.query('SELECT * FROM todo WHERE user_id', [user_id], (err,row) => {
            cb(err, row);
        });
    },

    createTodo:function (todo,cb) {
        return connection.query('INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?.?.?.?.?)', todo, (err, result) => {
            cb(err, result);
        });
    },

    findTodoWITHid:function (id, cb) {
        return connection.query('SELECT * FROM todo WHERE id = ? ',[id], (err, row) => {
            cb(err, row);
        });
    },
}