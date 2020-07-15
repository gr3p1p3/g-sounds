const Player = require('../src/Player');

//first two bars of Mozart's "Kleine Nachtmusik" => tuple frequency:duration
const NOTES = [[783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.25], [587.33, 0.25], [783.99, 0.25], [987.77, 0.25], [1174.7, 0.25]];

const BPM = 60;

const p = new Player();
(async () => {
    console.log('Loading Notes from array...');
    await p.loadBufferFromNotes(NOTES, BPM);
    console.log('loaded...playing...');
    await p.play();
    // console.log('played!')
})();

