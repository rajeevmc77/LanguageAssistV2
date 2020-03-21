import { Component, OnInit } from '@angular/core';

import {Speechsynthesizer} from '../../core/classes/speechsynthesizer';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {
  private synth: Speechsynthesizer;

  constructor() {
    this.synth = new Speechsynthesizer();
  }

  ngOnInit() {
    let message = `By default, NgModules are eagerly loaded,
    which means that as soon as the app loads, so do all the NgModules,
    whether or not they are immediately necessary. For large apps with lots of routes,
    consider lazy loading—a design pattern that loads NgModules as needed. Lazy loading
    helps keep initial bundle sizes smaller, which in turn helps decrease load times.
    This creates an app called customer-app and the --routing flag generates a file called
    app-routing.module.ts, which is one of the files you need for setting up lazy
    loading for your feature module. Navigate into the project by issuing the command
    cd customer-app.`;
    this.synth.speak(message);
  }

}
