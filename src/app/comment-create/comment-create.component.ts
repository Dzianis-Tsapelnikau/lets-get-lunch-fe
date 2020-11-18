import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../services/comments/IComment';
import { CommentsService } from '../services/comments/comments.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Input() eventId!: string;

  private _comments!: Array<IComment>;
  public get comments(): Array<IComment> {
    return this._comments;
  }

  public set comments(value: Array<IComment>) {
    this._comments = value;
  }

  private _noComments!: string;
  public get noComments(): string {
    return this._noComments;
  }

  public set noComments(value: string) {
    this._noComments = value;
  }

  private _userComment!: string;
  public get userComment(): string {
    return this._userComment;
  }

  public set userComment(value: string) {
    this._userComment = value;
  }

  private _submitError!: string;
  public get submitError(): string {
    return this._submitError;
  }

  public set submitError(value: string) {
    this._submitError = value;
  }

  constructor(private commentsService: CommentsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log('eventId', this.eventId);
    this.fetchComments();
  }

  fetchComments() {
    this.commentsService.getEventComments(this.eventId).subscribe(res => {
      if (res) {
        this._comments = res;
        this._noComments = '';
      } else {
        this._noComments = 'No comments exist for this event.';
      }
    });
  }

  addComment(userComment: string) {
    const user = this.authService.currentUser$;
    const payload: IComment = {
      _event: this.eventId,
      _creator: user.getValue()!.id,
      content: userComment
    };

    this.commentsService.create(payload).subscribe(() => {
        this._submitError = '';
        this._userComment = '';
        this.fetchComments();
      },
      error => {
        this._submitError = error.error.message;
      });
  }
}
