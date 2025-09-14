import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { FormSettings } from '../models/FormSettings.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BaseapiUrl = 'http://localhost:5112/api/'; 

  constructor(private http: HttpClient) {}

   getFormSettings(): Observable<FormSettings[]> {
    return this.http.get<FormSettings[]>(this.BaseapiUrl+'formsettings/GetFormSettings');
  }
  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.BaseapiUrl+'user/createUser', user);
  }
public checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<any[]>(`${this.BaseapiUrl}users?email=${email}`).pipe(
    map(users => users.length > 0)
  );
}
updateUser(id: string, user: User) {
  return this.http.put<User>(
    `${this.BaseapiUrl}user/updateUser?id=${id}`,
    user,
    { headers: { 'Content-Type': 'application/json' } }
  );
}


  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.BaseapiUrl}user/${id}`);
  }
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }
}
