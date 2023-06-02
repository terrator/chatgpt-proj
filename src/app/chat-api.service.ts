import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { openai } from 'src/environments/openai-api';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private apiUrl = openai.OPENAI_API_URL;
  private apiKey = openai.OPENAI_API_KEY;

  constructor(private http: HttpClient) { }

  sendUserMessage(prompt: string): Observable<any> {
    const requestBody = {
      prompt: prompt,
      model: "text-davinci-003",
      max_tokens: 256,
    };
    
    console.log(requestBody);
    console.log(`Bearer ${this.apiKey}`);

    return this.http.post<any>(this.apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
  }
}
