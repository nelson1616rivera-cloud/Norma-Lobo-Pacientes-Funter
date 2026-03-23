const sqlite3 = require('sqlite3').verbose();

// Create or open the database
const db = new sqlite3.Database('attendance.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the attendance database.');
    }
});

// Create attendance table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS attendance ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    date TEXT NOT NULL, 
    student_name TEXT NOT NULL, 
    status TEXT NOT NULL 
);`);

// Function to add attendance record
function addAttendance(date, studentName, status) {
    db.run(`INSERT INTO attendance (date, student_name, status) VALUES (?, ?, ?)`, [date, studentName, status], function(err) {
        if (err) {
            return console.error('Error adding attendance record: ' + err.message);
        }
        console.log(`Attendance record added with ID: ${this.lastID}`);
    });
}

// Function to retrieve all attendance records
function getAttendance(callback) {
    db.all(`SELECT * FROM attendance`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

module.exports = { addAttendance, getAttendance };