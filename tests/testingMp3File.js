const fs = require('fs');
const util = require('util');
const {createWriteStream} = fs;
const readFile = util.promisify(fs.readFile);
const Player = require('../src/classes/Player');
const Oscillator = require('../src/classes/Oscillator');
const WavEncoder = require('../src/classes/Wav').encode;

const file2 = './Thunderclouds.mp3';
const file = './Negrita.mp3';

async function main() {
    const fileContents = await readFile(file);
    console.log('Loaded', file, '=>', fileContents.length);

    const p = new Player();
    await p.loadBuffer(fileContents);
    console.log('loaded audio buffer...');

    const fileContents2 = await readFile(file2);
    console.log('Loaded', file2, '=>', fileContents2.length);

    const p2 = new Player();
    await p2.loadBuffer(fileContents2);
    console.log('loaded...');

    const data = p.bufferNode.buffer._data;
    const data2 = p2.bufferNode.buffer._data;

    const sameSound = new Oscillator(data[0].length);
    for (let i = 0; i < data[0].length / 2; i++) {
        sameSound[i] = data[0][i] + data2[0][i] + data[1][i] + data2[1][i];
    }

    const convertedWavFile = createWriteStream('./test.wav');
    const raw = sameSound.rawData();
    console.log('Encoding', raw);
    const buffer = await WavEncoder([raw]);

    convertedWavFile.write(buffer);
    console.log('written');
    await p.stop();
    await p2.stop();

}

return main();