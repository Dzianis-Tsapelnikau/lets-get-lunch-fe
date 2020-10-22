import {Injectable} from '@angular/core';
import {Event} from "./event";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {format} from 'date-fns';
import {map} from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private httpClient: HttpClient) {
  }

  create(event: Event): Observable<Event> {
    return this.httpClient.post<Event>('http://localhost:8080/api/events', event);
  }

  getUserEvents(userId: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>('http://localhost:8080/api/events/user/' + userId);
  }

  get(eventId: string): Observable<Event> {
    return this.httpClient.get<Event>('http://localhost:8080/api/events/' + eventId).pipe(map((res: Event) => this.formatDateTime(res)));
  }

  formatDateTime(event: Event): Event {
    event.displayStart = format(event.startTime, 'dddd MMM, Do - h:mm A');
    event.displayEnd = format(event.endTime, 'dddd MMM, Do - h:mm A');
    return event;
  }

  all(): Observable<Array<Event>> {
    return this.httpClient.get<Array<Event>>('http://localhost:8080/api/events');
  }
}
