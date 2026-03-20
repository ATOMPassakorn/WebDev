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
app.use(express.urlencoded({ extended: true }));

// Connect to SQLite database
let userdata = new sqlite3.Database('userdata.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database1.');
});

let menu = new sqlite3.Database('restaurant.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database2.');
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.post('/login', (req, res) => {
    // read data from query string 
    const { username, password } = req.body;

    const sql = "SELECT * FROM Users WHERE username = ? OR email = ?";

    userdata.get(sql, [username, username], (err, user) => {
        if (err) {
            console.error(err.message);
        }

        if (!user) {
            return res.send(`
                <script>
                    alert("ไม่พบบัญชีผู้ใช้");
                    window.location.href = "/";
                </script>
            `);
        }

        if (user.password !== password) {
            return res.send(`
                <script>
                    alert("รหัสผ่านไม่ถูกต้อง");
                    window.history.back();
                </script>
            `);
        }

        req.session.username = user.username;

        res.redirect('/menu')

        console.log('Login success');
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error destroying session.');
            }
            res.clearCookie('connect.sid');
            res.redirect('/');
            console.log('Logout success');
        });
});

app.get('/register',(req,res) => {
    res.sendFile(path.join(__dirname, "/public/register.html"));
});

app.post('/register-form', (req, res) => {
    // read data from query string 

    const { username, email, password, confirm_password } = req.body;

    if(confirm_password!=password){
        return res.send(`
                <script>
                    alert("รหัสผ่านไม่ตรงกัน");
                    window.history.back();
                </script>
            `);
    }

    const insertSql = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";

    userdata.run(insertSql,[username, email, password], (err, result) =>{
        if (err) {
            console.error(err.message);
        } 
        else {
            console.log("register success");
            res.redirect('/');
        }
    });
});

app.get('/menu-list', (req, res) => {
    const query = 'SELECT * FROM restaurants ';
    menu.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        // console.log(rows);
        res.send(JSON.stringify(rows));        
    });
});

app.get('/menu',(req,res) => {
    const endpoint = 'http://localhost:3000/menu-list';
    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            // console.log(wsdata);
            res.render('menu', { data: wsdata, username : req.session.username});
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/detail/:id', function (req, res) {
    const targetId = req.params.id;
    const endpoint = 'http://localhost:3000/menu-list';

    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            const result = wsdata.find(item => item.product_id == targetId);

            if (result) {
                res.render('detail', { data: result, username: req.session.username});
            } else {
                res.status(404).send("ไม่พบข้อมูลร้านอาหารนี้");
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
        });
});

// เวอร์ชันมานพสอน จะเพิ่มได้รอบเดียว
// // add to cart route
// app.get('/add-to-cart/:item', (req, res) => {
//     const item = req.params.item;
//     if (!req.session.cart) {
//         req.session.cart = [];
//     }
//     // Add item to cart
//     req.session.cart.push(item);
//     console.log(`Item '${item}' added to cart...`);
//     res.redirect('/menu');
// });

// // View cart
// app.get('/cart',(req,res) => {
//     const cart = req.session.cart || [];
//         console.log(`List in your cart: ${cart.join(', ')}`);
    
//         menu.serialize(() => {
//             const query = `SELECT * FROM restaurants WHERE product_id IN (${cart.join(', ')})`;
//             menu.all(query, (err, rows) => {
//                 if (err) {
//                     console.error(err.message);
//                 } else {
//                     res.render('cart', { data: rows, username : req.session.username });
//                 }
//             });
//         });
// });

// เวอร์ชันกดแล้ว qty บวกเพิ่มได้
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
    console.log(`Item '${item}' added to cart...`);
    res.redirect('/menu');
});

// View cart
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const itemIds = Object.keys(cart);
    const endpoint = 'http://localhost:3000/menu-list';

    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            const result = wsdata.filter(item => itemIds.includes(item.product_id.toString())).map(item => {
                    return { ...item, qty: cart[item.product_id] };
                });

            if (result) {
                res.render('cart', { data: result, username: req.session.username});
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
app.post('/clear-cart', (req, res) => {
    req.session.cart = {};
    console.log('Cart cleared!');
    res.redirect('/cart');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});