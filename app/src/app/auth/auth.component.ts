import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('bg-primary');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-primary');
  }
}
