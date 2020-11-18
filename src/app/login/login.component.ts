import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../services/auth/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _errorMessage!: string;
  get errorMessage(): string {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    this._errorMessage = value;
  }

  user: IUser = {username: '', password: ''};

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(credentials: IUser) {
    this.authService.login(credentials).subscribe(() => {
      this.router.navigate(['/dashboard']);
    }, error => {
      this._errorMessage = error.error.message;
    });
  }
}
