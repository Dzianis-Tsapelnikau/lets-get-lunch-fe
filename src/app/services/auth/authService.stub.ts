import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Nullable } from '../nullable';
import { User } from '../user';
import { AuthService } from './auth.service';
import { IUser } from './IUser';

export class LoginResponse{
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  private _token!: string;
}

@Injectable()
export class AuthServiceStub {
  public loginSpy = jasmine.createSpy('login');
  login(credentials: IUser): Promise<LoginResponse> {
    return this.loginSpy(credentials);
  }

  public loggedInSpy = jasmine.createSpy('loggedIn');
  public get loggedIn$(): ReplaySubject<boolean> {
    return this.loggedInSpy();
  }

  public signupSpy = jasmine.createSpy('signup');
  signup(user: IUser): Promise<object> {
    return this.signupSpy(user);
  }

  public logoutSpy = jasmine.createSpy('logout');
  logout(): void {
    this.logoutSpy();
  }
  public readonly currentUserSpy = jasmine.createSpy('currentUser');
  public get currentUser$(): BehaviorSubject<Nullable<User>> {
    return this.currentUserSpy();
  }
  constructor() {
    this.loggedInSpy.and.returnValue(new ReplaySubject(1));
    this.loggedInSpy.and.returnValue(new BehaviorSubject(new User("","")));
  }
}

export function AUTH_SERVICE_PROVIDER(): { provide: typeof AuthService, useValue: AuthServiceStub } {
  return {
    provide: AuthService,
    useValue: new AuthServiceStub(),
  };
}

export function AUTH_SERVICE_STUB(): AuthServiceStub {
  return TestBed.inject(AuthService) as unknown as AuthServiceStub;
}
