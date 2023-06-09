import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatgtp-proj';

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.init();
  }

  onLanguageChange(lang: string) {
    this.translationService.setLanguage(lang);
  }
    
}
