import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../services/comments/comment";
import {CommentsService} from "../services/comments/comments.service";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Input() eventId: string;
  comments: Array<Comment>;
  noComments: string;
  userComment: string;
  submitError: string;

  constructor(private commentsService: CommentsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log('eventId', this.eventId);
    this.fetchComments();
  }

  fetchComments() {
    this.commentsService.getEventComments(this.eventId).subscribe(res => {
      if (res) {
        this.comments = res;
        this.noComments = '';
      } else {
        this.noComments = 'No comments exist for this event.';
      }
    })
  }

  addComment(userComment: string) {
    const user = this.authService.currentUser;
    const payload: Comment = {
      _event: this.eventId,
      _creator: user._id,
      content: userComment
    };

    this.commentsService.create(payload).subscribe(res => {
        this.submitError = '';
        this.userComment = '';
        this.fetchComments();
      },
      error => {
        this.submitError = error.error.message;
      })
  }
}
