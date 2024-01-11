import {createSlice} from '@reduxjs/toolkit';

import {AppThunk} from '../../../store';
import {api} from '../../../api';

interface initialStateType {

}

const initialState: initialStateType = {

};

const controlButtons = createSlice({
  name: 'controlButtons',
  initialState,
  reducers: {},
});
export const {} = controlButtons.actions;

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
