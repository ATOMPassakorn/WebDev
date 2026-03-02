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

// Routes
app.get('/', (req, res) => {
    // res.send(`Create your menu.`);
    res.redirect('/menu');
});

app.get('/menu', (req, res) => {  
  const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';
    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            // console.log(wsdata);
            res.render('show', { data: wsdata });
        })
        .catch(error => {
            console.log(error);
        });
});

// add to cart route
app.get('/add-to-cart/:item', (req, res) => {
    const item = req.params.item;
    if (!req.session.cart) {
        req.session.cart = {};
    }

    if (req.session.cart[item]) {
        req.session.cart[item] += 1;
    } else {
        req.session.cart[item] = 1;
    }

    // Add item to cart
    // req.session.cart.push(item);
    console.log(`Item '${item}' added to cart...`);
    res.redirect('/menu');
});

// View cart
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const itemIds = Object.keys(cart);
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';

    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            const result = wsdata.filter(item => itemIds.includes(item.product_id.toString())).map(item => {
                    return { ...item, qty: cart[item.product_id] };
                });;

            if (result) {
                res.render('cart', { data: result });
            } else {
                res.status(404).send("ไม่พบข้อมูลร้านอาหารนี้");
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
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