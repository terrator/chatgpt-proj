import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../chat-api.service';
import { Message } from '../models/types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = []
  userMessage!: string;

  constructor(private chatApiService: ChatApiService) { }

  sendMessage() {
    // this.messages.push(this.userMessage);

    // Send user message to ChatGPT
    this.chatApiService.sendUserMessage(this.userMessage).subscribe(
      (response) => {
        const chatResponse = response.choices[0].text.trim();
        
        this.messages.push({ 
          prompt: this.userMessage,
          answer: chatResponse
        });
        this.userMessage = ''; // Clear user input
      },
      (error) => {
        console.error('Error sending user message:', error);
      }
    );  
  }

  ngOnInit(): void {
  }

}
