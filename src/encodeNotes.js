const WavEncoder = require('wav-encoder');
const getOscillator = require('./getOscillator');

async function encodeNotes(notes, BPM = 60, sampleRate = 44100) {
    let encoded = [];
    for (const [freq, duration] of notes) {
        const rawData = getOscillator(undefined, freq, (((60 / BPM) * sampleRate) * duration));
        encoded = [...encoded, ...rawData]; //concatenating rawData
    }

    const someNoise = {
        sampleRate: sampleRate,
        channelData: [
            new Float32Array(encoded)
        ]
    };

    return await WavEncoder.encode(someNoise);
}

module.exports = encodeNotes;