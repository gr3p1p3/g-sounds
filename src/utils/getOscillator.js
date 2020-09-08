const Oscillator = require('../classes/Oscillator');

/**
 * Get Wave-Data.
 * @param {Number} freq. As default 440.
 * @param {Number} samplingRate. As default 44100.
 * @param {Number} samples. As default 44100.
 * @param {Number} amplitude. As default 100.
 * @returns {Oscillator} - The calculated values of wave.
 */
function getOscillator(freq = 440, samplingRate = 44100, samples = 44100, amplitude = 100) {
    return new Oscillator(samples)
        .create(freq, samplingRate, amplitude);
}

module.exports = getOscillator;