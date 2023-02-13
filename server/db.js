const mysql = require('mysql');
require('dotenv').config({ path: './.env' });

const db = mysql.createPool({
    connectionLimit: 15,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSW,
    database: process.env.DB,
    charset: 'utf8_general_ci'
});

module.exports = {
    Query: async function (input) {
        return new Promise(async function (resolve, reject) {
            db.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(input, (error, row) => {
                    if (error) return console.log(error);
                    resolve(row);
                    connection.release();
                })
            })
        })
    },
};
