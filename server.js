// Getting Started
// The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9160;
app.use(express.static('public'));
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
var notes = require('./db/db.json');

// /notes returns the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//returns the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//GET function to make localhost:3001/api/notes reads db.json file + returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    //set id of incoming data based on what next index of array will be
    newNote.id = notes.length.toString();
    notes.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// Bonus
// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => {
        return note.id !== req.params.id
    });
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
