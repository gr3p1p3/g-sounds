const Player = require('../src/classes/Player');
const Note = require('../src/classes/Note');

const n = new Note();

const [B, C5, G, A, F, E, D, C4, PAUSE] = [
    n.getFrequency('B4'), n.getFrequency('C5'),
    n.getFrequency('G4'), n.getFrequency('A4'),
    n.getFrequency('F4'), n.getFrequency('E4'),
    n.getFrequency('D4'), n.getFrequency('C4'),
    n.getFrequency('pause')];

const NOTES = [
    [C5, 1 / 2],
    [PAUSE, 1 / 2],
    [B, 1 / 2],
    [PAUSE, 1 / 2],
    [A, 1 / 2],
    [PAUSE, 1 / 2],
    [A, 1 / 2]];

const NOTES2 = [
    [E, 1 / 2],
    [PAUSE, 1 / 2],
    [G, 1 / 2],
    [PAUSE, 1 / 2],
    [C4, 1 / 2],
    [PAUSE, 1 / 2],
    [F, 1 / 2]];

const BPM = 60;

const p = new Player();
(async () => {
    console.log('Loading Notes from array...');
    await p.loadBufferFromNotes({NOTES, NOTES2}, BPM);
    console.log('loaded...playing...');
    await p.play();

    setTimeout(function () {
        process.exit(0);
    }, 3200);
})();



