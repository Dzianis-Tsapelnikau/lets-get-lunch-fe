import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Event} from "../services/events/event";
import {DashboardComponent} from './dashboard.component';
import {of} from "rxjs";
import {DashboardModule} from "./dashboard.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../services/auth/auth.service";
import {Mock} from "protractor/built/driverProviders";
import {EventsService} from "../services/events/events.service";
import {extendObject} from "ng-pick-datetime/utils";
import {User} from "../services/auth/user";

const currentUser = {
  'username': 'myUser',
  '_id': '5a550ea739fbc4ca3ee0ce58'
};
const events: Array<Event> = [{
  '_id': '5a55135639fbc4ca3ee0ce5a',
  '_creator': '5a550ea739fbc4ca3ee0ce58',
  'title': 'My first event',
  'description': 'My first description',
  'city': 'Atlanta',
  'state': 'GA',
  'startTime': new Date().toISOString(),
  'endTime': new Date().toISOString(),
  '__v': 0,
  'suggestLocations': true,
  'members': [
    '5a550ea739fbc4ca3ee0ce58'
  ]
}];

class MockAuthService {
  get currentUser() { return currentUser; }
}


class MockEventsService {
  getUserEvents = jasmine.createSpy('getUserEvents').and.callFake(() => of(events));
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let eventService: EventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        RouterTestingModule.withRoutes([
          {path: 'event', redirectTo: '/event'}
        ])],
      declarations: [DashboardComponent]
    }).overrideComponent(DashboardComponent, {
      set: {
        providers: [
          {provide: AuthService, useClass: MockAuthService},
          {provide: EventsService, useClass: MockEventsService}
        ]
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    eventService = fixture.debugElement.injector.get(EventsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with a call to get the current user\'s events', () => {
    spyOnProperty(authService,'currentUser','get').and.returnValue(currentUser);
    expect(authService.currentUser).toHaveBeenCalled();
    expect(eventService.getUserEvents).toHaveBeenCalledWith(currentUser._id);
    expect(component.events.length).toEqual(1);
  })
});
