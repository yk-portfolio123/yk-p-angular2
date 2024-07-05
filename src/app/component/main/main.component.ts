import { Component, OnInit } from '@angular/core';
import { ConnectService } from 'src/app/shared/connect.service';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  cardData: any[] = [];
  loader: boolean = false;
  imgAngular = 'assets/angular.png';
  imgReact = 'assets/react.png';
  imgVue = 'assets/vue.png';

  constructor(public auth: AuthService, private data: ConnectService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loader = true;

    try {
      this.cardData = await this.data.getSubCollections('phase');
      
      this.loader = false;
    } catch (error) {
      console.error('Error in MyComponent ngOnInit:', error);
    }

  }
}
