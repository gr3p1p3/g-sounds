const WavEncoder = require('wav-encoder');
const getOscillator = require('./getOscillator');

async function encodeNotes(notes, BPM = 60, sampleRate = 44100) {
    function getRawData(frequencies) {
        let encoded = [];
        for (const [freq, duration] of frequencies) {
            const rawData = getOscillator(freq, undefined, (((60 / BPM) * sampleRate) * duration));
            encoded = [...encoded, ...rawData]; //concatenating rawData
        }
        return encoded;
    }

    let channelsData = [];
    if (Array.isArray(notes)) {
        channelsData.push(new Float32Array(getRawData(notes)));
    }
    else {
        for (const channelData of Object.values(notes)) {
            channelsData.push(new Float32Array(getRawData(channelData)))
        }
    }

    const someNoise = {
        sampleRate: sampleRate,
        channelData: channelsData
    };

    return await WavEncoder.encode(someNoise);
}

module.exports = encodeNotes;