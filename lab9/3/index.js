const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();
app.use(express.urlencoded({ extended: true }));

// Connect to SQLite database
let db = new sqlite3.Database('order.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Customer VARCHAR(100) NOT NULL,
        Product VARCHAR(100) NOT NULL,
        Address VARCHAR(100) NOT NULL,
        Phone VARCHAR(100) NOT NULL,
        Status VARCHAR(100) DEFAULT 'รอดำเนินการ' NOT NULL
        );`);
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.get('/', function (req, res) {
    const query = 'SELECT * FROM orders; ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        // console.log(rows);
        res.render('orders', { data: rows });
    });
});

app.post('/add-order', (req, res) => {
    const { customer, product, address, phone } = req.body;
    const sql = `INSERT INTO orders (Customer, Product, Address, Phone, Status) VALUES (?, ?, ?, ?, 'รอดำเนินการ')`;
    
    db.run(sql, [customer, product, address, phone], (err) => {
        if (err) return console.error(err.message);
        res.redirect('/');
    });
});

app.post('/update-status', (req, res) => {
    const { id, status } = req.body;
    const sql = `UPDATE orders SET Status = ? WHERE ID = ?`;
    
    db.run(sql, [status, id], (err) => {
        if (err) return console.error(err.message);
        res.redirect('/');
    });
});

// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});