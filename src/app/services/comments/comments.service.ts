import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "./comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) {
  }

  create(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>('http://localhost:8080/api/comments', comment);
  }

  getEventComments(eventId: string): Observable<Array<Comment>> {
    return this.httpClient.get<Array<Comment>>(`http://localhost:8080/api/comments/event/${eventId}`);
  }
}
