import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostPageComponent implements OnInit {
  isCreate = false;
  selectFile = null;
  previewPhoto = '';
  pathImage = 'http://localhost:5000';
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    content: new FormControl(''),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onFilterPostById();
  }

  pickFile(file: any) {
    const files = file.target.files[0];
    if (!files) {
      return;
    }
    this.selectFile = files;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.previewPhoto = reader.result as string;
    });
    reader.readAsDataURL(this.selectFile);
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    if (this.isCreate) {
      this.postService
        .updatePost(
          this.f['id'].value,
          this.f['title'].value,
          this.f['content'].value,
          this.selectFile ? this.selectFile : null
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          complete: () => {},
        });
    } else {
      this.postService
        .createPost(
          this.f['title'].value,
          this.f['content'].value,
          this.selectFile
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          complete: () => {},
        });
    }
  }

  onFilterPostById() {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id') || '';
      if (id) {
        this.isCreate = true;
        this.postService.getPost(id).subscribe((data) => {
          this.previewPhoto = this.pathImage + '/' + data.imageUrl;
          this.form.patchValue({
            id: data._id,
            title: data.title,
            content: data.content,
          });
        });
      } else {
        this.isCreate = false;
      }
    });
  }
}
