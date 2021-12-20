const { promiseImpl } = require('ejs');

const MongoClient = require('mongodb').MongoClient;

var db;
var coll;

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        db = client.db('lecturersDB')
        coll = db.collection('lecturers')
    })
    .catch((error) => {
        console.log(error.message)
    })

    var findAllLecturers = function(){
        return new Promise((resolve,reject)=>{
           var cursor = coll.find()
           cursor.toArray()
           .then((data)=>{
            resolve(data);
           })
           .catch((error)=>{
              reject(error);
           })
        })

    }

    function insertLecturer(newLecturer){
        return new Promise((resolve,reject)=>{
            coll.insertOne(newLecturer)
            .then((data)=>{
                resolve(data);
            })
            .catch((error)=>{
                reject(error);
            })
        })
    }

    module.exports = {findAllLecturers, insertLecturer}