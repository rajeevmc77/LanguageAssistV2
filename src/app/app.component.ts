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
  type = 'type';
//
  constructor(private zone: NgZone) {
    this.speechListener = new SpeechRecogniser();
    const str1 = 'This is Rajeev';
    const str2 = 'this is Rajesh';
    const res = diffString(str1, str2);
  }

  listen(event: any) {
    // event.target.disabled = true;
    const speechResp = this.speechListener.startListening();
    if (speechResp) {
      speechResp.subscribe(
        (resp: any ) => {
         // this.zone.run(() => this.type = resp.type );
          if ( 'results' in resp) {
            const spokenText = Array.from(resp.results)
                        // .filter((result: any) => { if ( result.isFinal ) { return result; } } )
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');
            this.zone.run(() => this.spokenText = spokenText );
          } else if ('error' in resp) {
            this.spokenText = resp.error;
            this.zone.run(() => this.spokenText = resp.error );
          }
        }
      );
    }
  }
}

