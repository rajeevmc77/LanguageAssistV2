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
      this.recognition.onresult = (resp: any) => {
        let spokenText = ' ';
        if ( 'results' in resp) {
          spokenText = Array.from(resp.results)
                      // .filter((result: any) => { if ( result.isFinal ) { return result; } } )
                      .map(result => result[0])
                      .map(result => result.transcript)
                      .join('');
        }
        obs.next(spokenText);
      };
      this.recognition.onerror = (err: any) => {
        obs.error(err);
      };
      this.recognition.onend = (e: any) => {
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

