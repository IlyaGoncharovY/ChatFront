import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppThunk} from '../../../store/store.ts';
import {api} from '../../../api/socketAPI.ts';

export type UserType = {
    id: string
    name: string
}
export type MessageType = {
    message: string,
    id: string,
    user: UserType
}

interface initialStateType {
    messages: MessageType[]
    typingUsers: UserType[]
}

const initialState: initialStateType = {
  messages: [],
  typingUsers: [],
};

const chatSlice = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
    setNewMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
      // state.typingUsers = state.typingUsers.filter(user => user.id !== action.payload.user.id);
      state.typingUsers.filter(u => u.id !== action.payload.user.id);
    },
    setTypingUsers: (state, action: PayloadAction<UserType>) => {
      // state.typingUsers = state.typingUsers.filter(user => user.id !== action.payload.id);
      return {...state, typingUsers: [...state.typingUsers.filter(u => u.id !== action.payload.id), action.payload]};
    },
  },
});
export const {
  setMessages,
  setNewMessage,
  setTypingUsers,
} = chatSlice.actions;

export const createConnectionTC = (): AppThunk =>
  (dispatch) => {
    api.createConnection();
    api.subscribe(
      (messages) => {
        dispatch(setMessages(messages));
      },
      (message) => {
        dispatch(setNewMessage(message));
      },
      (user) => {
        dispatch(setTypingUsers(user));
      },
    );
  };

export const setClientNameTC = (name: string): AppThunk =>
  () => {
    api.sendName(name);
  };

export const setNewMessageTC = (message: string): AppThunk =>
  () => {
    api.sendMessage(message);
  };

export const typeMessageTC = (): AppThunk =>
  () => {
    api.typeMessage();
  };

export const destroyConnectionTC = (): AppThunk =>
  async () => {
    api.destroyConnection();
  };

export default chatSlice.reducer;
