const AudioContext = require('web-audio-api').AudioContext;
const WavDecoder = require('../classes/Wav').decode;

const Speaker = require('speaker/index');

const encodeNotes = require('../utils/encodeNotes');

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
     * @returns {Promise<AudioBuffer>}
     */
    loadBuffer(audioBuffer, reInitNode = false, callback = undefined) {
        const self = this;

        self.rawBuffer = audioBuffer;
        if (reInitNode) {
            self.reInitBufferNode();
        }

        return new Promise(async function (resolve, reject) {
            // const decodedAudioBuffer = await WavDecoder(audioBuffer);
            self.context.decodeAudioData(audioBuffer, function (decodedAudioBuffer) {
                self.bufferNode.buffer = decodedAudioBuffer;
                if (callback && typeof callback === 'function') {
                    callback(null, decodedAudioBuffer);
                }
                resolve(decodedAudioBuffer);
            });
        });
    }

    /**
     * Load an audio-buffer from given Array of Tuples. Format => [frequency,duration]
     * @param {Array|Object} NOTES - The Array of tuples to generate as audio-buffer.
     * @param {Number} BPM - Beat pro minute
     * @returns {Promise<AudioBuffer>}
     */
    loadBufferFromNotes(NOTES, BPM = 60) {
        const self = this;
        return encodeNotes(NOTES, BPM)
            .then(async function (singleAudioBuffer) {
                await self.loadBuffer((singleAudioBuffer));
                return singleAudioBuffer;
            });
    }

    /**
     * Play loaded audio-buffer
     * @returns {Promise<Player>}
     */
    play() {
        const self = this;

        // console.log(self.context.currentTime, self.context._frame);
        return new Promise(function (resolve, reject) {
            self.bufferNode.start(0);
            self.isPlaying = true;

            self.bufferNode.onended = function () {
                self.bufferNode.stop(0);
                self.isPlaying = false;
                resolve(self);
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
     * @returns {Promise}
     */
    stop() {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.context.outStream.end(function () {
                resolve(self);
            });
        });
    }

    /**
     * Stop and kill this Instance.
     * @returns {Promise}
     */
    async exit() {
        const self = this;
        await self.stop();
        delete this; //disposing class
    }
}


module.exports = Player;