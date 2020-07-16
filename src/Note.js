const getAllMappedFrequencies = require('./getAllMappedFrequencies');

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
}

module.exports = Note;