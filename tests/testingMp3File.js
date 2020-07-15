const fs = require('fs');
const {readFile} = fs;
const Player = require('../src/Player');


const p = new Player();

const file = './Thunderclouds.mp3';
readFile(file, async function (err, fileContents) {
    console.log('Loaded', file, '=>', fileContents);
    await p.loadBuffer(fileContents);
    console.log('loaded...');
    // setTimeout(async function () {
    //     console.log('Stopping');
    //     await p.stop();
    //     console.log('Stopped');
    // }, 5000);

    console.log('Playing...');
    await p.play();
    console.log('isPLay', p.isPlaying);
});