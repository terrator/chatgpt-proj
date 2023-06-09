import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../services/chat-api.service';
import { Message } from '../models/types';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = []
  userMessage: string ='';
  emptyMessage: boolean = false;

  constructor(private chatApiService: ChatApiService, private translationService: TranslationService) {
    this.translationService.init();
   }

  sendMessage() {
    if (this.userMessage.trim().length == 0) { 
      this.emptyMessage = true;
      setTimeout(() => {
        this.emptyMessage = false;
      }, 5000)
      return;
    } else this.emptyMessage = false;

    // Send user message to ChatGPT
    this.chatApiService.sendUserMessage(this.userMessage).subscribe({
      next: (response) => {
          const chatResponse = response.choices[0].text.trim();          
          this.messages.push({ 
                      prompt: this.userMessage,
                      answer: chatResponse
                    });
        }, 
      error: (error) => console.error('Error sending user message:', error),
      complete: () => this.userMessage = ''
    });  
  };

  ngOnInit(): void {
  };
}
