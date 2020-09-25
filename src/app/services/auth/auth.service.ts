import {Injectable} from '@angular/core';
import {User} from "./user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(user: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/users', user).pipe(mergeMap(res=>this.login(user)));
  }

  login(user: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/sessions', user).pipe(map((res: any) => {
      localStorage.setItem('Authorization', res.token);
      return res;
    }));
  }
}
