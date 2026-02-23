const express = require("express");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser"); // นำเข้าโมดูลสำหรับอ่าน CSV
const sqlite3 = require('sqlite3').verbose();

const port = 3000;

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('smartphones.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');

  // สร้างตารางเมื่อเชื่อมต่อเสร็จสิ้น (อิงตามโครงสร้างในไฟล์) 
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS smartphones (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Brand VARCHAR(100) NOT NULL,
        Model VARCHAR(100) NOT NULL,
        ReleaseYear VARCHAR(100) NOT NULL,
        Display VARCHAR(100) NOT NULL,
        Processor VARCHAR(100) NOT NULL,
        RAM VARCHAR(100) NOT NULL,
        Storage VARCHAR(100) NOT NULL,
        RearCamera VARCHAR(100) NOT NULL,
        FrontCamera VARCHAR(100) NOT NULL,
        Battery VARCHAR(100) NOT NULL,
        OS VARCHAR(100) NOT NULL,
        Price VARCHAR(100) NOT NULL
    )
  `;

  db.run(createTableQuery, (err) => {
      if (err) {
          console.error("Error creating table:", err.message);
      } else {
          console.log("Table 'smartphones' created or already exists.");
          // เรียกใช้งานฟังก์ชันโหลดข้อมูล CSV หลังจากสร้างตารางเสร็จ
          loadDataFromCSV('smartphones.csv'); // เปลี่ยนชื่อไฟล์ให้ตรงกับ CSV ของคุณ
      }
  });
});

// ฟังก์ชันสำหรับอ่านและนำเข้าข้อมูล CSV
function loadDataFromCSV(csvFilePath) {
    if (!fs.existsSync(csvFilePath)) return;

    const results = [];
    // ใช้การตั้งค่า quote: false เพื่อไม่ให้เครื่องหมาย " ในหน้าจอทำข้อมูลพัง
    fs.createReadStream(csvFilePath)
        .pipe(csv({ quote: '' })) 
        .on('data', (row) => {
            // ดึงค่าทั้งหมดออกมาเป็น Array เพื่อจัดการเรื่องการเยื้อง
            const values = Object.values(row);
            if (values.length >= 12) {
                results.push(values);
            }
        })
        .on('end', () => {
            db.serialize(() => {
                db.run("BEGIN TRANSACTION");
                const stmt = db.prepare(`INSERT INTO smartphones (
                    Brand, Model, ReleaseYear, Display, Processor, 
                    RAM, Storage, RearCamera, FrontCamera, Battery, OS, Price
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

                results.forEach(val => {
                    // แมปข้อมูลตามตำแหน่ง index จริงในไฟล์ CSV (ข้าม 'id' ที่เป็นช่องแรกไป)
                    stmt.run(
                        val[0], // Samsung
                        val[1], // Galaxy S25
                        val[2], // 2025
                        val[3], // 6.8" AMOLED (ตอนนี้จะไม่พังแล้ว)
                        val[4], // QSnap 8 Gen 3
                        val[5], // 12GB
                        val[6], // 256GB
                        val[7], // 200MP...
                        val[8], // 32MP
                        val[9], // 5000mAh
                        val[10], // Android 15
                        val[11]  // 1199
                    );
                });

                stmt.finalize();
                db.run("COMMIT", (err) => {
                    if (!err) console.log(`✅ นำเข้าข้อมูลสำเร็จ ${results.length} รายการ`);
                });
            });
        });
}

// static resource & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Welcome to the Smartphone API`);
});

// --- Section 2 - Creating the Web Services
app.get('/smartphones', (req, res) => {
    const query = 'SELECT * FROM smartphones ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));        
    });
});

app.get('/smartphones/:id', (req, res) => {
    // req.params.id
    const query = `SELECT * from smartphones WHERE ID = ${req.params.id};`;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));       
    });
});

// --- Section 3 - Using the Web Services
app.get("/show", (req, res) => {
    const endpoint = 'http://localhost:3000/smartphones';    
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

app.get("/showemployees", (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/employees';    
    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            console.log(wsdata);
            res.render('showemployees', { data: wsdata });            
        })
        .catch(error => {
            console.log(error);
        });
});


app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});