import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventListComponent} from './event-list.component';
import {Event} from "../services/events/event";
import {EventListModule} from "./event-list.module";
import {RouterTestingModule} from "@angular/router/testing";
import {EventsService} from "../services/events/events.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

const events: Array<Event> = [{
  '_id': '5a539459b689d341cccc4be8',
  '_creator': '5a539449b689d341cccc4be7',
  'title': 'Another event',
  'description': 'Another event description',
  'location': 'Atlanta',
  'startTime': '2018-01-08T05:00:00.000Z',
  'endTime': '2018-01-09T05:00:00.000Z',
  '__v': 0,
  'suggestLocations': false,
  'members': [
    '5a539449b689d341cccc4be7'
  ]
}];

class MockEventsService {
  all() {
  }
}

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let eventsService: EventsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EventListModule, RouterTestingModule]
    })
      .overrideComponent(EventListComponent, {
        set: {
          providers: [
            {provide: EventsService, useClass: MockEventsService}
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    eventsService = fixture.debugElement.injector.get(EventsService);
    spyOn(eventsService, 'all').and.returnValue(of(events));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with no existing events', () => {
    beforeEach(() => {
      spyOn(eventsService, 'all').and.returnValue(of([]));
      fixture.detectChanges();
    });

    it('should initialize with a call to get all events', () => {
      expect(eventsService.all).toHaveBeenCalledTimes(1);
    });
    it('should display an error message', () => {
      const noEvents = fixture.debugElement.query(By.css('.no-events'));
      expect(noEvents.nativeElement.textContent).toContain('There are no events.')
    });
  });

  describe('with existing events', () => {
    beforeEach(() => {
      spyOn(eventsService, 'all').and.returnValue(of(events));
      fixture.detectChanges();
    });
    it('should initialize with a call to get all events', () => {
      expect(eventsService.all).toHaveBeenCalled();
    });
    it('should populate a table with events', () => {
      const rows = fixture.debugElement.queryAll(By.css('.event-title'));
      expect(rows[0].nativeElement.getAttribute('cref')).toEqual('/event/5a539459b689d341cccc4be8');
    });
  })
});
