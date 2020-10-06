import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events/events.service";
import {AuthService} from "../services/auth/auth.service";
import {Event} from "../services/events/event";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: Array<Event>
  view = 'week';
  viewDate: Date = new Date();
  error: string;
  noEvents: string;

  constructor(private authService: AuthService, private eventsService: EventsService) {
    const userId = authService.currentUser.id;
    this.eventsService.getUserEvents(userId).subscribe(res => {
      console.log('events for user', res);
      if (res) {
        this.events = this.addEventColors(this.addJSDate(res));
      } else {
        this.noEvents = 'You are not a member of any events.'
      }
    }, error1 => {
      this.error = error1.error.message;
    })
  }

  ngOnInit(): void {
    const id = this.authService.currentUser._id;
    this.eventsService.getUserEvents(id).subscribe(res => {
      if (res) {
        this.events = res;
      }
    });
  }

  eventClicked(event: Event) {

  }

  addJSDate(events: Array<Event>) {
    return events.map((event) => {
      event.start = new Date(event.startTime);
      event.end = new Date(event.endTime);
      return event;
    });
  }

  addEventColors(events: Array<Event>) {
    return events.map((event) => {
      event.color = { primary: '#1E90FF', secondary: '#D1E8FF' };
      return event;
    });
  }
}
