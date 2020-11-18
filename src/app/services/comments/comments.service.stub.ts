import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Comment } from './comment';
import { Observable } from 'rxjs';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentsServiceStub {
  public createSpy = jasmine.createSpy('create');

  public create(comment: Comment): Observable<Comment> {
    return this.createSpy(comment);
  }

  public getEventCommentsSpy = jasmine.createSpy('getEventComments');
  getEventComments(eventId: string): Observable<Array<Comment>> {
    return this.getEventCommentsSpy(eventId);
  }

  constructor() {
  }
}

export function COMMENTS_SERVICE_PROVIDER(): { provide: typeof CommentsService, useValue: CommentsServiceStub } {
  return {
    provide: CommentsService,
    useValue: new CommentsServiceStub()
  };
}

export function COMMENTS_SERVICE_STUB() {
  return TestBed.inject(CommentsService) as never as CommentsServiceStub;
}
