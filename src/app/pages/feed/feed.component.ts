import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { io } from 'socket.io-client';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class PostPageComponent implements OnInit, OnDestroy {
  page = 1;
  totalItems = 0;
  loading = false;
  posts: Post[] = [];
  ondestroy$ = new Subject<void>();
  searchPost$ = new Subject<string>();
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.onFetchData();
    // this.onConnectIO();
  }
  ngOnDestroy() {
    this.ondestroy$.next();
    this.ondestroy$.complete();
  }

  onConnectIO() {
     
  }

  handlePage(index: number) {
    this.page = index;
    this.posts = [];
    this.onFetchData();
  }

  onFetchData() {
    this.postService.setPage = this.page;
    this.loading = true;
    this.postService
      .getPosts()
      .pipe(
        map((post) => post),
        takeUntil(this.ondestroy$)
      )
      .subscribe({
        next: (post) => {
          this.totalItems = post.totalItem;
          this.posts = post.post;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onAdd() {
    this.router.navigate(['/create-post']);
  }

  onSearch(str: string) {
    this.page = 1;
    this.posts = [];
    this.loading = true;
    this.postService
      .getPostbySearch(str, this.page)
      .pipe(map((el) => el))
      .subscribe({
        next: (post) => {
          this.posts = post.post;
          this.totalItems = post.totalItem;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onDelete(id: string) {
    this.posts = [];
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = [];
      },
      error: () => {},
      complete: () => {
        this.onFetchData();
      },
    });
  }
}
