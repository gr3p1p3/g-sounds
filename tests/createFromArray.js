const getAllMappedFrequencies = require('../src/getAllMappedFrequencies');
const Player = require('../src/Player');

const freqMap = getAllMappedFrequencies();
const noteFreq = freqMap.mappedFrequencies;

const [C, G, A, F] = [noteFreq.get('C4'), noteFreq.get('G3'), noteFreq.get('A#4'), noteFreq.get('F4')];
const PAUSE = 0;

const NOTES = [
    [C, 1 / 2],
    [PAUSE, 1 / 2],
    [G, 1 / 2],
    [PAUSE, 1 / 2],
    [A, 1 / 2],
    [PAUSE, 1 / 2],
    [F, 1 / 2]];

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

