import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(private authService: AuthenticationService,
    private router: Router,
    private translate: TranslateService) { }

  onSignup(): void {
    this.authService.signup(this.user).subscribe({
      next: (response: any) => {
        this.translate.get('signup.success').subscribe((translatedSuccessMessage: string) => {
          alert(translatedSuccessMessage); // Display success message
        });
        // Optionally, navigate to a different page after showing the message
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        // Assuming the error object has a message property
        // Adjust 'signup.error' to the key you wish to use for generic signup errors
        this.translate.get('signup.error', { error: error.message }).subscribe((translatedErrorMessage: string) => {
          alert(translatedErrorMessage);
        });
      }
    });
  }
}