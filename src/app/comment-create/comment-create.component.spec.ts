import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AUTH_SERVICE_PROVIDER } from '../services/auth/authService.stub';
import { Comment } from '../services/comments/comment';
import { CommentsService } from '../services/comments/comments.service';
import { COMMENTS_SERVICE_PROVIDER, CommentsServiceStub } from '../services/comments/comments.service.stub';

import { CommentCreateComponent } from './comment-create.component';
import { of, throwError } from 'rxjs';
import { CommentCreateModule } from './comment-create.module';
import { By } from '@angular/platform-browser';
// import {Comment} from "../services/comments/comment";

const eventId = '5a55135639fbc4ca3ee0ce5a';
// const currentUser = {
//   'username': 'myUser',
//   '_id': '5a550ea739fbc4ca3ee0ce58'
// };
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

describe('CommentCreateComponent', () => {
  let component: CommentCreateComponent;
  let fixture: ComponentFixture<CommentCreateComponent>;
  let commentService: CommentsServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommentCreateModule]
    })
      .overrideComponent(CommentCreateComponent, {
        set: {
          providers: [
            COMMENTS_SERVICE_PROVIDER(),
            AUTH_SERVICE_PROVIDER()
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCreateComponent);
    component = fixture.componentInstance;
    component.eventId = eventId;
    commentService = fixture.debugElement.injector.get(CommentsService) as never as CommentsServiceStub;
    commentService.getEventCommentsSpy.and.returnValues(of(null), of(comments));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input eventId set', () => {
    expect(component.eventId).toEqual(eventId);
  });

  it('should display an error message if no comments exist for the event', () => {
    commentService.getEventCommentsSpy.and.returnValue(of([]));
    expect(commentService.getEventCommentsSpy).toHaveBeenCalledWith(eventId);
    expect(component.comments).toBeUndefined();
    const noComments = fixture.debugElement.query(By.css('[data-test=noComments]')).nativeElement;
    expect(noComments.textContent).toEqual('No comments exist for this event.');
  });

  it('should update the list of comments when a user submit a comment', () => {
    commentService.createSpy.and.callFake(() => {
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
    fixture.debugElement.query(By.css('button[type=submit]')).nativeElement.click();
    fixture.detectChanges();

    expect(commentService.createSpy).toHaveBeenCalled();
    expect(commentService.getEventCommentsSpy).toHaveBeenCalledTimes(2);
    expect(component.comments.length).toEqual(1);
    const commentList = fixture.debugElement.queryAll(By.css('[data-test=comment]'));
    expect(commentList[0].nativeElement.textContent).toContain('My first comment');
  });
  it('should show an error message if the event cannot be created', () => {
    commentService.getEventCommentsSpy.and.returnValue(of(comments));
    commentService.createSpy.and.callFake(() => {
      return throwError({error: {message: 'Comment could not be created'}});
    });

    fixture.debugElement.query(By.css('textarea')).nativeElement.value = 'Error';
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    expect(commentService.createSpy).toHaveBeenCalled();
    expect(commentService.getEventCommentsSpy).toHaveBeenCalledTimes(1);
    const submitError = fixture.debugElement.query(By.css('[data-test=submit-error]')).nativeElement.textContent;
    expect(submitError).toEqual('Comment could not be created');
  });
});
