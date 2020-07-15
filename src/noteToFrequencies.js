function noteToFrequencies() {
    const baseFrequency = 261.63; //C4
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',];

    const frequencies = [];
    for (const index in notes) {
        const f = parseFloat(
            (baseFrequency * Math.pow(2, index / notes.length))
                .toFixed(2));

        frequencies.push(f);
    }
    return frequencies;
}

module.exports = noteToFrequencies;