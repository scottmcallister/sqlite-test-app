const express = require('express');
const app = express();
const db = require('./database.js');
const port = 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`app running on port ${port}`))
app.get('/', (req, res) => {
  res.json({'message': 'OK'})
})

app.post('/thing', (req, res, next) => {
  if (!req.body.content) {
    res.status(400).json({ 'error': 'content required in payload' })
    return;
  }
  var sql = 'INSERT INTO thing (content) VALUES (?)';
  var params = [req.body.content];
  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.json({
      "message": "success",
      "data": result,
      "id": this.lastID
    })
  })
})

app.get('/thing/:id', (req, res, next) => {
  var sql = "select * from thing where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (row === undefined) {
      res.status(404).json({ "error": "not found"});
      return;
    }
    console.log(row);
    res.json({
      "message": "success",
      "data": row
    })
  });
})

app.use((req, res) => res.status(404))