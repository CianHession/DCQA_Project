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

var getStudents = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from student')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })

}

var addStudent = function(){
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "INSERT INTO student VALUES (?, ?, ?)",
            values: [req.body.sid, req.body.name, req.body.gpa]
            }
            pool.query(myQuery)
            .then((data) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
    
}
module.exports = { getStudents, addStudent}