import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseResponse} from './response/BaseResponse';
import {Feed} from '../models/Feed';
import {PaginationResponse} from './response/PaginationResponse';
import {BASE_URL} from '../utils/config';

export const fetchFeeds = createAsyncThunk(
  'feeds/fetch',
  async (page: number): Promise<BaseResponse<PaginationResponse<Feed>>> => {
    let response = await fetch(`${BASE_URL}feed?page=${page}`);
    let json = (await response.json()) as BaseResponse<
      PaginationResponse<Feed>
    >;
    return json;
  },
);
