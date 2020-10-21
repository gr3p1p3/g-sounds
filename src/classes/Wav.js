// This Module was get from `andreasgal` good job, that was been understood, refactored & fit to own goals.
// @see https://github.com/andreasgal/node-wav/blob/master/index.js

const data_decoders = {
    pcm8: (buffer, offset, output, channels, samples) => {
        let input = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let data = input[pos++] - 128;
                output[ch][i] = data < 0 ? data / 128 : data / 127;
            }
        }
    },
    pcm16: (buffer, offset, output, channels, samples) => {
        let input = new Int16Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let data = input[pos++];
                output[ch][i] = data < 0 ? data / 32768 : data / 32767;
            }
        }
    },
    pcm24: (buffer, offset, output, channels, samples) => {
        let input = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let x0 = input[pos++];
                let x1 = input[pos++];
                let x2 = input[pos++];
                let xx = (x0 + (x1 << 8) + (x2 << 16));
                let data = xx > 0x800000 ? xx - 0x1000000 : xx;
                output[ch][i] = data < 0 ? data / 8388608 : data / 8388607;
            }
        }
    },
    pcm32: (buffer, offset, output, channels, samples) => {
        let input = new Int32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let data = input[pos++];
                output[ch][i] = data < 0 ? data / 2147483648 : data / 2147483647;
            }
        }
    },
    pcm32f: (buffer, offset, output, channels, samples) => {
        let input = new Float32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch)
                output[ch][i] = input[pos++];
        }
    },
    pcm64f: (buffer, offset, output, channels, samples) => {
        let input = new Float64Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch)
                output[ch][i] = input[pos++];
        }
    },
};

const data_encoders = {
    pcm8: (buffer, offset, input, channels, samples) => {
        let output = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let v = Math.max(-1, Math.min(input[ch][i], 1));
                v = ((v * 0.5 + 0.5) * 255) | 0;
                output[pos++] = v;
            }
        }
    },
    pcm16: (buffer, offset, input, channels, samples) => {
        let output = new Int16Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let v = Math.max(-1, Math.min(input[ch][i], 1));
                v = ((v < 0) ? v * 32768 : v * 32767) | 0;
                output[pos++] = v;
            }
        }
    },
    pcm24: (buffer, offset, input, channels, samples) => {
        let output = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let v = Math.max(-1, Math.min(input[ch][i], 1));
                v = ((v < 0) ? 0x1000000 + v * 8388608 : v * 8388607) | 0;
                output[pos++] = (v >> 0) & 0xff;
                output[pos++] = (v >> 8) & 0xff;
                output[pos++] = (v >> 16) & 0xff;
            }
        }
    },
    pcm32: (buffer, offset, input, channels, samples) => {
        let output = new Int32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let v = Math.max(-1, Math.min(input[ch][i], 1));
                v = ((v < 0) ? v * 2147483648 : v * 2147483647) | 0;
                output[pos++] = v;
            }
        }
    },
    pcm32f: (buffer, offset, input, channels, samples) => {
        let output = new Float32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let v = Math.max(-1, Math.min(input[ch][i], 1));
                output[pos++] = v;
            }
        }
    },
    pcm64f: (buffer, offset, input, channels, samples) => {
        let output = new Float64Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
            for (let ch = 0; ch < channels; ++ch) {
                let v = Math.max(-1, Math.min(input[ch][i], 1));
                output[pos++] = v;
            }
        }
    },
};

function lookup(table, bitDepth, floatingPoint) {
    let name = 'pcm' + bitDepth + (floatingPoint ? 'f' : '');
    let fn = table[name];
    if (!fn)
        throw new TypeError('Unsupported data format: ' + name);
    return fn;
}

