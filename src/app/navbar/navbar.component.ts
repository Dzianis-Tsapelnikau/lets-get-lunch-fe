import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private readonly _isLoggedIn$ : Observable<boolean>;
  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$;
  };

  constructor(private authService: AuthService, private router: Router) {
    this._isLoggedIn$ =  this.authService.loggedIn$;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
