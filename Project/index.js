//Application imports, requirements
var express = require('express')
var app = express()
const path = require('path'); //For passing html file
var moduleDAO = require('./moduleDAO');
var studentDAO = require('./studentDAO')
var mongoDAO = require('./mongoDAO');

const { send } = require('process');

app.set('view engine','ejs');

// index '/'
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html')); //HTML File to pass (allows for homepage with links)
});

//GET /listmodules
app.get('/listmodules', (req, res) => {
    moduleDAO.getModules()
    .then((result)=>{
        res.render('modules',{modules: result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

app.get('/module/students/:mid',(req,res)=>{
    res.send("Hello World")
    moduleDAO.listStudents()
    .then((result)=>{
        res.render('students',{students: result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

//liststudents
app.get('/liststudents', (req, res) => {
    studentDAO.getStudents()
    .then((result)=>{
        res.render('students',{students: result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

//MONGO ----------------- LECTURERS-----------------------------//
app.get('/listlecturers',(req,res)=>{
mongoDAO.findAllLecturers()
.then((data)=>{
res.render('lecturers',{lecturers:data})
})
.catch((error)=>{
    res.send(error)
})
})

app.get('/addLecturer', (req,res)=>{
    res.render('addLecturer', {errors: undefined, _id:undefined, name:undefined, dept:undefined})
})

app.post('/addLecturer', (req,res)=>{
    mongoDAO.insertLecturer(req.body)
    .then((data)=>{
       res.redirect('/listlecturers')
       console.log(data);
    })
    .catch((error)=>{
        if(error.code == 11000){
            errors = []
            newError = {msg: "Error: Lecturer with ID:" +req.body._id + " already exists!"}
            errors.push(newError)
            res.render('addLectuer', {errors: errors, _id: req.body._id, name:req.body.name, dept:req.body.dept})
            res.redirect('/listlecturers')
        }
        else{
            res.send(error);
        }
    })
})


app.listen(3000)