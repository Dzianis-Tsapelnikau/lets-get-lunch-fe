import { Component, OnInit } from '@angular/core';
import { IUser } from '../services/auth/IUser';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { DietPreference } from './dietPreference';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  user: IUser = {username: '', password: ''};
  errorMessage: string = '';
  dietPreferences: Array<DietPreference> = [
    new DietPreference('BBQ', false),
    new DietPreference('Burger', false),
    new DietPreference('Chinese', false),
    new DietPreference('Deli', false),
    new DietPreference('Fast Food', false),
    new DietPreference('Italian', false),
    new DietPreference('Japanese', false),
    new DietPreference('Mexican', false),
    new DietPreference('Pizza', false)
  ];

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  signup(credentials: IUser) {
    credentials.dietPreferences = this.getSelectedPreferences();
    this._authService.signup(credentials).subscribe(res => {
      this._router.navigate(['/dashboard']);
      console.log('res: ', res);
    }, error => this.errorMessage = error.error.message);
  }

  onPrefCheck(index: number) {
    this.dietPreferences[index].checked = !this.dietPreferences[index].checked;
  }

  private getSelectedPreferences() {
    return this.dietPreferences.filter((p: DietPreference) => {
      if (p.checked) {
        return p;
      }
      return;
    }).map(p => p.name);
  }
}
