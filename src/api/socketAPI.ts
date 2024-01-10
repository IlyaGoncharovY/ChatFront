import {io, Socket} from 'socket.io-client';

import {MessageType, UserType} from '../features/chat/reducer/chatReducer.ts';

export const api = {
  socket: null as null | Socket,

  createConnection() {
    this.socket = io('http://localhost:3009');
  },
  subscribe(
    initMessagesHandler: (messages: MessageType[], fn: () => void) => void,
    newMessageSentHandler: (message: MessageType) => void,
    userTypingHandler: (user: UserType) => void,
  ) {
    this.socket?.on('init-messages-published', initMessagesHandler);
    this.socket?.on('new-message-sent',newMessageSentHandler);
    this.socket?.on('user-typing',userTypingHandler);
  },
  sendName (name: string) {
    this.socket?.emit('client-name-sent', name);
  },
  sendMessage (message: string) {
    this.socket?.emit('click-message-sent', message, (error: string | null) => {
      if(error) {
        alert(error);
      }
    });
  },
  typeMessage () {
    this.socket?.emit('client-typed');
  },
  destroyConnection() {
    this.socket?.disconnect();
    this.socket = null;
  },
};
