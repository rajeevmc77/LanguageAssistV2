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
            this.spokenWord = (resp) ? resp.transcript : '';
            // this.isListening = false;
            this.completed.emit(this.spokenWord );
          } );
        },
        error: (err: any) => {
          this.zone.run(() => {
            this.errorMessage = err.message;
            // this.isListening = false;
            this.completed.emit('');
           });
        },
        complete: () => {
          // this.isListening = false;
          this.zone.run(() => {
            // this.isListening = false;
            this.spokenStory = this.spokenStory + ' ' + this.spokenWord;
            console.log('complete');
            console.log(this.spokenStory);
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
