import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticate$ = new BehaviorSubject<boolean>(false);
  userId$ = new BehaviorSubject<string>('');
  private url = 'http://localhost:5000/api/auth';
  private token$ = new BehaviorSubject<string>('');

  get token() {
    return this.token$.getValue();
  }
  get userId() {
    return this.userId$.getValue();
  }
  get isAuthenticated() {
    return this.isAuthenticate$.getValue();
  }

  constructor(private http: HttpClient, private router: Router) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.put(this.url + '/register', {
      name: name,
      email: email,
      password: password,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(this.url + '/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          if (res) {
            this.handleAuth(res);
          }
        })
      );
  }

  private handleAuth(authData: any) {
    localStorage.setItem('token', authData.accessToken);
    localStorage.setItem('userId', authData.userId);

    this.token$.next(authData.accessToken);
    this.userId$.next(authData.userId);
    this.isAuthenticate$.next(true);
    this.router.navigate(['/']);
  }

  private isAuthData(): any {
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId') || '';
    if (!token) {
      return null;
    }

    return {
      token,
      userId,
    };
  }

  autoSignIn() {
    const authData = this.isAuthData();
    if (!authData) {
      return;
    }
    const token = authData.token;
    const userId = authData.userId;
    if (token === null) {
      this.token$.next('');
      this.userId$.next('');
      this.isAuthenticate$.next(false);
      return;
    }
    this.token$.next(token);
    this.userId$.next(userId);
    this.isAuthenticate$.next(true);
  }

  signOut() {
    localStorage.clear();
    this.token$.next('');
    this.userId$.next('');
    this.isAuthenticate$.next(false);
    this.router.navigate(['/login']);
  }
}
