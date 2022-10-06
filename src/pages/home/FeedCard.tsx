import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Avatar, Badge, Button, Caption, Card, Divider, Text } from 'react-native-paper';
import { Feed } from '../../models/Feed';
import moment from 'moment';
import { margins, styles } from '../../styles/styles';
import { cardStyles } from '../../styles/cardStyles';
import { initial } from '../../utils/StringHelpers';
import { useAppDispatch } from '../../redux/hook';
import { feedSlice } from '../../redux/FeedSlice';
import { fetchComments } from '../../api/feedApi';
import { GetCommentPayload } from '../../api/payload/GetCommentPayload';
import { BaseResponse } from '../../api/response/BaseResponse';
import { PaginationResponse } from '../../api/response/PaginationResponse';
import { Comment } from '../../models/Comment';
import { commentSlice } from '../../redux/CommentSlice';

type Props = {
  feed: Feed;
  isLoading: boolean,
};

const FeedCard: React.FC<Props> = ({ feed, isLoading }) => {
  const dispatch = useAppDispatch();

  const showComments = async () => {
    await dispatch(commentSlice.actions.setRefreshing(true));
    dispatch(feedSlice.actions.setSelectedId(feed.id))
    let response = await dispatch(fetchComments(new GetCommentPayload(feed.id, 1)));
    let payload = response.payload as BaseResponse<PaginationResponse<Comment>>;
    dispatch(commentSlice.actions.updateComments(payload));
  }

  return (
    <View style={styles.componentStyle}>
      <Card>
        <Card.Cover resizeMode="contain" source={{ uri: feed.image_url }} />
        <Card.Title
          title={feed.username.toLowerCase()}
          subtitle={feed.fullname}
          left={props => (
            <Avatar.Text {...props} label={initial(feed.fullname)} />
          )}
          right={() => (
            <Text style={cardStyles.createdAt}>
              {moment(feed.created_at).fromNow()}
            </Text>
          )}
        />
        <Divider />
        <Card.Content>
          <Caption style={margins.t3}>{feed.caption}</Caption>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.centerChilds} onPress={async () => await showComments()}>Comments</Button>
          {feed.total_comments > 0 &&
            <Badge>{feed.total_comments}</Badge>
          }
        </Card.Actions>
      </Card>
      {isLoading &&
        <ActivityIndicator style={margins.v3} animating={true} />
      }
    </View>
  );
};

export default FeedCard;
