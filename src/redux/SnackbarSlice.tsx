import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarState } from '../utils/types/redux.types';

export const SNACKBAR_NORMAL = 1;
export const SNACKBAR_ERROR = 2;

const initialState: SnackbarState = {
  type: SNACKBAR_NORMAL,
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    info: (state, action: PayloadAction<string>) => {
      state.type = SNACKBAR_NORMAL;
      state.message = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.type = SNACKBAR_ERROR;
      state.message = action.payload;
    },
    hide: state => {
      state.message = '';
    },
  },
});
