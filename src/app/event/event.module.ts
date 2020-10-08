import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventCreateComponent } from './event-create/event-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import { EventViewComponent } from './event-view/event-view.component';
import {CommentCreateModule} from "../comment-create/comment-create.module";


@NgModule({
  declarations: [EventCreateComponent, EventViewComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommentCreateModule
  ]
})
export class EventModule { }
