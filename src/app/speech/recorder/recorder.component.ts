import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import {SpeechRecogniser} from '../../core/classes/speechrecogniser';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})

export class RecorderComponent implements OnInit {

  @Output() public completed = new EventEmitter<string>();

  speechListener: SpeechRecogniser;
  spokenText = ' ';
  errorMessage;
  isListening = false;
//
  constructor(private zone: NgZone) {
    this.speechListener = new SpeechRecogniser();
  }

  startListening() {
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
          let spokenWord = ' ';
          if (resp) {
            spokenWord = resp.transcript;
          }
          this.zone.run(() => {
            this.spokenText = spokenWord;
            this.isListening = false;
            this.completed.emit(spokenWord);
          } );
        },
        (err: any) => {
          this.zone.run(() => {
            this.errorMessage = err.message;
            this.isListening = false;
            this.completed.emit('');
           });
        },
        () => {
          // this.isListening = false;
          this.zone.run(() => {
            this.isListening = false;
            this.completed.emit('');
          });
        }
      );
    }
  }
  ngOnInit() {
  }
}
