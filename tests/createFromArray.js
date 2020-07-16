const Player = require('../src/Player');
const Note = require('../src/Note');

const n = new Note();

const [C, G, A, F] = [n.getFrequency('C5'), n.getFrequency('G4'), n.getFrequency('A4'), n.getFrequency('F4')];
const PAUSE = n.getFrequency('pause');

const NOTES = [
    [C, 1 / 2],
    [PAUSE, 1 / 2],
    [G, 1 / 2],
    [PAUSE, 1 / 2],
    [A, 1 / 2],
    [PAUSE, 1 / 2],
    [A, 1 / 2]];

const BPM = 60;

const p = new Player();
(async () => {
    console.log('Loading Notes from array...');
    await p.loadBufferFromNotes(NOTES, BPM);
    console.log('loaded...playing...');
    await p.play();

    setTimeout(function () {
        process.exit(0);
    }, 3200);
})();

