import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechrecorderComponent } from './speechrecorder/speechrecorder.component';

@NgModule({
  declarations: [SpeechrecorderComponent],
  imports: [
    CommonModule
  ],
  exports: [ SpeechrecorderComponent]
})
export class SpeechModule { }
