import { Component, NgZone, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {SpeakerComponent} from './speech/speaker/speaker.component';

declare var diffString: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private message: string;
  @ViewChild ('speaker', { read: SpeakerComponent, static: true} )
  speakerObj: SpeakerComponent;

  constructor() {
    const str1 = 'This is Rajeev';
    const str2 = 'this is Rajesh';
    const res = diffString(str1, str2);

    this.message = `By default, NgModules are eagerly loaded,
    which means that as soon as the app loads, so do all the NgModules,
    whether or not they are immediately necessary. For large apps with lots of routes,
    consider lazy loading—a design pattern that loads NgModules as needed. Lazy loading
    helps keep initial bundle sizes smaller, which in turn helps decrease load times.
    This creates an app called customer-app and the --routing flag generates a file called
    app-routing.module.ts, which is one of the files you need for setting up lazy
    loading for your feature module. Navigate into the project by issuing the command
    cd customer-app.`;
  }
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }

  public startAudio() {
    this.speakerObj.speak();
  }

}

