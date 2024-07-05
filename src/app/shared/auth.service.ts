import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: boolean; 
  constructor(public fireauth : AngularFireAuth, private router : Router) { 
    this.userLoggedIn = false;
      this.fireauth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
        if (user) {
            this.userLoggedIn = true;
        } else {
            this.userLoggedIn = false;
        }
    });
  }

  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');

        /*if(res.user?.emailVerified == true) {
          this.router.navigate(['/main']);
        } else {
          this.router.navigate(['/login']);
        }*/
        this.router.navigate(['/main']);

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }
  get  isLoggedIn(): boolean {
    const user1 = JSON.parse(localStorage.getItem('token')!);
    return (user1 !== null) ? true : false;
  }
  // login method
  backToLogin() {
    this.router.navigate(['/login']);
  }
}
