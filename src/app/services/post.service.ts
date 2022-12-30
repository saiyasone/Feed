import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:5000/api/post';
  private page: number;

  constructor(private http: HttpClient, private authService: AuthService) {}

  set setPage(value: number) {
    this.page = value;
  }

  getPosts(): Observable<{ post: Post[]; totalItem: number }> {
    return this.http.get<{ post: Post[]; totalItem: number }>(this.url, {
      params: {
        page: this.page,
      },
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(this.url + '/findOne/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }

  getPostbySearch(
    str: string,
    page: number
  ): Observable<{ post: Post[]; totalItem: number }> {
    return this.http.post<{ post: Post[]; totalItem: number }>(
      this.url + '/getSearch',
      {
        title: str,
        page: page,
      }
    );
  }

  createPost(title: string, content: string, file?: any): Observable<any> {
    const f: FormData = new FormData();
    f.append('title', title);
    f.append('content', content);
    f.append('image', file);
    return this.http.post<any>(this.url, f, {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }
  updatePost(
    id: string,
    title: string,
    content: string,
    file?: any
  ): Observable<any> {
    const f: FormData = new FormData();
    f.append('postId', id);
    f.append('title', title);
    f.append('content', content);
    f.append('image', file);
    return this.http.put<any>(this.url, f, {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }
  deletePost(id: string): Observable<any> {
    return this.http.post(
      this.url + '/delete',
      {
        postId: id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      }
    );
  }
}
