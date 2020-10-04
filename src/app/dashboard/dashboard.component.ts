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

  constructor(private authService: AuthService, private eventsService: EventsService) {
  }

  ngOnInit(): void {
    const id = this.authService.currentUser._id;
    this.eventsService.getUserEvents(id).subscribe(res => {
      if (res) {
        this.events = res;
      }
    });
  }

}
