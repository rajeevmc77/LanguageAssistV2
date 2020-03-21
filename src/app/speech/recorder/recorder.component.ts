import { Component, OnInit, NgZone } from '@angular/core';
import {SpeechRecogniser} from '../../core/classes/speechrecogniser';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})

export class RecorderComponent implements OnInit {

  speechListener: SpeechRecogniser;
  spokenText = 'Say Something!';
  errorMessage = '';
  isListening = false;
//
  constructor(private zone: NgZone) {
    this.speechListener = new SpeechRecogniser();
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
  ngOnInit() {
  }
}
