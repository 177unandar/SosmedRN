import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Caption, Card, Text } from 'react-native-paper';
import { Feed } from '../models/Feed';
import moment from 'moment';

type Props = {
  feed: Feed
}

const FeedCard: React.FC<Props> = ({ feed }) => {
  const initial = () => {
    let arr = feed.fullname.split(" ");
    if (arr.length > 1) {
      return `${arr[0].substring(0, 1)}${arr[arr.length - 1].substring(0, 1)}`.toUpperCase();
    }
    return feed.fullname.substring(0, 1);
  }
  return (
    <View style={{ margin: 10 }}>
      <Card>
        <Card.Title
          title={feed.username}
          subtitle={feed.fullname}
          left={props => <Avatar.Text {...props} label={initial()} />}
          right={() => <Text style={{ margin: 10 }}>{moment(feed.created_at).fromNow()}</Text>}
        />
        <Card.Cover source={{ uri: feed.image_url }} />
        <Card.Content>
          <Caption>{feed.caption}</Caption>
        </Card.Content>
        <Card.Actions>
          <Button>Comment</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default FeedCard;
