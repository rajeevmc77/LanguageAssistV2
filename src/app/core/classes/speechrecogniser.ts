import { Observable } from 'rxjs';

const SpeechRecognition  =  window['SpeechRecognition'] || window['webkitSpeechRecognition'] ||
                            window['mozSpeechRecognition'] || window['msSpeechRecognition'] ||
                            window['oSpeechRecognition'];

export class SpeechRecogniser {
  private recognition: any ;
  constructor() {
    try {
      this.recognition = new SpeechRecognition();
      this.recognition.maxAlternatives = 5;
    } catch (exp) {
      console.log(exp.message);
    }
  }
  public startListening() {
    if (!this.recognition) {
      throw new Error('speech recognition not supported');
    }
    try {
      const speechStream = new  Observable( (obs) => {
        this.recognition.onresult = (resp: any) => {
          let spokenText;
          if ( 'results' in resp) {
            spokenText = Array.from(resp.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');
            let texts = Array.from(resp.results[0]);
            texts = texts.map( (result: any) => {
                          return {transcript: result.transcript, confidence: result.confidence }; });
            spokenText = { transcript : spokenText, altTranscripts: texts };
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
      this.recognition.start();
      return speechStream;
    } catch (exp) {
      this.recognition.stop();
      console.log(exp.message);
    }
  }

  public stopListening() {
    if (!this.recognition) {
      throw new Error('speech recognition not supported');
    }
    try {
      this.recognition.abort();
    } catch (exp) {
      this.recognition.stop();
    }
  }

}

