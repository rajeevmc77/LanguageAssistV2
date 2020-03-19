import { Component } from '@angular/core';

declare var diffString: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'englishAssist';

  constructor(){
    const str1 = 'This is Rajeev';
    const str2 = 'this is Rajesh';

    const res = diffString(str1, str2);
    console.log(res);

  }

}

