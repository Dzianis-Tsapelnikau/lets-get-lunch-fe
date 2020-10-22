import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events/events.service";
import {Event} from "../services/events/event";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<Event>;
  errorMessage: string;

  constructor(private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.eventsService.all().subscribe(value => {
      this.events = value;
    }, error => {
      this.errorMessage = error.error.message;
    })
  }
}
