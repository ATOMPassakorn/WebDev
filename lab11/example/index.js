const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key-for-your-store', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } 
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// Connect to database
let db = new sqlite3.Database('phones.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// Routes
app.get('/', (req, res) => {
    // res.send(`Create your menu.`);
    res.redirect('/products');
});

app.get('/products', (req, res) => {  
  db.all(`SELECT * FROM phones`, (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {      
      res.render('showproducts', { data : rows });
    }
  });
});

// add to cart route
app.get('/add-to-cart/:item', (req, res) => {
    const item = req.params.item;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    // Add item to cart
    req.session.cart.push(item);
    console.log(`Item '${item}' added to cart...`);
    res.redirect('/products');
});

// View cart
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    console.log(`List in your cart: ${cart.join(', ')}`);

    db.serialize(() => {
        const query = `SELECT * FROM phones WHERE id IN (${cart.join(', ')})`;
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                res.render('cart', { data: rows });
            }
        });
    });
});

// Clear cart
app.get('/clear-cart', (req, res) => {
    req.session.cart = [];
    // res.send('Cart cleared!');
    res.redirect('/cart');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});