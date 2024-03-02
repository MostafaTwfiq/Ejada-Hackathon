import { Component, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRtl: boolean = true;
  currentLanguage: string = 'ar';
  constructor(private translate: TranslateService, private elementRef: ElementRef, private renderer: Renderer2, 
    private authService: AuthenticationService,
    private router: Router) {
    translate.setDefaultLang('ar');
    this.setLanguageDirection('ar');
    this.translate.onLangChange.subscribe((event) => {
      console.log("here")
      this.setLanguageDirection(event.lang);
    });
    }

  setLanguageDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }
  
  switchLanguage(language: string) {
    console.log(language)
    this.currentLanguage = language;
    this.translate.use(language);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}