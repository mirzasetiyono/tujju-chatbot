import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/header';
import MessageInput from './components/message-input/message-input';
import MessageContainer from './components/chat/message-container';
import { ChatEngine } from "./core/chatbot.core";
import { Message } from './interface/message.interface';

function App() {

  const chatEngine = new ChatEngine();

  let [messages, sendMessage] = useState<Array<Message>>([
    { origin: 'bot', message: 'Hello, how can I help you?', timeSent: new Date().toLocaleString() },
  ])

  const redirectTo = (url: string) =>  {
    window.location.href = url;
  }
 
  useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const isHuman = chatEngine.identifyHuman(lastMessage);
      if (isHuman) {
        const reply = chatEngine.processChat(lastMessage.message);
        reply.then((resp) => {
          if (resp === 'search') {
            redirectTo('http://www.google.com');
          }
          sendMessage([...messages, { origin: 'bot', message: resp, timeSent: new Date().toLocaleString()}]);
        });
      }
    }
  })

  return (
    <div id='main-app'>
      <Header messages={messages}></Header>
      <MessageContainer messages={messages}></MessageContainer>
      <MessageInput sendMessage={sendMessage}></MessageInput>
    </div>
  );
}

export default App;
