import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  title = 'KOJA-FX';
  constructor(public auth: AuthService) {
  }
  logout() {
    this.auth.logout();
  }
}