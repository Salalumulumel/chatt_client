const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
  
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html' , { root : __dirname});
})

app.post('/send', (req, res) => {
  db.serialize(() => {
    db.run('INSERT INTO chat(message, user) VALUES(?, ?)', [`${req.body["message"]}`]); 
  });
  res.send('200')
})

app.get('/text', (req, res) => {
  messages = []
  db.serialize(() => {
    db.all(`SELECT * FROM chat`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      row.forEach((row) => {
        messages.push(row.message)
      });
      res.send(messages)
    });
    
  });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})