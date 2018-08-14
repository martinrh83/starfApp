import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  profile:any;
  userEmail: string;
  constructor(public auth: AuthService) { 
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()){
      let userProfile = localStorage.getItem('profile');
      this.userEmail= userProfile
     }
     else {
      this.auth.userProfileChange$.subscribe(email => {this.userEmail = email;
        localStorage.setItem('profile', this.userEmail);});
    }
  }

  login(){
    this.auth.login();
  }

  salir(){
    this.auth.logout();
    this.userEmail= null;
  }
}
