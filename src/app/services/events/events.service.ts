import {Injectable} from '@angular/core';
import {Event} from "./event";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
}
