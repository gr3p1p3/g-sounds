class Oscillator extends Array {
    /**
     *
     * @param {Number} samples. As default 44100.
     * @returns {Oscillator}
     */
    constructor(samples = 44100) {
        super();
        this.length = samples;
        this.fill(0);
        return this;
    }

    /**
     * Get Wave-Data.
     * @param {Number} freq. As default 440.
     * @param {Number} samplingRate. As default 44100.
     * @param {Number} amplitude. As default 100.
     * @returns {Oscillator} - The calculated values of wave.
     */
    create(freq = 440, samplingRate = 44100, amplitude = 100) {
        const thisOscillator = this;
        for (let i = 0; i < thisOscillator.length; i++) {
            thisOscillator[i] = amplitude * Math.sin(2 * Math.PI * freq * i / samplingRate);
        }
        return thisOscillator;
    }

    /**
     * Add this Oscillator to another one to create multichannel music.
     * @param {Oscillator} otherOscillatorWithSameLength -
     * @returns {Oscillator}
     */
    add(otherOscillatorWithSameLength) {
        const thisOscillator = this;

        const maxOscillatorLength = (thisOscillator.length >= otherOscillatorWithSameLength.length)
            ? thisOscillator.length
            : otherOscillatorWithSameLength.length;

        const newOscillator = new Oscillator(maxOscillatorLength);

        for (let index = 0; index < maxOscillatorLength; index++) {
            const singleValue = thisOscillator[index] || 0;
            const otherSingleValue = otherOscillatorWithSameLength[index] || 0;

            newOscillator[index] = singleValue + otherSingleValue;
        }

        return newOscillator;
    }

    /**
     * Return raw values of audio-buffer
     * @returns {Float32Array}
     */
    rawData() {
        return new Float32Array(this);
    }
}

module.exports = Oscillator;