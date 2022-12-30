import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  getPost(): Observable<any> {
    return this.http.get<any>(this.url + '/getOne', {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }
}
