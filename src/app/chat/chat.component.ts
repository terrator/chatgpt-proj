import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../services/chat-api.service';
import { Message } from '../models/types';
import { TranslationService } from '../services/translation.service';
import { AwsTranslateService } from '../services/aws-translate.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = []
  userMessage: string ='';
  emptyMessage: boolean = false;
  showLoading: boolean = false;
  showMsgs: boolean = false;

  constructor(private chatApiService: ChatApiService, 
        private translationService: TranslationService,
        private translator: AwsTranslateService) {
    this.translationService.init();
    this.translator.init();
   }

  sendMessage() {
    let originalMsg = this.userMessage;
    let translatedMsg: string = '';

    if (originalMsg.trim().length == 0) { 
      this.emptyMessage = true;
      setTimeout(() => {
        this.emptyMessage = false;
      }, 5000)
      return;
    } else this.emptyMessage = false;

    const originalLang = this.translationService.getLanguage();

    (async () => {
      this.showLoading = true;
      translatedMsg = originalLang == 'en' ? originalMsg : await this.translator.translate(originalMsg, originalLang, 'en');
      this.chatApiService.sendUserMessage(translatedMsg).subscribe({
        next: (response) => {
            const chatResponse = response.choices[0].text.trim();
            (async () => {
              let translatedTxt = originalLang == 'en' ? chatResponse : await this.translator.translate(chatResponse, 'en', originalLang);
              this.messages.push({ 
                prompt: originalMsg,
                answer: translatedTxt
              });
            })();          
          }, 
        error: (error) => console.error('Error sending user message:', error),
        complete: () => { this.userMessage = ''; this.showLoading = false; this.showMsgs = true }
      });    
    })();
  };

  translateMsgs(srcLang: string, targetLang: string) {
    if ( srcLang == targetLang ) return;

    (async () => {
      this.showMsgs = false
      this.showLoading =true
      for (const msg of this.messages) {
        const prompt = await this.translator.translate(msg.prompt, srcLang, targetLang)
        const answer = await this.translator.translate(msg.answer!, srcLang, targetLang)
  
        msg.prompt = prompt;
        msg.answer = answer;
      }  
      this.showLoading = false
      this.showMsgs = true
    })();
  }

  ngOnInit(): void {
  };
}
