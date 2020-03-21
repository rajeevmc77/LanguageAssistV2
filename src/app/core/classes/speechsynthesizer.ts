const Synthesizer = window.speechSynthesis;

export class Speechsynthesizer {
  private synth ;
  private toSpeak: SpeechSynthesisUtterance;
  private voices: any;
  private cancelspeak: boolean;

  constructor() {
    this.toSpeak = new SpeechSynthesisUtterance();
    this.synth = Synthesizer;
    this.voices = this.synth.getVoices();
    this.toSpeak.voice = this.voices[2];
    this.toSpeak.lang = 'en-US';
    this.toSpeak.rate = 1;
    this.cancelspeak = false;
  }

  public decompose(message, splitsize) {
    const msgList = [];
    const msgSplitArray = message.split(' ');
    const msgLength = msgSplitArray.length;
    let cumilativeListLength = 0;
    let msg = '';
    while (true) {
        msg = msgSplitArray.slice(cumilativeListLength, cumilativeListLength + splitsize).join(' ');
        msgList.push(msg);
        cumilativeListLength = cumilativeListLength + splitsize;
        if (cumilativeListLength >= msgLength) {
            break;
        }
    }
    return msgList;
  }

  public cancel() {
    this.cancelspeak = true;
    this.synth.cancel();
  }

  public async speak(message) {
    this.cancelspeak = false;
    try {
      const msgArr = this.decompose(message, 15);
      for (const msg in msgArr) {
        if (!this.cancelspeak) {
          await this.speakinBatches(msg);
        } else {
          break;
        }
      }
    } catch (exp) {
        console.log('exception ocured.', exp.message);
    }
  }

  private speakinBatches(message) {
    const promise = new Promise((resolve, reject) => {
         this.toSpeak.onend = (evt) => {
          resolve(evt);
        };
         this.toSpeak.onerror = (evt) => {
          reject(evt);
        };
    });
    this.toSpeak.text = message;
    this.synth.speak(this.toSpeak);
    return promise;
  }
}
