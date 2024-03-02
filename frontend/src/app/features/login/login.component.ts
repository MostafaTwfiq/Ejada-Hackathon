import { Component, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent{
  model: any = {};
  error: string | null = null;

  constructor(
    injector: Injector,
    private authService: AuthenticationService,
    private router: Router
  ) { super(injector); }

  onLogin(): void {
    this.authService.login(this.model.username, this.model.password).subscribe({
      next: () => {
        this.translate.get('login.success').subscribe((message: string) => alert(message));
        this.router.navigate(['/hackathons']); // Adjust as needed

      },
      error: (error: HttpErrorResponse) => {
        this.translate.get('login.failure', { error: error.message }).subscribe((message: string) => alert(message));
      }
    });
  }
}