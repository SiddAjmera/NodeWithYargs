const fs = require('fs');

const log = console.log;

let fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json', { encoding: 'utf8' }));
    } catch(err) {
        log(`Error reading notes.json from fs: ${err}`);
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = { title, body };
    if(notes.filter(note => note.title === title).length === 0) {
        notes.push(note);
        saveNotes(notes);
        return `Note saved! Title: ${title}, Body: ${body}`;
    } else return `A note with Title: ${title} already exists!`;
}

let getAll = () => {
    return fetchNotes();
}

let getNote = (title) => {
    return fetchNotes().filter(note => note.title === title)[0];
}

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes !== notes;
}

let logNote = (note) => {
    log(`--\nTitle: ${note.title}\nBody: ${note.body}`);
}

module.exports = {
    addNote, getAll, getNote, removeNote, logNote
};