const Player = require('../src/classes/Player');

//first two bars of Mozart's "Kleine Nachtmusik" => tuple frequency:duration
const NOTES = [[783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.25], [587.33, 0.25], [783.99, 0.25], [987.77, 0.25], [1174.7, 0.25]];

const p = new Player();
(async () => {
    console.log('Loading Notes from array...');
    await p.loadBufferFromNotes(NOTES);
    await p.saveFile('mozart.mp3');
    console.log('File was written!');
})();

