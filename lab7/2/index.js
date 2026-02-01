const express = require('express')
const app = express()
const port = 3000

const path = require('path');
// Serve static files from multiple directories
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public/home.html'));
});

app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname,'public/main.html'));
});

app.get('/dessert', function (req, res) {
    res.sendFile(path.join(__dirname,'public/dessert.html'));
});

app.get('/korat', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat.html'));
});

app.get('/korat2', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat2.html'));
});

app.get('/korat3', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat3.html'));
});

app.get('/korat4', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat4.html'));
});

app.get('/korat5', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat5.html'));
});

app.get('/korat6', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat6.html'));
});

app.get('/korat7', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat7.html'));
});

app.get('/korat8', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat8.html'));
});

app.get('/korat9', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat9.html'));
});

app.get('/korat10', function (req, res) {
    res.sendFile(path.join(__dirname,'public/korat10.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})
