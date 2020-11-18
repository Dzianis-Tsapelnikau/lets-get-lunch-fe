import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IComment} from "./IComment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) {
  }

  create(comment: IComment): Observable<IComment> {
    return this.httpClient.post<IComment>('http://localhost:8080/api/comments', comment);
  }

  getEventComments(eventId: string): Observable<Array<IComment>> {
    return this.httpClient.get<Array<IComment>>(`http://localhost:8080/api/comments/event/${eventId}`);
  }
}
