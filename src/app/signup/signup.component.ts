import {Component, OnInit} from '@angular/core';
import {User} from "../services/auth/user";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = {username: '', password: ''};
  errorMessage: string;
  dietPreferences = [
    {name: 'BBQ', checked: false},
    {name: 'Burger', checked: false},
    {name: 'Chinese', checked: false},
    {name: 'Deli', checked: false},
    {name: 'Fast Food', checked: false},
    {name: 'Italian', checked: false},
    {name: 'Japanese', checked: false},
    {name: 'Mexican', checked: false},
    {name: 'Pizza', checked: false}
  ];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  signup(credentials: User) {
    credentials.dietPreferences = this.getSelectedPreferences();
    this.authService.signup(credentials).subscribe(res => {
      console.log('res: ', res);
    }, error => this.errorMessage = error.error.message);
  }

  onPrefCheck(index: number) {
    this.dietPreferences[index].checked = !this.dietPreferences[index].checked;
  }

  private getSelectedPreferences() {
    return this.dietPreferences.filter((p) => {
      if (p.checked) {
        return p;
      }
    }).map(p=>p.name);
  }
}
