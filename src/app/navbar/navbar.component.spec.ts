import { ComponentFixture, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { ROUTER_PROVIDER } from '../login/routerStub';
import { AUTH_SERVICE_PROVIDER, AUTH_SERVICE_STUB, AuthServiceStub } from '../services/auth/authService.stub';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthServiceStub;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        AUTH_SERVICE_PROVIDER(),
        ROUTER_PROVIDER()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = AUTH_SERVICE_STUB();
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with a user who is logged in', () => {
    beforeEach(() => {
      authService.loggedInSpy.and.returnValue(true);
      fixture.detectChanges();
    });

    it('should initialize to see if a user is logged in', () => {
      expect(authService.loggedInSpy).toHaveBeenCalled();
      component.isLoggedIn$.toPromise().then(value => {
        expect(value).toBe(true);
      });
    });

    it('should have a link to the dashboard when clicking the brand name', () => {
      const link = fixture.debugElement.query(By.css('.navbar-brand'));
      expect(link.attributes.routerLink).toEqual('/dashboard');
    });
    it('should have link to the event list', () => {
      const link = fixture.debugElement.query(By.css('[data-test=events]'));
      expect(link.attributes.routerLink).toEqual('/events');
    });
    it('should have a link to logout visible', () => {
      const link = fixture.debugElement.query(By.css('[data-test=logout]'));
      expect(link.nativeElement.innerText).toEqual('Logout');
    });
    it('should navigate to the home page when logout is clicked', () => {
      spyOn(router, 'navigate');
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('with a user who is not logged in', () => {
    beforeEach(() => {
      authService.loggedInSpy.and.returnValue(false);
      fixture.detectChanges();
    });
    it('should initialize to se if a user is logged in', () => {
      expect(authService.loggedInSpy).toHaveBeenCalled();
      component.isLoggedIn$.toPromise().then(value => {
        expect(value).toBe(false);
      })
    });
    it('should have a link to the homepage when clicking the brand name', () => {
      const link = fixture.debugElement.query(By.css('.navbar-brand'));
      expect(link.attributes.routerLink).toEqual('');
    });
    it('should have a link to signup visible', () => {
      const link = fixture.debugElement.query(By.css('[data-test=signup]'));
      expect(link.attributes.routerLink).toEqual('/signup');
    });
    it('should have a link to login visible', () => {
      const link = fixture.debugElement.query(By.css('[data-test=login]'));
      expect(link.attributes.routerLink).toEqual('/login');
    });
  });
});
