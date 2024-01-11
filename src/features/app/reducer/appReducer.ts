import {createSlice} from '@reduxjs/toolkit';

import {AppThunk} from '../../../store';
import {api} from '../../../api';
import {setMessages, setNewMessage, setTypingUsers} from '../../chatDisplay';

interface initialStateType {

}

const initialState: initialStateType = {

};

const appSlice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {

  },
});
export const {} = appSlice.actions;

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
