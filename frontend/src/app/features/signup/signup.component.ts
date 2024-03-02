import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  // styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthenticationService) { }

  onSignup(): void {
    this.authService.signup(this.user)
      .subscribe({
        next: (response) => console.log('Signup successful', response),
        error: (error) => console.error('Signup failed', error)
      });
  }
}