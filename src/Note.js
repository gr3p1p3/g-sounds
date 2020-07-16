const getAllMappedFrequencies = require('./getAllMappedFrequencies');
const getOscillator = require('./getOscillator');

class Note {
    constructor() {
        this.frequencies = getAllMappedFrequencies();
    }

    /**
     * Get the Note name of a given frequency.
     * @param {Number} frequency
     * @returns {String|undefined}
     */
    getNote(frequency) {
        const self = this;
        if (frequency === 0) {
            return 'pause';
        }
        return self.frequencies.mappedFrequencies.get(frequency)
            || self.frequencies.mappedFullFrequencies.get(parseInt(frequency.toFixed(2)));
    }

    /**
     * Get the frequency value of given note.
     * @param {String} note
     * @returns {Number|undefined}
     */
    getFrequency(note) {
        const self = this;
        if (note === 'pause' || note === 'p') {
            return 0;
        }
        return self.frequencies.mappedToneNames.get(note);
    }

    /**
     * Get Wave-Data of a given frequency.
     * @param {Number} freq
     * @param {Number} samplingRate
     * @param {Number} samples
     * @param {Number} amplitude
     * @returns {Array} - The calculated values of wave.
     */
    getOscillator(freq = 440, samplingRate = 44100, samples = 44100, amplitude = 100) {
        return getOscillator(freq, samplingRate, samples, amplitude)
    }
}

module.exports = Note;