import { Observable } from 'rxjs';

const SpeechRecognition  =  window['SpeechRecognition'] || window['webkitSpeechRecognition'] ||
                            window['mozSpeechRecognition'] || window['msSpeechRecognition'] ||
                            window['oSpeechRecognition'];
enum Mode {
    Listening,
    Stop,
    Stopped
}

export class SpeechRecogniser {
  private recognition: any ;
  private mode: Mode;
  spokenObj;
  constructor() {
    try {
      this.recognition = new SpeechRecognition();
      this.recognition.maxAlternatives = 3;
      this.recognition.interimResults = true;
    } catch (exp) {
      console.log(exp.message);
    }
  }
  public startListening() {
    const self = this;
    this.mode = Mode.Listening;
    if (!this.recognition) {
      throw new Error('speech recognition not supported');
    }
    try {
      const speechStream = new  Observable( (obs) => {
        self.recognition.onresult = (resp: any) => {
          let spokenText;
          if ( 'results' in resp) {
            spokenText = Array.from(resp.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');
            let texts = Array.from(resp.results[0]);
            texts = texts.map( (result: any) => {
                          return {transcript: result.transcript, confidence: result.confidence }; });
            self.spokenObj = { transcript : spokenText, altTranscripts: texts, event: 'result' };
          }
          obs.next(self.spokenObj);
        };
        self.recognition.onerror = (err: any) => {
          self.spokenObj.event = 'error' ;
          obs.error(err);
          if ( self.mode === Mode.Listening) {
            try {
              self.recognition.stop();
            } catch ( exp) {
              console.log(exp.message);
            }
          }
        };
        self.recognition.onend = (e: any) => {
          if ( self.mode === Mode.Listening) {
            self.recognition.start();
            self.spokenObj.event = 'end' ;
            obs.next(self.spokenObj);
          } else {
            obs.complete();
          }
        };
        return () => {
          self.recognition.stop();
        };
      });
      self.recognition.start();
      return speechStream;
    } catch (exp) {
      self.recognition.stop();
      console.log(exp.message);
    }
  }

  public stopListening() {
    this.mode = Mode.Stop;
    if (!this.recognition) {
      throw new Error('speech recognition not supported');
    }
    try {
      this.recognition.abort();
    } catch (exp) {
      this.recognition.stop();
    }
    this.mode = Mode.Stopped;
  }

}

