import { Component, OnInit, Input, ElementRef, NgZone } from '@angular/core';
import {TextComparer, TextCompareStats} from '../../core/classes/text-comparer';
import {Speechsynthesizer} from '../../core/classes/speechsynthesizer';
import {SpeechRecogniser} from '../../core/classes/speechrecogniser';

@Component({
  selector: 'app-speechreview',
  templateUrl: './speechreview.component.html',
  styleUrls: ['./speechreview.component.css']
})
export class SpeechreviewComponent implements OnInit {
  private textComparer: TextComparer;
  @Input()
  originalText: string;
  @Input()
  spokenText: string;
  public speechDiffString: string;
  public speechOmitedWords;
  private speech;
  private recorder;
  public isRecording: boolean;
  public textMatch;
  public currentWord;


  constructor(private rootElement: ElementRef, private zone: NgZone) {
    this.textComparer = new  TextComparer();
    this.speech = new Speechsynthesizer();
    this.recorder = new SpeechRecogniser();
    this.isRecording = false;
  }

  public compareText() {
    this.speechDiffString = this.textComparer.processDiff(this.originalText, this.spokenText);
    this.speechOmitedWords = this.textComparer.getOmitedTexts(this.originalText, this.spokenText);
    // this.rootElement.nativeElement.innerHTML = this.speechDiffString ;
  }

  public speak(message) {
    this.speech.speak(message);
  }

  public record(word) {
    this.isRecording = !this.isRecording;
    this.currentWord = word;
    try {
        if ( this.isRecording) {
          this.recorder.startListening().subscribe((resp) => {
            console.log(resp);
            this.zone.run(() => { this.textMatch = this.textComparer.matchTexts(resp, word); this.isRecording = false; });
          },
          () => { this.zone.run(() => { this.isRecording = false; }); },
          () => { this.zone.run(() => { this.isRecording = false; }); }
          );
        } else {
          this.recorder.stopListening();
        }
    } catch (exp) {
      console.log(exp.message);
    }
  }

  ngOnInit(): void {
  }

}
