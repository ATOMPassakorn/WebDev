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
const fs = require('fs');
const csv = require('csv-parser');

app.get('/', (req, res) => {
    const results = [];
    fs.createReadStream('albums.csv')
        .pipe(csv())
        .on('data', (data) => {
            if (data._6) {
                data.album = data.album + "," + data.year;
                data.year = data.genre;
                data.genre = data.album_cover;
                data.album_cover = data._6;
                delete data._6;
            }
            results.push(data);
        })
        .on('end', () => {
            res.render('albums', { data: results });
        });
});

// const results = [];

// fs.createReadStream('albums.csv')
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         console.log("อ่านไฟล์ CSV สำเร็จ:");
//         console.log(results);
//     })
//     .on('error', (err) => {
//         console.error("เกิดข้อผิดพลาดในการอ่านไฟล์:", err);
//     });

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 