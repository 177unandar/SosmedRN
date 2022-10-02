import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseResponse} from './response/BaseResponse';
import {LoginResponse} from './response/LoginResponse';
import {BASE_URL} from '../utils/config';
import {LoginPayload} from './payload/LoginPayload';
import {RegisterPayload} from './payload/RegisterPayload';

export const postLogin = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload): Promise<BaseResponse<LoginResponse>> => {
    let response = await fetch(`${BASE_URL}auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    let json = (await response.json()) as BaseResponse<LoginResponse>;
    return json;
  },
);

export const postCheckUsername = createAsyncThunk(
  'auth/username',
  async (username: string): Promise<BaseResponse<boolean>> => {
    let response = await fetch(`${BASE_URL}auth/username`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username}),
    });
    let json = (await response.json()) as BaseResponse<boolean>;
    return json;
  },
);

export const postRegister = createAsyncThunk(
  'auth/login',
  async (payload: RegisterPayload): Promise<BaseResponse<string>> => {
    let response = await fetch(`${BASE_URL}auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    let json = (await response.json()) as BaseResponse<string>;
    return json;
  },
);
