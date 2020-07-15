function getOscillator(samplingRate = 44100, freq = 440, samples = 44100, amplitude = 100) {
    const wave = [];

    for (let i = 0; i < samples; i++) {
        const x = i;
        const y = amplitude * Math.sin(2 * Math.PI * freq * x / samplingRate);
        wave.push(y);
    }

    return wave;
}

module.exports = getOscillator;