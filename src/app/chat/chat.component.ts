import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatApiService } from '../chat-api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: string[] = []
  userMessage!: string;

  constructor(private chatApiService: ChatApiService) { }

  sendMessage() {
    this.messages.push(this.userMessage);

    // Send user message to ChatGPT
    this.chatApiService.sendUserMessage(this.messages.join('\n')).subscribe(
      (response) => {
        const chatResponse = response.choices[0].text.trim();
        this.messages.push(chatResponse);
      },
      (error) => {
        console.error('Error sending user message:', error);
      }
    );

    this.userMessage = ''; // Clear user input
  }

  ngOnInit(): void {
  }

}
