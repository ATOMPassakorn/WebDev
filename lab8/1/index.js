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
        <a href="/form">Users Form</a><br>
        <a href="/showdata">Show Data</a><br>`);
});

app.get('/create', (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE Users (
    username varchar(256) not null,
    password varchar(256) not null,
    email varchar(256) not null,
    firstname varchar(256) not null,
    lastname varchar(256) not null,
    age int not null,
    address varchar(256) not null,
    phone varchar(10) not null
    );`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send(`<p>Table created or already exists</p>
            <p>Click <a href="/">here </a>to go back.</p>`);
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', (req, res) => {
    // read data from query string 

    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const age = req.query.age;
    const address = req.query.address;
    const phone = req.query.phone;

    // const {id, name, dept_name, salary} = req.query;

    const insertSql = "INSERT INTO Users (username, password, email, firstname, lastname, age, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    conn.query(insertSql,[username, password, email, firstname, lastname, age, address, phone], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send(`<p>Data inserted</p>
            <p>Click <a href="/">here </a>to go back.</p>`);
    });
});

app.get('/showdata', (req, res) => {

    const sql = 'SELECT * FROM Users;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('show', { data: result });
    });
});

app.get('/drop-table', (req, res) => {
    const sql = "DROP TABLE Users;";

    conn.query(sql, function (err, result) {
        if (err) {
            // กรณีไม่มีตารางให้ลบ จะแจ้ง Error กลับมา
            console.error("Error deleting table:", err.message);
            return res.status(500).send("Error: " + err.message);
        }
        console.log("Table deleted successfully");
        res.send("Table 'Users' has been deleted.");
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 