const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};
const argv = require('yargs')
    .command('add', 'Add a note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note for the provided title', {
        title: titleOptions
    })
    .argv;

const notes = require('./notes');
const log = console.log;

let command = argv._[0];

switch(command) {
    case 'add': 
        log(notes.addNote(argv.title, argv.body));
        break;

    case 'remove':
        log(`Note with title ${argv.title} was`, notes.removeNote(argv.title) ? 'removed' : 'not found');
        break;

    case 'list':
        let notesList = notes.getAll();
        log(`Printing ${notesList.length} note(s).`);
        notesList.forEach(note => notes.logNote(note));
        break;

    case 'read':
        let note = notes.getNote(argv.title);
        if(note) {
            log('Note Found!');
            notes.logNote(note);
        } else {
            log(`Note with Title: ${argv.title} not found!`);
        }
        break;

    default:
        console.log('Command not recognized!');
        break;
}