import * as React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Caption, Card, Divider, Text} from 'react-native-paper';
import {Feed} from '../../models/Feed';
import moment from 'moment';
import {margins, styles} from '../../styles/styles';
import {cardStyles} from '../../styles/cardStyles';
import {initial} from '../../utils/StringHelpers';

type Props = {
  feed: Feed;
};

const FeedCard: React.FC<Props> = ({feed}) => {
  return (
    <View style={styles.componentStyle}>
      <Card>
        <Card.Cover resizeMode="contain" source={{uri: feed.image_url}} />
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
          <Button>Comment</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default FeedCard;
