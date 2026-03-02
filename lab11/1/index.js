const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
let db = new sqlite3.Database('customers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// Routes
app.get('/', (req, res) => {
    db.get(`SELECT * FROM customers ORDER BY RANDOM() LIMIT 1`, (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {      
      res.render('employees', { employee : rows || {} });
    }
  });
});

app.post('/set-cookie', (req, res) => {
    const customerData = req.body;
    try {
        // Basic cookie
        res.cookie('customerData', customerData, {
            maxAge: 1000 * 60 * 60, //1 hour
            httpOnly: true,
            secure: false
        });   

        res.render('employees', { employee: {} });
    } catch (err) {
        console.error('Error setting cookie:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to read cookies
app.get('/get-cookie', (req, res) => {
    try {
        res.render('employees', { employee: req.cookies.customerData });
    } catch (err) {
        console.error('Error reading cookies:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/clear-cookie', (req, res) => {
    
    res.clearCookie('customerData', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.render('employees', { employee: {} });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});