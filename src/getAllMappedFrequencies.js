function getAllMappedFrequencies() {
    const NOTE_STRINGS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',];
    const NOTE_LEN = NOTE_STRINGS.length;
    const baseFrequency = 16.35; //C0

    const mappedFrequencies = new Map();
    const mappedToneNames = new Map();
    const mappedFullFrequencies = new Map();
    let scala = 0;

    for (let index = 0; index < NOTE_LEN * 9; index++) {
        const frequency = parseFloat(
            (baseFrequency * Math.pow(2, index / NOTE_LEN))
                .toFixed(2));

        const indexScala = index % NOTE_LEN;
        const noteName = NOTE_STRINGS[indexScala] + scala;

        mappedFrequencies.set(noteName, frequency);
        mappedToneNames.set(frequency, noteName);
        mappedFullFrequencies.set(parseInt(frequency), noteName);

        if (indexScala === NOTE_LEN - 1) {
            scala++;
        }
    }
    return {mappedFrequencies, mappedToneNames, mappedFullFrequencies};
}

module.exports = getAllMappedFrequencies;