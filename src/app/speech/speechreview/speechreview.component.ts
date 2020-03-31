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
  public currentWord;
  public progressIndicator;
  // public progressIndicatorText;
  public wordStats;


  constructor(private rootElement: ElementRef, private zone: NgZone) {
    this.textComparer = new  TextComparer();
    this.speech = new Speechsynthesizer();
    this.recorder = new SpeechRecogniser();
    this.isRecording = false;
    this.progressIndicator = 0;
    this.wordStats = {};
  }

  public compareText() {
    this.speechDiffString = this.textComparer.processDiff(this.originalText, this.spokenText);
    this.speechOmitedWords = this.textComparer.getOmitedTexts(this.originalText, this.spokenText);
    this.speechOmitedWords = [... new Set(this.speechOmitedWords) ];
    this.speechOmitedWords = this.speechOmitedWords.sort();
    // this.rootElement.nativeElement.innerHTML = this.speechDiffString ;
  }

  public speak(message) {
    this.speech.speak(message);
  }

  addWordStats(wordstat) {
    const style = this.getProgressIndicator(wordstat);
    const historyStyle = style;
    historyStyle['width'] = style.height;
    historyStyle['height'] = '100%';
    if (wordstat.word in this.wordStats) {
      this.wordStats[wordstat.word].push(
        {progress: wordstat.progress, spokenWord: wordstat.spokenWord, 'style': historyStyle});
      this.wordStats[wordstat.word] = this.wordStats[wordstat.word].slice(-5);
      this.wordStats[wordstat.word].style = style;
    } else {
      this.wordStats[wordstat.word] = [
        {progress: wordstat.progress , spokenWord: wordstat.spokenWord, 'style': historyStyle}] ;
      this.wordStats[wordstat.word].style = style;
    }
  }

  public record(word) {
    this.progressIndicator = -1;
    // this.progressIndicatorText = '';
    this.isRecording = !this.isRecording;
    this.currentWord = word;
    try {
        if ( this.isRecording) {
          this.recorder.startListening().subscribe((resp) => {
            let spokenWord = ' ';
            if ( resp) {
              spokenWord = resp.transcript;
              // console.log(resp.altTranscripts);
              if ( resp.event === 'result') {
                this.zone.run(() => {
                  this.progressIndicator = this.textComparer.getTextsMatch(spokenWord, word);
                  // this.isRecording = false;
                  // this.progressIndicatorText = `${this.progressIndicator * 25}%`;
                });
              }
              if ( resp.event === 'end') {
                this.zone.run(() => {
                  this.isRecording = false;
                  this.addWordStats({ 'word': word, progress: this.progressIndicator, 'spokenWord': spokenWord });
                });
                this.recorder.stopListening();
              }
            }
          },
          (err: any) => { this.zone.run(() => { this.isRecording = false; this.recorder.stopListening(); }); },
          () => { this.zone.run(() => { this.isRecording = false; }); this.recorder.stopListening(); }
          );
        } else {
          this.recorder.stopListening();
        }
    } catch (exp) {
      console.log(exp.message);
    }
  }

  getProgressIndicator(wordstat) {
    let color = 'white';
    let height = 0;
    if (wordstat) {
      switch (wordstat.progress) {
        case 1:
          color = 'red';
          break;
        case 2:
          color = 'orange';
          break;
        case 3:
          color = 'greenyellow';
          break;
        case 4:
          color = 'green';
          break;
      }
      height = wordstat.progress * 25;
    }
    const style = {'background-color': `${color}`, 'height': `${height}%` };
    return style;
  }

  ngOnInit(): void {
  }

}
