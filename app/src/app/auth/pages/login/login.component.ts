import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;

  submitted = false;
  loading = false;
  error = false;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    this.authSrv.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err;
        this.loading = true;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
