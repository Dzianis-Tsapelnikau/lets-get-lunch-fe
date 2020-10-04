import {TestBed} from '@angular/core/testing';

import {EventsService} from './events.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Event} from "./event";

describe('EventsService', () => {
  let service: EventsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService]
    });
    service = TestBed.inject(EventsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should return an event object with valid event details', () => {
      const event: Event = {
        '_creator': '5a550ea739fbc4ca3ee0ce58',
        'title': 'My first event',
        'description': 'My first description',
        'city': 'Atlanta',
        'state': 'GA',
        'startTime': '2018-01-09T19:00:00.000Z',
        'endTime': '2018-01-09T20:00:00.000Z',
        'suggestLocations': true,
      };
      const eventResponse: Event = {
        '__v': 0,
        '_creator': '5a550ea739fbc4ca3ee0ce58',
        'title': 'My first event',
        'description': 'My first description',
        'city': 'Atlanta',
        'state': 'GA',
        'startTime': '2018-01-09T19:00:00.000Z',
        'endTime': '2018-01-09T20:00:00.000Z',
        '_id': '5a55135639fbc4ca3ee0ce5a',
        'suggestLocations': true,
        'members': [
          '5a550ea739fbc4ca3ee0ce58'
        ]
      };
      let response;
      service.create(event).subscribe(res => {
        response = res;
      });

      http.expectOne('http://localhost:8080/api/events').flush(eventResponse);
      expect(response).toEqual(eventResponse);
      http.verify();
    });
    it('should return a 500 with invalid event details', () => {
      const event: Event = {
        '_creator': undefined,
        'title': undefined,
        'city': undefined,
        'state': undefined,
        'startTime': undefined,
        'endTime': undefined,
        'suggestLocations': undefined
      };
      const eventResponse = 'Event could not be created!';
      let errorResponse;
      service.create(event).subscribe(res => {
      }, err => {
        errorResponse = err
      });
      http
        .expectOne('http://localhost:8080/api/events')
        .flush({message: eventResponse}, {status: 500, statusText: 'Server error'});
      expect(errorResponse.error.message).toEqual(eventResponse);
      http.verify();
    });
  });

  const user = '5a55135639fbc4ca3ee0ce5a';
  const getUserEventsApiUrl = 'http://localhost:8080/api/events/user/';
  describe('getUserEvents', () => {
    it('should return events for a user who is a member of events', () => {
      const eventResponse = [{
        _id: user,
        _creator: user,
        title: 'My first event',
        description: 'My first description',
        city: 'Atlanta',
        state: 'GA',
        startTime: '2018-01-09-T19:00:00:000Z',
        endTime: '2018-01-09-T20:00:00:000Z',
        __v: 0,
        suggestLocations: true,
        members: {
          user
        }
      }];
      let response;

      service.getUserEvents(user).subscribe(res => {
        response = res
      });
      http.expectOne(getUserEventsApiUrl + user).flush(eventResponse);

      expect(response).toEqual(eventResponse);
      http.verify();
    });
    it('should return a 500 if an error occurs', () => {
      const eventError = 'Something went wrong';
      let errorResponse;
      service.getUserEvents(user).subscribe(res => {
      }, error => {
        errorResponse = error;
      });

      http.expectOne(getUserEventsApiUrl + user).flush({message: eventError}, {status: 500, statusText: 'Server Error'})
      http.verify();
    });
  });
});
