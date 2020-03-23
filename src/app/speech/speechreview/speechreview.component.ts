import { Component, OnInit, Input } from '@angular/core';
import {TextComparer} from '../../core/classes/text-comparer';


@Component({
  selector: 'app-speechreview',
  templateUrl: './speechreview.component.html',
  styleUrls: ['./speechreview.component.css']
})
export class SpeechreviewComponent implements OnInit {
  public speechDiffString: string;
  private textComparer: TextComparer;
  @Input()
  originalText: string;
  @Input()
  spokenText: string;

  constructor() {
    this.textComparer = new  TextComparer();
  }

  public compareText() {
    this.speechDiffString = this.textComparer.diffTexts(this.originalText, this.spokenText);
  }

  ngOnInit(): void {
  }

}
