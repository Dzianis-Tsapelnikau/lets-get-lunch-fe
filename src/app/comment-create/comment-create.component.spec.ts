import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentCreateComponent} from './comment-create.component';
import {of, throwError} from "rxjs";
import {CommentCreateModule} from "./comment-create.module";
import {CommentsService} from "../services/comments/comments.service";
import {By} from "@angular/platform-browser";
import {Comment} from "../services/comments/comment";
import {AuthService} from "../services/auth/auth.service";

const eventId = '5a55135639fbc4ca3ee0ce5a';
const currentUser = {
  'username': 'myUser',
  '_id': '5a550ea739fbc4ca3ee0ce58'
}
const comments: Array<Comment> = [
  {
    '_id': '5a551b1039fbc4ca3ee0ce5b',
    'content': 'My first comment',
    'createdAt': '2018-01-09T19:42:08.048Z',
    '_event': '5a55135639fbc4ca3ee0ce5a',
    '_creator': {
      '_id': '5a550ea739fbc4ca3ee0ce58',
      'username': 'newUser',
      '__v': 0,
      'dietPreferences': []
    },
    '__v': 0
  }
];

class MockCommentService {
  getEventComments = jasmine.createSpy('getEventComments').and.returnValues(of(null), of(comments));

  create(comment) {
  }
}

class MockAuthService {
  get currentUser() {
    return currentUser;
  }
}

describe('CommentCreateComponent', () => {
  let component: CommentCreateComponent;
  let fixture: ComponentFixture<CommentCreateComponent>;
  let commentService: CommentsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommentCreateModule]
    })
      .overrideComponent(CommentCreateComponent, {
        set: {
          providers: [
            {provide: CommentsService, useClass: MockCommentService},
            {provide: AuthService, useClass: MockAuthService}
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCreateComponent);
    component = fixture.componentInstance;
    component.eventId = eventId;
    commentService = fixture.debugElement.injector.get(CommentsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input eventId set', () => {
    expect(component.eventId).toEqual(eventId);
  });

  it('should display an error message if no comments exist for the event', () => {
    expect(commentService.getEventComments).toHaveBeenCalledWith(eventId);
    expect(component.comments).toBeUndefined();
    const noComments = fixture.debugElement.query(By.css('[data-test=noComments]')).nativeElement;
    expect(noComments.textContent).toEqual('No comments exist for this event.');
  });

  it('should update the list of comments when a user submit a comment', () => {
    spyOn(commentService, 'create').and.callFake(() => {
      return of({
        '__v': 0,
        'content': 'My first comment',
        'createdAt': '2018-01-09T19:42:08.048Z',
        '_event': '5a55135639fbc4ca3ee0ce5a',
        '_creator': '5a550ea739fbc4ca3ee0ce58',
        '_id': '5a551b1039fbc4ca3ee0ce5b'
      });
    });
    fixture.debugElement.query(By.css('textarea')).nativeElement.value = 'My first comment';
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement.click();
    fixture.detectChanges();

    expect(commentService.create).toHaveBeenCalled();
    expect(commentService.getEventComments).toHaveBeenCalledTimes(2);
    expect(component.comments.length).toEqual(1);
    const commentList = fixture.debugElement.queryAll(By.css('[data-test=comment]'));
    expect(commentList[0].nativeElement.textContent).toContain('My first comment');
  });
  it('should show an error message if the event cannot be created', () => {
    spyOn(commentService, 'create').and.callFake(() => {
      return throwError({error: {message: 'Comment could not be created'}});
    });

    fixture.debugElement.query(By.css('textarea')).nativeElement.value = 'Error';
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    expect(commentService.create).toHaveBeenCalled();
    expect(commentService.getEventComments).toHaveBeenCalledTimes(1);
    const submitError = fixture.debugElement.query(By.css('[data-test=submit-error]')).nativeElement.textContent;
    expect(submitError).toEqual('Comment could not be created');

  });
});
