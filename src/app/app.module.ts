import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layouts/header/header.component';
import { PostPageComponent } from './pages/feed/feed.component';
import { LoginPageComponent } from './pages/login/login.component';
import { PostListComponent } from './components/PostList/post-list.component';
import { CreatePostPageComponent } from './pages/createPost/create-post.component';
import { FeedDetailPage } from './pages/feed-detail/feed-detail.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterPage } from './pages/register/register.component';
import { ProfilePage } from './pages/profile/profile.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/feed',
        pathMatch: 'full',
      },

      {
        path: 'feed',
        component: PostPageComponent,
      },
      {
        path: 'feed/:id',
        component: FeedDetailPage,
      },
      {
        path: 'create-post',
        component: CreatePostPageComponent,
      },
      {
        path: 'edit/:id',
        component: CreatePostPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPage,
      },
      {
        path: 'profile',
        component: ProfilePage,
      },
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    PostPageComponent,
    PostListComponent,
    CreatePostPageComponent,
    FeedDetailPage,
    SpinnerComponent,

    // ======== auth ==========
    LoginPageComponent,
    RegisterPage,
    ProfilePage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
