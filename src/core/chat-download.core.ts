import { Message } from "../interface/message.interface";

export function downloadChat(chat: Array<Message>) {
    const chatData = JSON.stringify(chat);
    const transformedChatData = chatData.replaceAll('},', '},\n');
    const blob = new Blob([transformedChatData], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history`;
    a.click();
}