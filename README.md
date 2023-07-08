# Chat GPT Project Demo

Demo to integrate ChatGPT into an Angular Application.
It uses AWS translate service for which you need to obtain AWS IAM credentials. You also need a ChatGPT OpenAI key.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.


## Before running the application:

1. Create file openai-api.ts in the src/environment folder.
    The contents should look like this:
    <br>
    
    export const openai = {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;OPENAI_API_KEY: "Your own OpenAi API Key",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;OPENAI_API_URL: 'Your own OpenAI API url'<br>
    }
    <br>
    
2. Create a file with name aws-translate.ts in the src/environment folder. 
    The contenst should look like this:
    <br>
    export const awsTranslate = {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;accessKeyId:&nbsp;&nbsp;&nbsp;&nbsp;"Your own AWS IAM key",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;secretAccessKey:&nbsp;&nbsp;&nbsp;&nbsp;"Your own AWS IAM Secret Access Key",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;region:&nbsp;&nbsp;&nbsp;&nbsp;"Your AWS own region"<br>
    }<br>


## Run the application
npm run start

