import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IEvent} from "../services/events/IEvent";
import {DashboardComponent} from './dashboard.component';
import {of} from "rxjs";
import {DashboardModule} from "./dashboard.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../services/auth/auth.service";
import {EventsService} from "../services/events/events.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Route, Router} from "@angular/router";

const currentUser = {
  'username': 'myUser',
  '_id': '5a550ea739fbc4ca3ee0ce58'
};
const events: Array<IEvent> = [{
  '_id': '5a55135639fbc4ca3ee0ce5a',
  '_creator': '5a550ea739fbc4ca3ee0ce58',
  'title': 'My first event',
  'description': 'My first description',
  'location': 'Atlanta',
  'startTime': new Date().toISOString(),
  'endTime': new Date().toISOString(),
  '__v': 0,
  'suggestLocations': true,
  'members': [
    '5a550ea739fbc4ca3ee0ce58'
  ]
}];

class MockRouter {
  navigate(path) {
  }
}

class MockAuthService {
  get currentUser() {
    return currentUser;
  }
}

class MockEventsService {
  getUserEvents = jasmine.createSpy('getUserEvents').and.callFake(() => of(events));
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let eventService: EventsService;
  let viewDateElement: DebugElement[];
  let calendarEventElement: DebugElement[];
  let eventLink: DebugElement[];
  let router: Router;

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
          {provide: EventsService, useClass: MockEventsService},
          {provide: Router, useClass: MockRouter}
        ]
      }
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    eventService = fixture.debugElement.injector.get(EventsService);
    router = fixture.debugElement.injector.get(Router);
    spyOn(component, "addEventColors").and.callThrough();
    spyOn(component, "addJSDate").and.callThrough();
    spyOnProperty(authService, 'currentUser$', 'get').and.callThrough();
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      viewDateElement = fixture.debugElement.queryAll(By.css('.toggle-view .btn-primary'));
      calendarEventElement = fixture.debugElement.queryAll(By.css('.cal-event'));
      eventLink = fixture.debugElement.queryAll(By.css('.cal-event-title'));
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with a call to get the current user\'s events', () => {
    expect(eventService.getUserEvents).toHaveBeenCalledWith(currentUser._id);
    expect(component.addJSDate).toHaveBeenCalled();
    expect(component.addEventColors).toHaveBeenCalled();
    expect(component.events.length).toEqual(1);
  });

  it('should initialize the calendar to a week view', () => {
    expect(viewDateElement[0].classes.active).toBeUndefined();
    expect(viewDateElement[1].classes.active).toEqual(true);
    expect(viewDateElement[2].classes.active).toBeUndefined();
  });
  it('should display events within the current week in the calendar', () => {
    expect(calendarEventElement[0].nativeElement.textContent).toContain('My first event')
  });
  it('should navigate to the event view when an event is clicked', () => {
    spyOn(router, 'navigate');
    eventLink[0].nativeElement.click();
    expect(router.navigate).toHaveBeenCalledWith(['/event/' + events[0]._id]);
  })
  describe('addJSDate', () => {
    it('should add a "start" and "end" property to an event', () => {
      const result = component.addJSDate(events);
      expect(result[0].start).toEqual(jasmine.any(Date));
      expect(result[0].end).toEqual(jasmine.any(Date));
    });
  });
  describe('addEventsColor', () => {
    it('should add a color property to an event', () => {
      const result = component.addEventColors(events);
      expect(result[0].color).toBeDefined();
    });
  });
});
