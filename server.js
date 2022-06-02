const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const fs = require('fs'); 
const db = require('./db/db.json'); 

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  });

app.get('/api/notes', (req, res) => {
    

     res.send(db);
    // const allNotes = fs.readFile('./db/db.json' , (err) => {
    //     if(err) {
    //         console.log(err)
    //     }
    // })  
    // res.json(allNotes)
    // console.log(allNotes);

});

// app.post('/api/notes', (req, res) => {

// });

// POST request to add a new note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    let jsonFilePath = path.join(__dirname, './db/db.json');
    let newNote = req.body;
     
    console.log(newNote);
    console.log(db);

    let id = 1; 
    for (let i=0; i < db.length; i++) {
        let individualNote = db[i];
         
        if (individualNote > id) {
            id = individualNote.id;
        }
    }

    newNote.id = id + 1;
    
    db.push(newNote);

    fs.writeFile(jsonFilePath, JSON.stringify(db), (err) => {

        if(err) {
            return console.log(err);
        }
        console.log("Yay new note saved!")

    });

    res.json(newNote);


  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

