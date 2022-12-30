import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  userId: string;
  @Input() post!: Post;
  @Output() delEmit = new EventEmitter<string>();

  constructor(private router: Router, private authService: AuthService) {
    authService.userId$.subscribe((uid) => {
      this.userId = uid;
    });
  }

  edit(id: string) {
    this.router.navigate(['/edit', id]);
  }
  del(id: string) {
    this.delEmit.emit(id);
  }
}
