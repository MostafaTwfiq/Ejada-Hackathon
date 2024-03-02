import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Pick<User, 'username' | 'password'> = { username: '', password: '' }; // Using Pick to exclude 'email'

  constructor(private authService: AuthenticationService,  private router: Router)  { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/']); // Adjust as needed, e.g., to a dashboard route
    }
  }
  onLogin(): void {
    this.authService.login(this.model.username, this.model.password)
      .subscribe({
        next: (response: any) => console.log('Logged in successfully', response),
        error: (error: any) => console.error('Login failed', error)
      });
  }
}