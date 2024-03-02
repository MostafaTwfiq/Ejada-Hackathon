import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
    selector: '[appRtl]'
})
export class RtlDirective implements OnInit {
    @Input() isRtl: boolean = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private translateService: TranslateService) { }

    ngOnInit(): void {
        const selectedLanguage = this.translateService.currentLang;
        const isLanguageRTL = this.isLanguageRTL(selectedLanguage);

        if ((this.isRtl && isLanguageRTL) || (!this.isRtl && !isLanguageRTL)) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'direction', 'rtl');
        } else {
            this.renderer.setStyle(this.elementRef.nativeElement, 'direction', 'ltr');
        }
    }

    private isLanguageRTL(language: string): boolean {
        const rtlLanguages = ['ar', 'he', 'fa']; // Add more RTL languages as needed
        return rtlLanguages.includes(language);
    }

}