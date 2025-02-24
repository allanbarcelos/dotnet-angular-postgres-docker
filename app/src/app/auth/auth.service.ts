import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!this.token);
  }

  login(email: string, password: string): Observable<{ Token: string }> {
    return this.http.post<{ Token: string }>('/auth/login', { email, password }).pipe(
      tap(response => {
        this.token = response.Token;
        localStorage.setItem('token', this.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return this.token;
  }

  recoverPassword(email: string): Observable<void> {
    return this.http.post<void>('/auth/recover-password', { email });
  }
}