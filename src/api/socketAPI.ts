import {io, Socket} from 'socket.io-client';
import {MessageType, UserType} from "../features/chatDisplay";
import {SOCKET_KEY} from "./socketKey.ts";

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
    this.socket?.on(SOCKET_KEY.INIT_MESSAGE, initMessagesHandler);
    this.socket?.on(SOCKET_KEY.NEW_MESSAGE_SENT,newMessageSentHandler);
    this.socket?.on(SOCKET_KEY.USER_TYPING,userTypingHandler);
  },
  sendName (name: string) {
    this.socket?.emit(SOCKET_KEY.CLIENT_NAME, name);
  },
  sendMessage (message: string) {
    this.socket?.emit(SOCKET_KEY.MESSAGE_SENT, message, (error: string | null) => {
      if(error) {
        alert(error);
      }
    });
  },
  typeMessage () {
    this.socket?.emit(SOCKET_KEY.CLIENT_TYPED);
  },
  destroyConnection() {
    this.socket?.disconnect();
    this.socket = null;
  },
};
