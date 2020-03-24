import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {TextComparer, TextCompareStats} from '../../core/classes/text-comparer';

@Component({
  selector: 'app-speechassess',
  templateUrl: './speechassess.component.html',
  styleUrls: ['./speechassess.component.css']
})
export class SpeechassessComponent implements OnInit {
  private textComparer: TextComparer;
  @Input()
  originalText: string;
  @Input()
  spokenText: string;
  public speechStats: TextCompareStats;

  constructor(private rootElement: ElementRef) {
    this.textComparer = new  TextComparer();
    this.speechStats = new TextCompareStats();
  }

  public assessTexts() {
    this.speechStats = this.textComparer.getTextCompareStats(this.originalText, this.spokenText);
    // this.rootElement.nativeElement.innerHTML = this.speechDiffString ;
  }

  ngOnInit(): void {
  }

}
