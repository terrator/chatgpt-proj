import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'terrator.chatgpt.demo',
  appName: 'chatgpt-demo',
  webDir: 'dist/chatgpt-demo',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.2.68:4200',
    cleartext: true
  }
};

export default config;
