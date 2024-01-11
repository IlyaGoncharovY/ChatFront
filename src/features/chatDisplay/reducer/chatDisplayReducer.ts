import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

const chatDisplayReducer = createSlice({
  name: 'chatDisplayReducer',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
    setNewMessage: (state, action: PayloadAction<MessageType>) => {
      return {...state,
        messages: [...state.messages, action.payload],
        typingUsers: state.typingUsers.filter(el => el.id !== action.payload.user.id),
      };
    },
    setTypingUsers: (state, action: PayloadAction<UserType>) => {
      return {...state,
        typingUsers: [...state.typingUsers.filter(u =>
          u.id !== action.payload.id), action.payload,
        ]};
    },
  },
});
export const {
  setMessages,
  setNewMessage,
  setTypingUsers,
} = chatDisplayReducer.actions;

export default chatDisplayReducer.reducer;
