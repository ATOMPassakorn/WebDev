// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database');

// static resourse & template engine

app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs'); //views
// For parsing form data
app.use(express.urlencoded({ extended: true })); 

// routing 
app.get('/', function (req, res) {
    res.send(`<a href="/create">Create Table</a><br>
        <a href="/insert">Insert data to table</a><br>
        <a href="/showdata">Show Data</a><br>
        <a href="/form">Instructor Form</a><br>`);
});

app.get('/showdata', (req, res) => {

    const sql = 'SELECT * FROM instructor;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('show', { data: result });
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', (req, res) => {
    // read data from query string 

    const id = req.query.id;
    const name = req.query.name;
    const dept_name = req.query.deptname;
    const salary = req.query.salary;

    // const {id, name, dept_name, salary} = req.query;

    const insertSql = "INSERT INTO instructor (ID, name, dept_name, salary) VALUES (?, ?, ?, ?)";
    
    conn.query(insertSql,[id, name, dept_name, salary], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});

app.get('/create', (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE instructor (
    ID CHAR(5) NOT NULL,
    name VARCHAR(20) NOT NULL,
    dept_name VARCHAR(20) NOT NULL,
    salary float,
    PRIMARY KEY (ID)
    ); `;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
    // then, Insert data into the table

});

app.get('/insert',  (req, res) => {
    const sql = `INSERT INTO instructor (ID, name, dept_name, salary) VALUES
('10101', 'Srinivasan', 'Comp. Sci.', 65000),
('12121', 'Wu', 'Finance', 90000),
('15151', 'Mozart', 'Music', 40000),
('22222', 'Einstein', 'Physics', 95000),
('32343', 'El Said', 'History', 60000),
('33456', 'Gold', 'Physics', 87000),
('45565', 'Katz', 'Comp. Sci.', 75000),
('58583', 'Califieri', 'History', 62000),
('76543', 'Singh', 'Finance', 80000),
('76766', 'Crick', 'Biology', 72000),
('83821', 'Brandt', 'Comp. Sci.', 92000),
('98345', 'Kim', 'Elec. Eng.', 80000);`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Data inserted into table");
        res.send("Data inserted into table");
    });


});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 