import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseResponse } from '../api/response/BaseResponse';
import { PaginationResponse } from '../api/response/PaginationResponse';
import { CommentState } from '../utils/types/redux.types';
import { Comment } from '../models/Comment';

const initialState: CommentState = {
    comments: [],
    pagination: null,
    isRefreshing: true,
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        updateComments: (
            state,
            action: PayloadAction<BaseResponse<PaginationResponse<Comment>>>,
        ) => {
            let response = action.payload;
            if (response.success) {
                if (response.data.pagination.currentPage > 1) {
                    state.comments = state.comments.concat(response.data.rows);
                } else {
                    state.comments = response.data.rows;
                }
                state.pagination = response.data.pagination;
                state.isRefreshing = false;
            }
        },
        clearComments: state => {
            state.comments = [];
            state.pagination = null;
        },
        setRefreshing: (state, action: PayloadAction<boolean>) => {
            state.isRefreshing = action.payload;
        },
    },
});
