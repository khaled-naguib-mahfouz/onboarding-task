import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { FormSettings } from '../models/formSettings.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BaseapiUrl = 'http://localhost:3000/'; 

  constructor(private http: HttpClient) {}

   getFormSettings(): Observable<FormSettings> {
    return this.http.get<FormSettings>(this.BaseapiUrl+'formSettings');
  }
  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.BaseapiUrl+'users', user);
  }
public checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<any[]>(`${this.BaseapiUrl}users?email=${email}`).pipe(
    map(users => users.length > 0)
  );
}
updateUser(id: string, data: Partial<User>) {
  return this.http.patch<User>(`${this.BaseapiUrl}users/${id}`, data);
}
  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.BaseapiUrl}users/${id}`);
  }
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }
}
