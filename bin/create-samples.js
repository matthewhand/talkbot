/*jshint esversion: 9 */
require('module-alias/register');

/* make voice samples with `node create-samples.js` */
(async () => {

    const tts = require("@services/TextToSpeechService.js"),
        delay = require("delay"),
        fs = require("fs"),
        msg = "You are hearing me talk";

    process.on('uncaughtException', console.log);

    await tts.setupProviders();

    var dir = './samples';

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    for ( let provider_name in tts.providers ) {

        console.log(provider_name);

        let provider = tts.getService(provider_name);

        for ( let voice of provider.getVoices() ) {

            let sample_file = `${dir}/${voice.voice}.mp3`;

            // rewrite this using await when we finally implement async/await for getAudioContent and buildRequest
            let request = provider.buildRequest(msg, {
                name: voice.voice
            });

            console.log(`Saving ${sample_file}`);

            provider.getAudioContent(request, (err, audio) => {

                if ( err ) {
                    console.log(err);
                    return;
                }

                // let decoder = new prism.opus.Decoder(48000, 1, 960);
                // let encoder = new lame.Encoder({
                //     channels: 1,
                //     bitDepth: 16,
                //     sampleRate: 48000,

                //     bitRate: 128,
                //     outSampleRate: 48000,
                //     mode: lame.STEREO
                // });
                // let stm = fs.createWriteStream(sample_file);

                // audio.pipe(decoder).pipe(encoder).pipe(stm);
            });

            await delay(10000);
        }
    }
})();
