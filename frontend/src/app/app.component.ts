import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRtl: boolean = true;
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ar');
    this.setLanguageDirection('ar');
    this.translate.onLangChange.subscribe((event) => {
      this.setLanguageDirection(event.lang);
    });
  }

  setLanguageDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    console.log(dir)
    document.documentElement.setAttribute('dir', dir);
  }
  
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  
}