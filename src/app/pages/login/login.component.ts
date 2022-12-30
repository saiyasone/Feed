import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginPageComponent implements OnDestroy {
  onDestroy$ = new Subject<void>();
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }
}
