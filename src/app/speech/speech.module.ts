import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeechRoutingModule } from './speech-routing.module';

import { RecorderComponent } from './recorder/recorder.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';


@NgModule({
  declarations: [ RecorderComponent, SpeakerComponent, AudioplayerComponent],
  imports: [
    CommonModule,
    SpeechRoutingModule
  ],
  exports: [ RecorderComponent, SpeakerComponent, AudioplayerComponent ]
})
export class SpeechModule { }
