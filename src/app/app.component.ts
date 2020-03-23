import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {SpeakerComponent} from './speech/speaker/speaker.component';
import {SpeechreviewComponent} from './speech/speechreview/speechreview.component';
import { AudioPlayer } from './core/classes/audioplayer';

declare var diffString: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public message: string;
  @ViewChild ('speaker', { read: SpeakerComponent, static: true} )
  speakerObj: SpeakerComponent;
  @ViewChild ('speachReview', { read: SpeechreviewComponent, static: true} )
  speachReviewObj: SpeechreviewComponent;

  private audioPlayer: AudioPlayer;
  public isPlaying: boolean;
  public originalText: string;
  public spokenText: string;

  constructor() {
    this.isPlaying = false;
    this.audioPlayer = new AudioPlayer();

    this.message = `I am Rajeev. This is my test application to support the kids to learn English.`;

    this.originalText = this.message;
    this.spokenText = 'I am Rajiv. This is my sample application to help study English.';
  }
  ngAfterViewInit(): void {
    //  throw new Error("Method not implemented.");
  }

  public diffText() {
    try {
      this.speachReviewObj.compareText();
    } catch (exp) {
      console.log(exp.message);
    }
  }

  public startAudio() {
    this.speakerObj.speak();
  }
  public playAudio() {
    if ( this.isPlaying ) {
      this.audioPlayer.pauseAudio();
    } else {
      this.audioPlayer.playURL('assets/audio/SheebutheSheep_1.mp3');
    }
    this.isPlaying = !this.isPlaying;
  }
  public stopAudio() {
      this.audioPlayer.stopAudio();
  }
  public playAudioFragment() {
    this.audioPlayer.playForDuration(10, 20);
  }

}

