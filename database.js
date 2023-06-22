const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    // can't open DB
    console.log(err)
    throw err
  } else {
    console.log('connected to DB')
    db.run(`CREATE TABLE thing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content text
    )`, err => {
      if (err) console.log('"thing" table already made')
    })
  }
})

module.exports = db