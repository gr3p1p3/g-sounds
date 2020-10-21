const WavEncoder = require('../classes/Wav');
const getRawData = require('../utils/getRawData');

/**
 *
 * @param notes
 * @param BPM
 * @param sampleRate
 * @returns {Promise<>}
 */
function encodeNotes(notes, BPM = 60, sampleRate = 44100) {
    const channelsData = [];
    if (Array.isArray(notes)) {
        channelsData.push(getRawData(notes, BPM, sampleRate));
    }
    else {
        for (const channelData of Object.values(notes)) {
            channelsData.push(getRawData(channelData, BPM, sampleRate));
        }
    }

    return new Promise(function (resolve, reject) {
        resolve(WavEncoder.encode(channelsData, {sampleRate: sampleRate}));
    })
}

module.exports = encodeNotes;