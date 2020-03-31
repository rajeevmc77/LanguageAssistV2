import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {SpeakerComponent} from './speech/speaker/speaker.component';
import {SpeechreviewComponent} from './speech/speechreview/speechreview.component';
import { AudioPlayer } from './core/classes/audioplayer';
import { SpeechassessComponent } from './speech/speechassess/speechassess.component';
import { RecorderComponent } from './speech/recorder/recorder.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild ('recorder', { read: RecorderComponent, static: true} )
  recorderObj: RecorderComponent;
  @ViewChild ('speaker', { read: SpeakerComponent, static: true} )
  speakerObj: SpeakerComponent;
  @ViewChild ('speachReview', { read: SpeechreviewComponent, static: true} )
  speachReviewObj: SpeechreviewComponent;
  @ViewChild ('speachAssess', { read: SpeechassessComponent, static: true} )
  speachAssessObj: SpeechassessComponent;

  private audioPlayer: AudioPlayer;
  public isPlaying: boolean;
  public originalText: string;
  public spokenStory: string;
  public story: string;
  msg: any;

  constructor() {
    this.isPlaying = false;
    this.audioPlayer = new AudioPlayer();

    this.story = `Sheebu was a sheep.
                  One day she found a bell.
                  She thought to herself 'Wow! What a tingle-jingle bell.
                  I will wear this bell.'
                  She hung it around her neck.
                  Seeing the bell her friends asked, "Sheebu, what a lovely bell you have."
                  Sheebu felt happy.`;
    this.spokenStory = ' Sheebu was';

    // this.originalText = this.story;
    // this.spokenText = 'I am Rajiv. This is my sample application to help study English.';
  }
  ngAfterViewInit(): void {
    //  throw new Error("Method not implemented.");
  }

  showSelectedText() {
    // let selection = window.getSelection();
    // let range = selection.getRangeAt(0);
    // let node = selection.anchorNode;
    //console.log(selection);
  }


  public recordCompleted(msg) {
    this.spokenStory = msg;
  }

  public diffText() {
    try {
      this.speachReviewObj.compareText();
      this.speachAssessObj.assessTexts();
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

