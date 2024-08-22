import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 private http = inject(HttpClient);
 private baseUrl = 'https://reqres.in/api/users';

 getUserById(id: number): Observable<User> {
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.get<SingleUserResponse>(url)
    .pipe(
      map( response => response.data ),
      tap( user => console.log(user) )
    );
 }
}
