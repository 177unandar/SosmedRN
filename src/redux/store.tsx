import { configureStore } from '@reduxjs/toolkit';
import { accoutSlice } from './AccountSlice';
import { commentSlice } from './CommentSlice';
import { feedSlice } from './FeedSlice';
import { snackbarSlice } from './SnackbarSlice';

export const store = configureStore({
  reducer: {
    feed: feedSlice.reducer,
    comment: commentSlice.reducer,
    account: accoutSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
