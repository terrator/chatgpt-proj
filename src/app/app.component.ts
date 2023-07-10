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
  languages = languages

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.init();
  }

  onLanguageChange(lang: any) {
    this.translationService.setLanguage(lang);
    this.selectedLang = lang
    this.currentLang = lang;
  }
}
