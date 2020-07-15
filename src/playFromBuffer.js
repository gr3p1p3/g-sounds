async function playFromBuffer(audioBuffer, context, outStream) {
    return new Promise(function (resolve, reject) {
        context.outStream = outStream;

        const bufferNode = context.createBufferSource();
        bufferNode.connect(context.destination);
        bufferNode.loop = false;

        context.decodeAudioData(audioBuffer, function (decodedAudioBuffer) {
            bufferNode.buffer = decodedAudioBuffer;
            bufferNode.start(0);

            bufferNode.onended = async function () {
                bufferNode.stop(0);
                resolve(true);
            }
        });
    });
}

module.exports = playFromBuffer;