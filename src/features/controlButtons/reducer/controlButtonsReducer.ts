import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppThunk} from '../../../store';
import {api} from '../../../api';

interface initialStateType {
    name: string
}

const initialState: initialStateType = {
  name: '',
};

const controlButtons = createSlice({
  name: 'controlButtons',
  initialState,
  reducers: {
    setClientName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});
export const {setClientName} = controlButtons.actions;

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

export default controlButtons.reducer;
