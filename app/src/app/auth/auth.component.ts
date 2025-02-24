import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('bg-primary');

    if (this.authSrv.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-primary');
  }
}
