import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';

import appReducer from '../features/app/reducer/appReducer.ts';
import chatDisplayReducer from '../features/chatDisplay/reducer/chatDisplayReducer.ts';
import controlButtonsReducer from "../features/controlButtons/reducer/controlButtonsReducer.ts";

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: chatDisplayReducer,
    typingUsers: chatDisplayReducer,
    buttons: controlButtonsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
