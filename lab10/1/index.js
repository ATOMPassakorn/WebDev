const express = require("express");
const path = require("path");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

const port = 3000;

// Creating the Express server
const app = express();

// Connect to SQLite database
// let db = new sqlite3.Database('your-db-filename.db', (err) => {    
//   if (err) {
//       return console.error(err.message);
//   }
//   console.log('Connected to the SQlite database.');
// });

// static resource & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';    
    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            console.log(wsdata);
            res.render('show', { data: wsdata });
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/detail/:id', function (req, res) {
    const targetId = req.params.id;
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';

    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            const result = wsdata.find(item => item.product_id == targetId);

            if (result) {
                res.render('detail', { data: result });
            } else {
                res.status(404).send("ไม่พบข้อมูลร้านอาหารนี้");
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
        });
});


app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});