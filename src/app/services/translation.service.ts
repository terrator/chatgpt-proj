import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) { }

  init() {
    this.translate.setDefaultLang('en'); // Set the default language
    this.translate.use('en'); // Use the default language
    this.translate.addLangs(['en', 'fr', 'es']);

    // Optional: You can add additional languages and switch between them dynamically
    // this.translate.addLangs(['en', 'fr']);
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
  
  translateKey(key: string): string {
    let translation = '';
    this.translate.get(key).subscribe((value: string) => {
      translation = value;
    });
    return translation;
  }
}
