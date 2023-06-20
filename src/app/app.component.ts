import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { languages } from './models/languages';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatgtp-proj';
  currentLang: string = 'en'
  selectedLang: string = 'en'
  languages$ = of(languages)

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.init();
  }

  onLanguageChange(lang: string) {
    this.translationService.setLanguage(lang);
    this.currentLang = lang;
  }
}
