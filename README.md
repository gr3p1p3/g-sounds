# gSounds.js

#### !!BETA!!

gSounds.js is a NodeJS-Library to simplify creation of audio files directly from scratch.

It can be very helpful for quick conversions of audio-files, AI-Tasks, etc.....

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

gSounds.js exports two modules, a `Player-Class` & some `utils` 

```javascript
const {Player, utils} = require('g-sounds');
```

### Player

The Player-Instance is used to handle audio-buffers and play with them.

```javascript
const {Player} = require('g-sounds');
const p = new Player();
```

#### .loadBuffer

Load an audio-buffer.

#### .loadBufferFromNotes

Load an audio-buffer from given Array of Tuples.

```javascript
//load a A4 in 60BPM
p.loadBufferFromNotes([[440,1]], 60);
```

#### .play

Play loaded audio-buffer.

```javascript
p.play();
```

#### .saveFile

Save loaded audio-buffer to file path. (WAV-Files)

```javascript
await p.saveFile('/path/to/save.wav')
```

#### .stop

Stop played sound.

```javascript
p.stop();
```

### utils

...soon

## Examples

More examples [here](https://github.com/gr3p1p3/g-sounds/tree/master/tests)