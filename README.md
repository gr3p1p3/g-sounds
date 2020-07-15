# gSounds.js

gSounds.js is a node.js library to simplify creation of audio files directly from scratch.

## Quick Start

```javascript
const {Player} = require('g-sounds');

//first two bars of Mozart's "Kleine Nachtmusik" => [frequency,duration]
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


