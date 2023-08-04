import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../services/chat-api.service';
import { Message } from '../models/types';
import { TranslationService } from '../services/translation.service';
import { AwsTranslateService } from '../services/aws-translate.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  userMessage: string = '';
  emptyMessage: boolean = false;
  showLoading: boolean = false;
  showMsgs: boolean = false;

  constructor(
    private chatApiService: ChatApiService,
    private translationService: TranslationService,
    private translator: AwsTranslateService
  ) {
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
        this.userMessage = '';
      }, 5000);
      return;
    } else this.emptyMessage = false;

    const originalLang = this.translationService.getLanguage();

    (async () => {
      this.showLoading = true;
      translatedMsg =
        originalLang == 'en'
          ? originalMsg
          : await this.translator.translate(originalMsg, originalLang, 'en');
      // need to add the translated message to the messages
      this.messages.push({
        role: 'user',
        content: translatedMsg,
      });

      // need to send all message to api
      this.chatApiService.sendUserMessage(this.messages).subscribe({
        next: (response) => {
          console.log('response', response)
          const chatResponse = response.choices[0].message.content.trim();
          (async () => {
            let translatedTxt =
              originalLang == 'en'
                ? chatResponse
                : await this.translator.translate(
                    chatResponse,
                    'en',
                    originalLang
                  );
            this.messages.push({
              role: 'assistant',
              content: translatedTxt,
            });
          })();
        },
        error: (error) => console.error('Error sending user message:', error),
        complete: () => {
          this.userMessage = '';
          this.showLoading = false;
          this.showMsgs = true;
          console.log('messages: ', this.messages);
        },
      });
    })();
  }

  translateMsgs(srcLang: string, targetLang: string) {
    if (srcLang == targetLang || this.messages.length == 0) return;

    (async () => {
      this.showMsgs = false;
      this.showLoading = true;
      for (const msg of this.messages) {
        const content = await this.translator.translate(
          msg.content!,
          srcLang,
          targetLang
        );

        msg.content = content;
      }
      this.showLoading = false;
      this.showMsgs = true;
    })();
  }

  reset() {
    this.messages = []
  }

  ngOnInit(): void {}
}
