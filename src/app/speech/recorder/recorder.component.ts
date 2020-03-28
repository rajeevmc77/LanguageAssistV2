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
  spokenStory = '';
  spokenWord = ' ';
  errorMessage;
  isListening = false;
//
  constructor(private zone: NgZone) {
    this.speechListener = new SpeechRecogniser();
  }

  startListening() {
    const self = this;
    this.isListening = !this.isListening;
    let speechResp;
    if ( this.isListening) {
        speechResp = this.speechListener.startListening();
    } else {
       this.speechListener.stopListening();
    }
    if (speechResp) {
      speechResp.subscribe( {
        next: (resp: any ) => {
          this.zone.run(() => {
            if ( resp.event === 'result') {
              this.spokenWord = (resp) ? resp.transcript : '';
            } else {
              this.spokenStory = this.spokenStory + ' ' + this.spokenWord;
            }
            this.completed.emit(this.spokenStory );
          } );
        },
        error: (err: any) => {
          this.zone.run(() => {
            this.errorMessage = err.message;
            this.completed.emit('');
           });
        },
        complete: () => {
          this.zone.run(() => {
            this.spokenStory = this.spokenStory + ' ' + this.spokenWord;
            this.completed.emit('');
          });
        }
      }
      );
    }
  }
  ngOnInit() {
  }
}
