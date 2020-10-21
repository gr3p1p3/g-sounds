const Oscillator = require('../classes/Oscillator');

/**
 *
 * @param frequencies
 * @param BPM
 * @param sampleRate
 * @returns {Float32Array}
 */
function getRawData(frequencies, BPM, sampleRate) {
    const sampleLength = ((60 / BPM) * sampleRate);
    let encoded = new Oscillator(sampleRate);

    for (const [freq, duration] of frequencies) {
        const thisSampleLength = sampleLength * duration;
        const rawData = new Oscillator(thisSampleLength).create(freq);

        encoded = encoded.concat(rawData); //concatenating Oscillator-rawData
    }
    return encoded.rawData();
}


module.exports = getRawData;