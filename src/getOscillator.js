/**
 * Get Wave-Data.
 * @param {Number} freq
 * @param {Number} samplingRate
 * @param {Number} samples
 * @param {Number} amplitude
 * @returns {Array} - The calculated values of wave.
 */
function getOscillator(freq = 440, samplingRate = 44100, samples = 44100, amplitude = 100) {
    const wave = [];

    for (let i = 0; i < samples; i++) {
        const x = i;
        const y = amplitude * Math.sin(2 * Math.PI * freq * x / samplingRate);
        wave.push(y);
    }

    return wave;
}

module.exports = getOscillator;