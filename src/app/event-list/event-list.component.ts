import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events/events.service";
import {IEvent} from "../services/events/IEvent";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events!: Array<IEvent>;
  errorMessage!: string;

  constructor(private readonly _eventsService: EventsService) {
  }

  ngOnInit(): void {
    this._eventsService.all().subscribe(value => {
      this.events = value;
    }, error => {
      this.errorMessage = error.error.message;
    })
  }
}
