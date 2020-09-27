import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {AuthService} from "../../services/auth/auth.service";
import {Mock} from "protractor/built/driverProviders";
class MockRouter{
  navigate(path) {}
}

describe('AuthGuard', () => {
  // let guard: AuthGuard;
  //
  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   guard = TestBed.inject(AuthGuard);
  // });

  describe('canActivate', () => {
    let authGuard : AuthGuard;
    let authService;
    let router;
    it('should return true for a logged in user', ()=>{
      authService = {isLoggedIn: ()=> true};
      router = new MockRouter();
      authGuard = new AuthGuard(authService, router);
      expect(authGuard.canActivate()).toEqual(true);
    });
    it('should navigate to home for a logged out user', ()=>{
      authService = {isLoggedIn: ()=> false};
      router = new MockRouter();
      authGuard = new AuthGuard(authService, router);
      spyOn(router,'navigate');
      expect(authGuard.canActivate()).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(["/"]);
    })
  });
});
