export interface Message {
    origin: 'user' | 'bot';
    message: string,
    timeSent?: string;
}