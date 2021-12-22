const res = require('express/lib/response');
var mysql = require('promise-mysql'); //SQL
var pool

mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Zqsdt9$8',
    database: 'collegeDB'
})
    .then((result) => {
        pool = result;
    })
    .catch((error) => {
        res.send(error);
    });

var getModules = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from module')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })

}

module.exports = { getModules}