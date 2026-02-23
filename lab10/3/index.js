const express = require("express");
const path = require("path");

const port = 3000;

// Creating the Express server
const app = express();

// static resource & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const endpoint = 'http://webdev.it.kmitl.ac.th:4000/books';    
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


app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});