import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class BaseComponent {
  isRtl: boolean = true;
  protected translate: TranslateService;
  currentLanguage : any;
  constructor(injector: Injector) {
    this.translate = injector.get(TranslateService);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar')
    this.setLanguageDirection('ar');
    this.currentLanguage = this.translate.currentLang;
    // console.log("t" +this.translate.currentLang)

    this.isRtl = this.isLanguageRTL(this.currentLanguage);
    
    this.translate.onLangChange.subscribe((event) => {
      
      this.switchLanguage(this.translate.currentLang)
      this.isRtl = this.isLanguageRTL(this.currentLanguage)
      this.setLanguageDirection(event.lang);
      // console.log(this.isRtl)
    });
  }

  setLanguageDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }

  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
  }

  private isLanguageRTL(language: string): boolean {
    const rtlLanguages = ['ar', 'he', 'fa']; // Add more RTL languages as needed
    // console.log("in is Lang" + rtlLanguages.includes(language))
    return rtlLanguages.includes(language);
  }
}
