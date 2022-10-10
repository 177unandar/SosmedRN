import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';
import { AccountState } from '../utils/types/redux.types';

const initialState: AccountState = {
  user: null,
  isRegistering: false,
};

export const accoutSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isRegistering = false;
    },
    setRegistering: (state, action: PayloadAction<boolean>) => {
      state.isRegistering = action.payload;
    },
  },
});
