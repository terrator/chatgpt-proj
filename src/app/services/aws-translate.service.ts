import { Injectable } from '@angular/core';
import { TranslateClient, TranslateClientConfig } from '@aws-sdk/client-translate';
import { awsTranslate } from 'src/environments/aws-translate';
import { TranslateTextCommand } from '@aws-sdk/client-translate';

@Injectable({
  providedIn: 'root'
})
export class AwsTranslateService {
  private translator!: TranslateClient;
  static params: TranslateClientConfig = {
    region: awsTranslate.region,
    credentials: {
      accessKeyId: awsTranslate.accessKeyId, 
      secretAccessKey: awsTranslate.secretAccessKey, 
    }
  }

  init() {
    this.translator = new TranslateClient(AwsTranslateService.params)
  }

  constructor() { }

  async translate(text: string, sourceLang: string, tragetLang: string): Promise<string> {
    let translatedText = '';

    const params = {
      Text: text,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: tragetLang,
    }

    const translateCommand: TranslateTextCommand = new TranslateTextCommand(params);

    try {
      const data = await this.translator.send(translateCommand);
      translatedText = data.TranslatedText || '';
      console.log("Original text: " + text);
      console.log("Translation: " + translatedText);
    } catch(err) {
      console.log('Error -->');
      console.log(err)
    }
    return translatedText;
  }
}
