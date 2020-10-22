import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EventViewComponent} from "../event/event-view/event-view.component";
import {AuthGuard} from "../guards/auth/auth.guard";


const routes: Routes = [
  {path: '', component: EventViewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventListRoutingModule {
}