function decode(buffer) {
    let pos = 0, end = 0;
    if (buffer.buffer) {
        // If we are handed a typed array or a buffer, then we have to consider the
        // offset and length into the underlying array buffer.
        pos = buffer.byteOffset;
        end = buffer.length;
        buffer = buffer.buffer;
    }
    else {
        // If we are handed a straight up array buffer, start at offset 0 and use
        // the full length of the buffer.
        pos = 0;
        end = buffer.byteLength;
    }

    let v = new DataView(buffer);

    function u8() {
        let x = v.getUint8(pos);
        pos++;
        return x;
    }

    function u16() {
        let x = v.getUint16(pos, true);
        pos += 2;
        return x;
    }

    function u32() {
        let x = v.getUint32(pos, true);
        pos += 4;
        return x;
    }

    function string(len) {
        let str = '';
        for (let i = 0; i < len; ++i)
            str += String.fromCharCode(u8());
        return str;
    }

    if (string(4) !== 'RIFF')
        throw new TypeError('Invalid WAV file');
    u32();
    if (string(4) !== 'WAVE')
        throw new TypeError('Invalid WAV file');

    let fmt;

    while (pos < end) {
        let type = string(4);
        let size = u32();
        let next = pos + size;
        switch (type) {
            case 'fmt ':
                let formatId = u16();
                if (formatId !== 0x0001 && formatId !== 0x0003)
                    throw new TypeError('Unsupported format in WAV file: ' + formatId.toString(16));
                fmt = {
                    format: 'lpcm',
                    floatingPoint: formatId === 0x0003,
                    channels: u16(),
                    sampleRate: u32(),
                    byteRate: u32(),
                    blockSize: u16(),
                    bitDepth: u16(),
                };
                break;
            case 'data':
                if (!fmt)
                    throw new TypeError('Missing "fmt " chunk.');
                const samples = Math.floor(size / fmt.blockSize);
                const channels = fmt.channels;
                const sampleRate = fmt.sampleRate;
                const channelData = [];
                for (let ch = 0; ch < channels; ++ch)
                    channelData[ch] = new Float32Array(samples);
                lookup(data_decoders, fmt.bitDepth, fmt.floatingPoint)(buffer, pos, channelData, channels, samples);
                return {
                    sampleRate: sampleRate,
                    channelData: channelData
                };
        }
        pos = next;
    }
}

function encode(channelData, opts = {}) {
    const sampleRate = opts.sampleRate || 44100;
    const floatingPoint = !!(opts.float || opts.floatingPoint);
    const bitDepth = floatingPoint ? 32 : ((opts.bitDepth | 0) || 16);
    const channels = channelData.length;
    const samples = channelData[0].length;
    const buffer = new ArrayBuffer(44 + (samples * channels * (bitDepth >> 3)));

    let dataView = new DataView(buffer);
    let pos = 0;

    function setUint8(value) {
        dataView.setUint8(pos++, value);
    }

    function setUint16(value) {
        dataView.setUint16(pos, value, true);
        pos += 2;
    }

    function setUint32(value) {
        dataView.setUint32(pos, value, true);
        pos += 4;
    }

    function stringToRawData(s) {
        for (let i = 0; i < s.length; ++i) {
            setUint8(s.charCodeAt(i));
        }
    }

    // write header
    stringToRawData('RIFF');
    setUint32(buffer.byteLength - 8);
    stringToRawData('WAVE');

    // write 'fmt ' chunk
    stringToRawData('fmt ');
    setUint32(16);
    setUint16(floatingPoint ? 0x0003 : 0x0001);
    setUint16(channels);
    setUint32(sampleRate);
    setUint32(sampleRate * channels * (bitDepth >> 3));
    setUint16(channels * (bitDepth >> 3));
    setUint16(bitDepth);

    // write 'data' chunk
    stringToRawData('data');
    setUint32(buffer.byteLength - 44);
    lookup(data_encoders, bitDepth, floatingPoint)(buffer, pos, channelData, channels, samples);

    return Buffer.from(buffer);
}

module.exports = {
    decode: decode,
    encode: encode,
};