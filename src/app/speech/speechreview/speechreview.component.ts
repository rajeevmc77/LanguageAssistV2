import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {TextComparer, TextCompareStats} from '../../core/classes/text-comparer';
import {Speechsynthesizer} from '../../core/classes/speechsynthesizer';

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
  public isRecording: boolean;


  constructor(private rootElement: ElementRef) {
    this.textComparer = new  TextComparer();
    this.speech = new Speechsynthesizer();
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

  public record() {
    this.isRecording = true;
  }

  ngOnInit(): void {
  }

}
