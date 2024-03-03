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
      this.setLanguageDirection(this.currentLanguage);
    // translate.setDefaultLang('ar');
    // this.setLanguageDirection('ar');
    this.translate.onLangChange.subscribe((event) => {
      this.setLanguageDirection(event.lang);
      this.switchLanguage(event.lang)
    });
    }

  // ngOnInit(): void {
  //   // this.translate.setDefaultLang('ar');
  //   this.translate.use('ar')
  //   // this.setLanguageDirection('ar')
  // }

  setLanguageDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }
  
  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}