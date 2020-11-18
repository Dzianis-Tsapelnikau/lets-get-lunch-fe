import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventsService} from "../../services/events/events.service";
import {AuthService} from "../../services/auth/auth.service";
import {IEvent} from "../../services/events/IEvent";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  eventForm!: FormGroup;
  error!: string;
  success!: string;

  constructor(private _formBuilder: FormBuilder, private _eventsService: EventsService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.eventForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      suggestLocations: [false, Validators.required],
    });
  }

  onSubmit() {
    this.error = '';
    this.success = '';

    const user = this._authService.currentUser$;
    const event: IEvent = {
      _creator: user.getValue()!.id,
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      startTime: this.eventForm.value.startTime,
      endTime: this.eventForm.value.endTime,
      location: this.eventForm.value.location,
      suggestLocations: this.eventForm.value.suggestLocations
    };
    this._eventsService.create(event).subscribe(() => {
      this.success = 'Your event has been created.';
    }, error => {
      this.error = error.error.message;
    })
  }
}
