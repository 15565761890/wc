var mysql = require('mysql');
var pool = mysql.createPool({
    //host: '192.168.1.136',
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'tjds',
    port: '3306',
    dateStrings: true
});
var query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                conn.release();
                callback(qerr, vals, fields);
            });
        }
    });
};
module.exports = query;