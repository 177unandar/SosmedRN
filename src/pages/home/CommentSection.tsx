import * as React from 'react';
import { FlatList, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { commentSlice } from '../../redux/CommentSlice';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { Comment } from '../../models/Comment';
import { Pagination } from '../../models/Pagination';
import { fetchComments, postComment } from '../../api/feedApi';
import { GetCommentPayload } from '../../api/payload/GetCommentPayload';
import { BaseResponse } from '../../api/response/BaseResponse';
import { PaginationResponse } from '../../api/response/PaginationResponse';
import { feedSlice } from '../../redux/FeedSlice';
import { CommentItem } from './CommentItem';
import { PostCommentPayload } from '../../api/payload/PostCommentPayload';
import { snackbarSlice } from '../../redux/SnackbarSlice';
import { margins } from '../../styles/styles';


const CommentSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedId: number = useAppSelector(
        state => state.feed.selectedId,
    );
    const [newComment, setNewComment] = React.useState('');
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const comments: Comment[] = useAppSelector(state => state.comment.comments);
    const pagination: Pagination | null = useAppSelector(
        state => state.comment.pagination,
    );
    const isRefreshing: boolean = useAppSelector(
        state => state.comment.isRefreshing,
    );

    const loadComments = async (page: number) => {
        console.log("load comments ", page)
        if (page === 1) {
            dispatch(commentSlice.actions.setRefreshing(true));
        }
        let response = await dispatch(fetchComments(new GetCommentPayload(selectedId, page)));
        let payload = response.payload as BaseResponse<PaginationResponse<Comment>>;
        dispatch(commentSlice.actions.updateComments(payload));
    };

    const loadMore = async () => {
        if (pagination?.nextPage!!)
            loadComments(pagination.nextPage);
    };

    const submitComment = async () => {
        setLoading(true);
        let result = await dispatch(
            postComment(new PostCommentPayload(selectedId, newComment))
        );
        let response = result.payload as BaseResponse<string | undefined>;
        if (response.success) {
            setNewComment('');
            setLoading(false);
            loadComments(1);
        } else {
            dispatch(snackbarSlice.actions.error(response.message));
            setLoading(false);
        }
    }

    const closeComments = async () => {
        dispatch(feedSlice.actions.setSelectedId(0))
        dispatch(commentSlice.actions.clearComments())
    }

    return (
        <Portal>
            <Dialog visible={selectedId > 0} onDismiss={async () => closeComments()}>
                {comments.length == 0 && <Dialog.Content><Text style={margins.v3}>No comments yet.</Text></Dialog.Content>}
                {comments.length > 0 &&
                    <Dialog.ScrollArea>
                        <FlatList
                            onEndReachedThreshold={0.01}
                            onEndReached={() => {
                                loadMore();
                            }}
                            data={comments}
                            renderItem={({ item }) => <CommentItem comment={item} />}
                            onRefresh={() => loadComments(1)}
                            refreshing={isRefreshing}
                        />
                    </Dialog.ScrollArea>
                }
                <Dialog.Actions>
                    <TextInput value={newComment} onChangeText={newValue => setNewComment(newValue)} mode='outlined' multiline={true} style={{ flex: 1 }} label="comment" />
                    <Button loading={isLoading} disabled={newComment.length == 0} onPress={async () => await submitComment()}>Submit</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default CommentSection;
