const AudioContext = require('web-audio-api').AudioContext;
const Speaker = require('speaker');

const encodeNotes = require('./encodeNotes');

class Player {
    /**
     *
     * @param props
     * @returns {Player}
     */
    constructor(props = {}) {
        const self = this;

        self.isPlaying = false;
        self.context = new AudioContext;
        self.numberOfChannels = props.numberOfChannels || self.context.format.numberOfChannels;
        self.bitDepth = props.bitDepth || self.context.format.bitDepth;
        self.sampleRate = props.sampleRate || self.context.sampleRate;

        const speakerConfig = {
            channels: self.numberOfChannels,
            bitDepth: self.context.format.bitDepth,
            sampleRate: self.sampleRate
        };

        self.context.outStream = new Speaker(speakerConfig);

        self.reInitBufferNode();

        return self;
    }

    reInitBufferNode() {
        const self = this;
        const bufferNode = self.context.createBufferSource();
        bufferNode.connect(self.context.destination);
        bufferNode.loop = false;
        self.bufferNode = bufferNode;
    }

    /**
     * Load an audio-buffer
     * @param {Buffer} audioBuffer
     * @param {Boolean} reInitNode
     * @param {Function} callback
     * @returns {Promise}
     */
    loadBuffer(audioBuffer, reInitNode = false, callback = undefined) {
        const self = this;

        self.rawBuffer = audioBuffer;

        if (reInitNode) {
            self.reInitBufferNode();
        }

        if (!callback) {
            return new Promise(function (resolve, reject) {
                self.context.decodeAudioData(audioBuffer, function (decodedAudioBuffer) {
                    self.bufferNode.buffer = decodedAudioBuffer;
                    resolve(decodedAudioBuffer);
                });
            });
        }
        else {
            self.context.decodeAudioData(audioBuffer, function (decodedAudioBuffer) {
                self.bufferNode.buffer = decodedAudioBuffer;
                callback(null, decodedAudioBuffer);
            });
        }
    }

    /**
     * Load an audio-buffer from given Array of Tuples. Format => [frequency,duration]
     * @param {Array|Object} NOTES - The Array of tuples to generate as audio-buffer.
     * @param {Number} BPM - Beat pro minute
     * @returns {Promise<boolean | never>}
     */
    loadBufferFromNotes(NOTES, BPM = 60) {
        const self = this;
        return encodeNotes(NOTES, BPM)
            .then(async function (singleAudioBuffer) {
                await self.loadBuffer((singleAudioBuffer));
                return true;
            });
    }

    /**
     * Play loaded audio-buffer
     * @param {Number} when
     * @returns {Promise}
     */
    play(when = 0) {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.bufferNode.start(when);
            self.isPlaying = true;

            self.bufferNode.onended = function () {
                self.bufferNode.stop(0);
                self.isPlaying = false;
                resolve(true);
            };
        });
    }

    /**
     * Save loaded audio-buffer to file path
     * @param {String} filePath
     * @returns {Promise}
     */
    saveFile(filePath) {
        const self = this;
        const {writeFile} = require('fs');

        return new Promise(function (resolve, reject) {
            writeFile(filePath, Buffer.from(new Uint8Array(self.rawBuffer)), function (err) {
                if (err) reject(err);
                resolve(true)
            });
        })
    }

    /**
     * Stop played sound.
     * @param {Number} when
     * @returns {Promise}
     */
    stop(when = 0) {
        const self = this;
        return new Promise(function (resolve, reject) {
            // self.bufferNode.stop(0);
            // self.isPlaying = false;
            return resolve(self.bufferNode.onended);
        });
    }
}


module.exports = Player;