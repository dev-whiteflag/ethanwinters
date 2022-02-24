const path = require("path");

class FfmpegService {
    constructor({ logger }) {
        this.log = logger;
    }

    convertWavToMp3(path) {
        this.log.debug(`[ffmpeg] Converting WAV ${path} to MP3.`);
    }

    isFileType(fileName, type) {
        const ext = path.extname(fileName);
        return ext === type;
    }
}
