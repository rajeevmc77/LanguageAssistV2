import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.css']
})
export class AudioplayerComponent implements OnInit {
  private audioObj: any;
  private currentURL: string;

  constructor() {
    this.audioObj = new Audio();
  }

  public playURL(url: string) {
    try {
      this.audioObj.src = url;
      this.currentURL = url;
      this.audioObj.load();
      this.audioObj.play();
    } catch (exp) {
      console.log(exp.message);
    }
  }

  public playForDuration(from, to) {
    try {
      this.audioObj.src = this.currentURL + '#t=' + from + ',' + to;
      this.audioObj.load();
      this.audioObj.play();
    } catch (exp) {
      console.log(exp.message);
    }
  }

  public stop() {
    try {
      this.audioObj.pause();
      this.audioObj.currentTime = 0;
    } catch (exp) {
      console.log(exp.message);
    }
  }

  ngOnInit() {
  }

}
