import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yk-p-angular2';
  isMobile : boolean = false;
  constructor() {
    this.isSmartPhone();
  }

  isSmartPhone() {
    // UserAgentからのスマホ判定
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

}
