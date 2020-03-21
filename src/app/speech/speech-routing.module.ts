import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecorderComponent } from './recorder/recorder.component';
import {SpeakerComponent} from './speaker/speaker.component';

const routes: Routes = [
  { path: 'recorder', component: RecorderComponent },
  { path: 'speaker',  component: SpeakerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeechRoutingModule { }
