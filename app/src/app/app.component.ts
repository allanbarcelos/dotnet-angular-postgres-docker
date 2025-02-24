import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('sb-nav-fixed');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('sb-nav-fixed');
  }
}
