const Note = require('../src/Note');

//first two bars of Mozart's "Kleine Nachtmusik"
const NOTES = [[783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.25], [587.33, 0.25], [783.99, 0.25], [987.77, 0.25], [1174.7, 0.25]];

const n = new Note();

for (const [frequency, duration] of NOTES) {
    const noteName = n.getNote(frequency);
    console.log(frequency, '=>', noteName);
}