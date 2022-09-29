import {BaseResponse} from '../models/BaseResponse';
import {Feed} from '../models/Feed';
import {Pagination} from '../models/Pagination';
import {BASE_URL} from '../utils/config';

export const getFeeds = (
  page: number = 1,
): Promise<BaseResponse<Pagination<Feed>>> => {
  try {
    return new Promise<BaseResponse<Pagination<Feed>>>((resolve, reject) => {
      fetch(`${BASE_URL}feed?page=${page}`)
        .then(response => response.json())
        .then(json => {
          return resolve(json);
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (error) {
    console.error('error get feeds ', error);
    throw new Error('failed to get feeds');
  }
};
