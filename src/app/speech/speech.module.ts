import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeechRoutingModule } from './speech-routing.module';

import { RecorderComponent } from './recorder/recorder.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeechassessComponent } from './speechassess/speechassess.component';
import { SpeechreviewComponent } from './speechreview/speechreview.component';


@NgModule({
  declarations: [ RecorderComponent, SpeakerComponent, SpeechassessComponent, SpeechreviewComponent],
  imports: [
    CommonModule,
    SpeechRoutingModule
  ],
  exports: [ RecorderComponent, SpeakerComponent ]
})
export class SpeechModule { }
