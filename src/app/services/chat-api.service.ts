import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { openai } from 'src/environments/openai-api';
import { Message } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private apiUrl = openai.OPENAI_API_URL;
  private apiKey = openai.OPENAI_API_KEY;

  constructor(private http: HttpClient) { }

  sendUserMessage(messages: Message[]): Observable<any> {
    const requestBody = {
      messages: messages,
      model: "gpt-3.5-turbo",
      max_tokens: 256,
    };
    
    return this.http.post<any>(this.apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
  }
}
