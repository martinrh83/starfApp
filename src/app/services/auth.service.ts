import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class AuthService {
  public userProfile:any;
  private observer: Observer<string>;
  userProfileChange$: Observable<string> = new Observable(obs => this.observer = obs);

  auth0 = new auth0.WebAuth({
    clientID: 'Qkc6jYBWN5ALEkyo8CEKX0IX9CQdY2kz',
    domain: 'martinrh83.auth0.com',
    responseType: 'token id_token',
    audience: 'https://martinrh83.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid profile'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
        this.getProfile();
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }

    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.observer.next(profile.name);
      }
    });
  }
}
