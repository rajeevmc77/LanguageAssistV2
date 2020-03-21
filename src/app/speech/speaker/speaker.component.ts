import { Component, OnInit, Input ,  AfterViewInit} from '@angular/core';

import {Speechsynthesizer} from '../../core/classes/speechsynthesizer';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit,  AfterViewInit {
  private synth: Speechsynthesizer;
  @Input() messagetoSpeak: string;

  constructor() {
    this.synth = new Speechsynthesizer();
  }

  public speak() {
    this.synth.speak(this.messagetoSpeak);
  }

  ngOnInit() { }
  ngAfterViewInit() { }

}
