module.exports = {
    Player: require('./src/classes/Player'),
    Oscillator: require('./src/classes/Oscillator'),
    Note: require('./src/classes/Note'),
    utils: {
        getOscillator: require('./src/utils/getOscillator'),
        getFrequenciesMap: require('./src/utils/getAllMappedFrequencies')
    }
};