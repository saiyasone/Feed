import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.css'],
})
export class FeedDetailPage {
  pathImage = 'http://localhost:5000';
  post: Post;
  constructor(
    private postService: PostService,
    private activeRoute: ActivatedRoute
  ) {
    activeRoute.paramMap.subscribe((param) => {
      if (param.get('id')) {
        this.onFetchData(param.get('id'));
      }
    });
  }

  onFetchData(id: string) {
    this.postService.getPost(id).subscribe((data) => {
      this.post = data;
    });
  }
}
