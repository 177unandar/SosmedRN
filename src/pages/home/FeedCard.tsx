import * as React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Caption, Card, Divider, Text} from 'react-native-paper';
import {Feed} from '../../models/Feed';
import moment from 'moment';
import {styles} from '../../styles/styles';
import {cardStyles} from '../../styles/cardStyles';

type Props = {
  feed: Feed;
};

const FeedCard: React.FC<Props> = ({feed}) => {
  const initial = () => {
    let arr = feed.fullname.split(' ');
    if (arr.length > 1) {
      return `${arr[0].substring(0, 1)}${arr[arr.length - 1].substring(
        0,
        1,
      )}`.toUpperCase();
    }
    return feed.fullname.substring(0, 1);
  };
  return (
    <View style={styles.componentStyle}>
      <Card>
        <Card.Cover resizeMode="contain" source={{uri: feed.image_url}} />
        <Card.Title
          title={feed.fullname}
          subtitle={feed.username}
          left={props => <Avatar.Text {...props} label={initial()} />}
          right={() => (
            <Text style={cardStyles.createdAt}>
              {moment(feed.created_at).fromNow()}
            </Text>
          )}
        />
        <Divider />
        <Card.Content>
          <Caption>{feed.caption}</Caption>
        </Card.Content>
        <Divider />
        <Card.Actions>
          <Button>Comment</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default FeedCard;
