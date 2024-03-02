import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class BaseComponent {
  isRtl: boolean = true;
  protected translate: TranslateService
  constructor(injector: Injector) {
    this.translate = injector.get(TranslateService);
    const selectedLanguage = this.translate.currentLang;
    this.isRtl = this.isLanguageRTL(selectedLanguage);
  }

  private isLanguageRTL(language: string): boolean {
    const rtlLanguages = ['ar', 'he', 'fa']; // Add more RTL languages as needed
    return rtlLanguages.includes(language);
  }
}
