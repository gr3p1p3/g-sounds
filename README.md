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

## API

... in Progress

## Examples

More examples [here](https://github.com/gr3p1p3/g-sounds/tree/master/tests)