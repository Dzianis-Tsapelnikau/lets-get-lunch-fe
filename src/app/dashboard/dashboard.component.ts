import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { AuthService } from '../services/auth/auth.service';
import { IEvent } from '../services/events/IEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events!: Array<IEvent>;
  view = 'week';
  viewDate: Date = new Date();
  error!: string;
  noEvents!: string;

  constructor(private authService: AuthService, private eventsService: EventsService, private router: Router) {
  }

  ngOnInit(): void {
    const userId = this.authService.currentUser$.getValue()!.id;
    this.eventsService.getUserEvents(userId).subscribe(res => {
      console.log('events for user', res);
      if (res) {
        this.events = this.mapEvents(res);
      } else {
        this.noEvents = 'You are not a member of any events.';
      }
    }, error1 => {
      this.error = error1.error.message;
    });
  }

  mapEvents(events: Array<IEvent>): Array<IEvent> {
    return this.addEventColors(this.addJSDate(events));
  }

  eventClicked(event: IEvent) {
    this.router.navigate(['/event/' + event._id]);
  }

  addJSDate(events: Array<IEvent>) {
    return events.map((event) => {
      event.start = new Date(event.startTime);
      event.end = new Date(event.endTime);
      return event;
    });
  }

  addEventColors(events: Array<IEvent>) {
    return events.map((event) => {
      event.color = {primary: '#1E90FF', secondary: '#D1E8FF'};
      return event;
    });
  }
}
