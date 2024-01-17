import {createSlice} from '@reduxjs/toolkit';

import {api} from '../../../api';
import {AppThunk} from '../../../store';
import {setMessages, setNewMessage, setTypingUsers} from '../../chatDisplay';

interface initialStateType {
    inputError: string
}

const initialState: initialStateType = {
  inputError: '',
};

const appSlice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.inputError = action.payload;
    },
  },
});
export const {setError} = appSlice.actions;

export const createConnectionTC = (): AppThunk =>
  (dispatch) => {
    api.createConnection();
    api.subscribe(
      (messages, fn: (data: string) => void) => {
        dispatch(setMessages(messages));
        fn('data from front');
      },
      (message) => {
        dispatch(setNewMessage(message));
      },
      (user) => {
        dispatch(setTypingUsers(user));
      },
    );
  };

export const destroyConnectionTC = (): AppThunk =>
  async () => {
    api.destroyConnection();
  };

export default appSlice.reducer;
