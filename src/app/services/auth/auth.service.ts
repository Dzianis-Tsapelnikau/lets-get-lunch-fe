import { EventEmitter, Injectable, Output } from '@angular/core';
import { Nullable } from '../nullable';
import { User } from '../user';
import { IUser } from './IUser';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static AuthorizationLocalStorageItemName = 'Authorization';

  private readonly _loggedIn$: ReplaySubject<boolean>;
  public get loggedIn$(): ReplaySubject<boolean> {
    return this._loggedIn$;
  }

  private readonly _currentUser$: BehaviorSubject<Nullable<User>>;
  public get currentUser$(): BehaviorSubject<Nullable<User>> {
    return this._currentUser$;
  }

  constructor(private _httpClient: HttpClient, private _jwtHelper: JwtHelperService) {
    this._loggedIn$ = new ReplaySubject<boolean>(1);
    this._currentUser$ = new BehaviorSubject<Nullable<User>>(null);
  }

  signup(user: IUser): Observable<object> {
    return this._httpClient.post('_httpClient://localhost:8080/api/users', user).pipe(mergeMap(res => this.login(user)));
  }

  login(user: IUser): Observable<object> {
    return this._httpClient.post('_httpClient://localhost:8080/api/sessions', user).pipe(map((res: any) => {
      localStorage.setItem(AuthService.AuthorizationLocalStorageItemName, res.token);
      this._currentUser$.next(this._jwtHelper.decodeToken(localStorage.getItem(AuthService.AuthorizationLocalStorageItemName)||undefined));
      this._loggedIn$.next(true);
      return res;
    }));
  }

  isLoggedIn(): boolean {
    return !this._jwtHelper.isTokenExpired();
  }

  logout(): void {
    localStorage.removeItem(AuthService.AuthorizationLocalStorageItemName);
    this.loggedIn$.next(false);
  }
}
