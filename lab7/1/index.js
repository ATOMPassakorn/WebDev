const express = require('express')
const app = express()
const port = 3000

const path = require('path');
// Serve static files from multiple directories
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public/home.html'));
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname,'public/about.html'));
});

app.get('/cats', function (req, res) {
    res.sendFile(path.join(__dirname,'public/cats.html'));
});

app.get('/dogs', function (req, res) {
    res.sendFile(path.join(__dirname,'public/dogs.html'));
});

app.get('/birds', function (req, res) {
    res.sendFile(path.join(__dirname,'public/birds.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})
