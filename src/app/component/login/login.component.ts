import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email : string = '';
  public password : string = '';
  constructor(private auth : AuthService,private router:Router) { }

  ngOnInit(): void {
    this.isSmartPhone();
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';

  }
  isSmartPhone() {
    // UserAgentからのスマホ判定
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.router.navigate(['/mobile-top']);
    } 
  }
}
