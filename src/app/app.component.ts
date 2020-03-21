import { Component, NgZone } from '@angular/core';

import {SpeechRecogniser} from './core/classes/speechrecogniser';

declare var diffString: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  speechListener: SpeechRecogniser;
  spokenText = 'Say Something!';
  errorMessage = '';
  isListening = false;
//
  constructor(private zone: NgZone) {
    this.speechListener = new SpeechRecogniser();
    const str1 = 'This is Rajeev';
    const str2 = 'this is Rajesh';
    const res = diffString(str1, str2);
  }

  listen(event: any) {
    // event.target.disabled = true;
    this.isListening = !this.isListening;
    let speechResp;
    if ( this.isListening) {
       speechResp = this.speechListener.startListening();
    } else {
      this.speechListener.stopListening();
    }
    if (speechResp) {
      speechResp.subscribe(
        (resp: any ) => {
          this.zone.run(() => { this.spokenText = resp; this.isListening = false; } );
        },
        (err: any) => {
          this.zone.run(() => { this.errorMessage = err.message; this.isListening = false; });
        },
        () => {
          this.isListening = false;
          this.zone.run(() => { this.isListening = false; });
        }
      );
    }
  }
}

