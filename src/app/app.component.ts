import { Component, NgZone } from '@angular/core';
import {SpeechrecorderComponent} from './speech/speechrecorder/speechrecorder.component';

declare var diffString: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
//
  constructor() {
    const str1 = 'This is Rajeev';
    const str2 = 'this is Rajesh';
    const res = diffString(str1, str2);
  }

}

