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
        console.log(e);
        obs.next(e);
      };
      this.recognition.onerror = (e) => {
        obs.next(e);
        obs.complete();
      };
      this.recognition.onend = (e) => {
        console.log(e);
        obs.next(e);
        obs.complete();
        // this.recognition.stop();
      };
      try {
        this.recognition.start();
        console.log('startedlistening');
      } catch (exp) {
        this.recognition.stop();
        console.log(exp.message);
      }
      return () => {
        this.recognition.stop();
      };
    });
    return speechStream;
  }

}

