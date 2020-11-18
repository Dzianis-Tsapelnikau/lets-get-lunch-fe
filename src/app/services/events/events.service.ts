import {Injectable} from '@angular/core';
import { multicast, refCount, share, take } from 'rxjs/operators';
import {IEvent} from "./IEvent";
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

  create(event: IEvent): Observable<IEvent> {
    return this.httpClient.post<IEvent>('http://localhost:8080/api/events', event).pipe(share());
  }

  getUserEvents(userId: string): Observable<IEvent[]> {
    return this.httpClient.get<IEvent[]>('http://localhost:8080/api/events/user/' + userId).pipe(share());
  }

  get(eventId: string): Observable<IEvent> {
    return this.httpClient.get<IEvent>('http://localhost:8080/api/events/' + eventId).pipe(map((res: IEvent) => this.formatDateTime(res)), share());
  }

  formatDateTime(event: IEvent): IEvent {
    event.displayStart = format(event.startTime, 'dddd MMM, Do - h:mm A');
    event.displayEnd = format(event.endTime, 'dddd MMM, Do - h:mm A');
    return event;
  }

  all(): Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>('http://localhost:8080/api/events').pipe(share());
  }
}
