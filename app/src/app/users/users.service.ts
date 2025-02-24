import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  private apiUrl = '/users'; // Substitua pelo URL correto

  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number, name?: string): Observable<User[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<User[]>(this.apiUrl, { params });
  }
}
