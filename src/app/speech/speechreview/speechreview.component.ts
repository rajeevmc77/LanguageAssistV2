import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {TextComparer, TextCompareStats} from '../../core/classes/text-comparer';

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


  constructor(private rootElement: ElementRef) {
    this.textComparer = new  TextComparer();
  }

  public compareText() {
    this.speechDiffString = this.textComparer.processDiff(this.originalText, this.spokenText);
    this.speechOmitedWords = this.textComparer.getOmitedTexts(this.originalText, this.spokenText);
    // this.rootElement.nativeElement.innerHTML = this.speechDiffString ;
  }

  ngOnInit(): void {
  }

}
