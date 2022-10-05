import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse } from './response/BaseResponse';
import { Feed } from '../models/Feed';
import { Comment } from '../models/Comment';
import { PaginationResponse } from './response/PaginationResponse';
import { BASE_URL } from '../utils/config';
import { FeedPayload } from './payload/FeedPayload';
import { getSessionToken } from '../utils/storage/UserSession';
import { GetCommentPayload } from './payload/GetCommentPayload';
import { PostCommentPayload } from './payload/PostCommentPayload';

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

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (payload: GetCommentPayload): Promise<BaseResponse<PaginationResponse<Comment>>> => {
    let response = await fetch(`${BASE_URL}feed/${payload.feedId}/comment?page=${payload.page}`);
    let json = (await response.json()) as BaseResponse<
      PaginationResponse<Comment>
    >;
    return json;
  },
);

export const postComment = createAsyncThunk(
  'comment/post',
  async (payload: PostCommentPayload): Promise<BaseResponse<string> | undefined> => {
    let token = await getSessionToken();
    if (token != undefined) {
      let response = await fetch(`${BASE_URL}feed/${payload.feedId}/comment`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ comment: payload.comment }),
      });
      let json = (await response.json()) as BaseResponse<string>;
      return json;
    }
  },
);
