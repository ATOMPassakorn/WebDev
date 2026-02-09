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
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', (req, res) => {
    // read data from query string 

    const username = req.query.username;
    const password = req.query.password;

    const sql = "SELECT * FROM Users WHERE username = ? OR email = ?";

    conn.query(sql, [username, username], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.send(`
                <script>
                    alert("ไม่พบบัญชีผู้ใช้");
                    window.location.href = "/";
                </script>
            `);
        }

        const user = results[0];
        if (user.password !== password) {
            return res.send(`
                <script>
                    alert("รหัสผ่านไม่ถูกต้อง");
                    window.history.back();
                </script>
            `);
        }

        res.render('show', { data: [user] });
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 