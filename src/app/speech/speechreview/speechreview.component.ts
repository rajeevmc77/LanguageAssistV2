import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {TextComparer} from '../../core/classes/text-comparer';

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
  public speechPostProcesseedDiffString: string;
  public speechStats: any;

  constructor(private rootElement: ElementRef) {
    this.textComparer = new  TextComparer();
  }

  public compareText() {
    this.speechDiffString = this.textComparer.diffTexts(this.originalText, this.spokenText);
    this.speechPostProcesseedDiffString = this.textComparer.getPostProcessedOmitedTexts(this.originalText,
                this.spokenText).join(' ');
    this.speechStats = this.textComparer.getTextCompareStats(this.originalText, this.spokenText);
    // this.rootElement.nativeElement.innerHTML = this.speechDiffString ;
  }

  ngOnInit(): void {
  }

}
