import { Observable } from 'rxjs';

const SpeechRecognition  =  window['SpeechRecognition'] || window['webkitSpeechRecognition'] ||
                            window['mozSpeechRecognition'] || window['msSpeechRecognition'] ||
                            window['oSpeechRecognition'];

export class SpeechRecogniser {
  private recognition: any ;
  constructor() {
    try {
      this.recognition = new SpeechRecognition();
    } catch (exp) {
      console.log(exp.message);
    }
  }
  public startListening() {
    if (!this.recognition) {
      throw new Error('speech recognition not supported');
    }
    const speechStream = new  Observable( (obs) => {
      this.recognition.onresult = (e) => {
        obs.next(e);
      };
      this.recognition.onerror = (e) => {
        obs.error(e);
      };
      this.recognition.onend = (e) => {
        obs.complete();
      };
      return () => {
        this.recognition.stop();
      };
    });
    try {
      this.recognition.start();
      console.log('listening...');
      return speechStream;
    } catch (exp) {
      this.recognition.stop();
      console.log(exp.message);
    }
  }

}

