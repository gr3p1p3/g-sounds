const WavEncoder = require('wav-encoder');
const Oscillator = require('../classes/Oscillator');

async function encodeNotes(notes, BPM = 60, sampleRate = 44100) {
    function getRawData(frequencies) {
        const sampleLength = ((60 / BPM) * sampleRate);
        let encoded = new Oscillator(sampleRate);

        for (const [freq, duration] of frequencies) {
            const thisSampleLength = sampleLength * duration;
            const rawData = new Oscillator(thisSampleLength).create(freq);

            encoded = encoded.concat(rawData); //concatenating Oscillator-rawData
        }
        return encoded.rawData();
    }

    let channelsData = [];
    if (Array.isArray(notes)) {
        channelsData.push(getRawData(notes));
    }
    else {
        for (const channelData of Object.values(notes)) {
            channelsData.push(getRawData(channelData))
        }
    }

    const someNoise = {
        sampleRate: sampleRate,
        channelData: channelsData
    };

    return await WavEncoder.encode(someNoise);
}

module.exports = encodeNotes;