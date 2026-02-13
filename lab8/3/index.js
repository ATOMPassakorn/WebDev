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
// routing 
const fs = require('fs');
const csv = require('csv-parser');

app.get('/', function (req, res) {
    res.send(`<a href="/create">Create Table</a><br>
        <a href="/insert">Insert data to table</a><br>
        <a href="/albums">Show Data</a><br>`);
});

app.get('/create', (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE albums (
    song varchar(256) not null,
    artist varchar(256) not null,
    album varchar(256) not null,
    year varchar(256) not null,
    genre varchar(256) not null,
    album_cover varchar(256) not null
    );`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send(`<p>Table created or already exists</p>
            <p>Click <a href="/">here </a>to go back.</p>`);
    });
});

app.get('/insert', (req, res) => {
    let rowCount = 0;
    let finishedCount = 0;
    let errorCount = 0;
    let isReadFinished = false;

    fs.createReadStream('albums.csv')
        .pipe(csv(['song', 'artist', 'album', 'year', 'genre', 'album_cover']))
        .on('data', (row) => {
            if (row.song === 'song' || row.song === '๏ปฟsong') return;

            rowCount++; 

            if (row._6) {
                row.album = row.album + "," + row.year;
                row.year = row.genre;
                row.genre = row.album_cover;
                row.album_cover = row._6;
                delete row._6;
            }

            const sqlInsert = "INSERT INTO albums (song, artist, album, year, genre, album_cover) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [row.song, row.artist, row.album, row.year, row.genre, row.album_cover];

            conn.query(sqlInsert, values, (err) => {
                finishedCount++;
                if (err) {
                    errorCount++;
                    console.error(`Error at row: ${rowCount}:`, err.message);
                }

                if (isReadFinished && finishedCount === rowCount) {
                    res.send(`<p>Data inserted into table</p>
                        <p>finished: ${finishedCount - errorCount}</p>
                        <p>error: ${errorCount}</p><br>
                        <p>Click <a href="/">here </a>to go back.</p>`);
                }
            });
        })
        .on('end', () => {
            isReadFinished = true;
            console.log(`Data inserted into table`);
        });
});

app.get('/albums', (req, res) => {
    const sql = "SELECT * FROM albums";

    conn.query(sql, (err, results) => {
        if (err) throw err;

        res.render('albums', { data: results });
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 