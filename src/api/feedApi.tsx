import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseResponse} from './response/BaseResponse';
import {Feed} from '../models/Feed';
import {PaginationResponse} from './response/PaginationResponse';
import {BASE_URL} from '../utils/config';
import {FeedPayload} from './payload/FeedPayload';
import {getSessionToken} from '../utils/storage/UserSession';

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

export const postFeed = createAsyncThunk(
  'feed/post',
  async (payload: FeedPayload): Promise<BaseResponse<string> | undefined> => {
    let fData = new FormData();
    let img = payload.image;
    fData.append('image', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
    });
    fData.append('caption', payload.caption);
    let token = await getSessionToken();
    if (token != undefined) {
      let response = await fetch(`${BASE_URL}feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
        body: fData,
      });
      let json = (await response.json()) as BaseResponse<string>;
      return json;
    }
  },
);
