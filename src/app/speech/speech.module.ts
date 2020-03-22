import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeechRoutingModule } from './speech-routing.module';

import { RecorderComponent } from './recorder/recorder.component';
import { SpeakerComponent } from './speaker/speaker.component';


@NgModule({
  declarations: [ RecorderComponent, SpeakerComponent],
  imports: [
    CommonModule,
    SpeechRoutingModule
  ],
  exports: [ RecorderComponent, SpeakerComponent ]
})
export class SpeechModule { }
