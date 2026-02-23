const express = require("express");
const path = require("path");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

const port = 3000;

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('todoslist.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todolist (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title VARCHAR(100) NOT NULL,
        Description VARCHAR(100) NOT NULL,
        Deadline DATE NOT NULL,
        Complete boolean NOT NULL DEFAULT 0
    )
  `;

  db.run(createTableQuery, (err) => {
      if (err) {
          console.error("Error creating table:", err.message);
      } else {
          console.log("Table created or already exists.");
      }
  });
  console.log('Connected to the SQlite database.');
});

// static resource & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', function (req, res) {
    const {title, description, deadline} = req.query;
    
    let sql = "INSERT INTO todolist (Title, Description, Deadline) VALUES (?, ?, ?)";
    console.log(sql);
    db.run(sql, [title, description, deadline], (err) => {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log('Data inserted successful');       
        res.redirect('/list'); 
    });
})

app.get('/list', (req, res) => {
    const query = 'SELECT * FROM todolist ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));        
    });
});

app.get("/", (req, res) => {
  const endpoint = 'http://localhost:3000/list';    
    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            console.log(wsdata);
            res.render('list', { data: wsdata });
        })
        .catch(error => {
            console.log(error);
        });
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const { complete } = req.body;
    
    const sql = "UPDATE todolist SET Complete = ? WHERE ID = ?";
    
    db.run(sql, [complete, id], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Error updating");
        }
        res.status(200).send("Updated successfully");
    });
});

app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});