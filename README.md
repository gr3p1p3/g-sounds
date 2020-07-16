# gSounds.js

#### **!!BETA!!**

gSounds.js is a NodeJS-Library to simplify creation of audio files directly from scratch.


It can be very helpful for CLI-Apps with sounds, generate Sound automatically, quick conversions of audio-files, AI-Tasks, etc...


## Quick Start

Play the first two bars of Mozart's "Kleine Nachtmusik"

```javascript
const {Player} = require('g-sounds');

//[frequency,duration]
const NOTES = [[783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.25], [587.33, 0.25], [783.99, 0.25], [987.77, 0.25], [1174.7, 0.25]];

const p = new Player();
(async () => {
    console.log('Loading Notes from array...');
    await p.loadBufferFromNotes(NOTES);
    console.log('loaded...playing...');
    await p.play();
})();
```

## Usage

gSounds.js exports two modules `Player` & `Note` 

```javascript
const {Player, Note} = require('g-sounds');
```

### Player

The Player-Instance is used to handle audio-buffers and play with them.

```javascript
const {Player} = require('g-sounds');
const p = new Player();
```

#### .loadBuffer( Buffer: audioBuffer ) : Promise

Load an audio-buffer. Resolve to decoded audio-buffer.

```javascript
// buffer contains raw data obtained from `fs.readFile`
await p.loadBuffer(buffer);
```


#### .loadBufferFromNotes( Array:Notes, Number:BPM ) : Promise

Load an audio-buffer from given Array of Tuples.

```javascript
//load a A4 in 60BPM
await p.loadBufferFromNotes([[440,1]], 60);
```

#### .play( Number: when ) : Promise

Play loaded audio-buffer.

```javascript
await p.play();
```

#### .saveFile( String: filePath ) : Promise

Save loaded audio-buffer to file path. (WAV-Files)

```javascript
await p.saveFile('/path/to/save.wav')
```

#### .stop( Number: when ) : Promise

Stop played sound.

```javascript
await p.stop();
```

### Note

The Note-Instance is helpful to get some frequency

```javascript
const {Note} = require('g-sounds');
const n = new Note();
```

#### .getFrequency( String: note ) : Number|undefined

Get the frequency-value of a given note.

```javascript
n.getFrequency('C4'); //261.6
```

#### .getNote( Number: frequency) : String|undefined

Get the Note name of a given frequency.

```javascript
n.getNote(261.61); // C4
```

or

```javascript
n.getNote(261); // C4
```

#### .getOscillator( Number:frequency, Number:samplingRate, Number:samples, Number:amplitude ) : Array

Get Wave-Data of a given frequency.

```javascript
n.getOscillator(261.6); // the sin-wave values for C4
```

## Examples

Saving a wav-file created from scratch

```javascript
const {Player} = require('g-sounds');

const NOTES = [[440,1]]; //simple A

const p = new Player();
(async () => {
    console.log('Loading Notes from array...');
    await p.loadBufferFromNotes(NOTES);
    await p.saveFile('test.wav');
    console.log('File was written!');
    process.exit(0);
})();
```

Print the notes of "Kleine Nachtmusik" from frequencies values.

```javascript
const {Note}= require('g-sounds');

//first two bars of Mozart's "Kleine Nachtmusik"
const NOTES = [[783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.5], [0, 0.25], [587.33, 0.25], [783.99, 0.25], [587.33, 0.25], [783.99, 0.25], [987.77, 0.25], [1174.7, 0.25]];

const n = new Note();

for (const [frequency, duration] of NOTES) {
    const noteName = n.getNote(frequency);
    console.log(frequency, '=>', noteName);
}

// 783.99 '=>' 'G5'
// 0 '=>' 'pause'
// 587.33 '=>' 'D5'
// 783.99 '=>' 'G5'
// 0 '=>' 'pause'
// 587.33 '=>' 'D5'
// 783.99 '=>' 'G5'
// 587.33 '=>' 'D5'
// 783.99 '=>' 'G5'
// 987.77 '=>' 'B5'
// 1174.7 '=>' 'D6'
```

More examples [here](https://github.com/gr3p1p3/g-sounds/tree/master/tests)