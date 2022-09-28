import * as React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Caption, Card} from 'react-native-paper';

const FeedCard = () => {
  return (
    <View style={{margin: 10}}>
      <Card>
        <Card.Title
          title="username"
          subtitle="User Fullname"
          left={props => <Avatar.Text {...props} label="US" />}
          right={() => <Caption style={{margin: 10}}>5 minutes ago</Caption>}
        />
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Content>
          <Caption>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Caption>
        </Card.Content>
        <Card.Actions>
          <Button>Comment</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default FeedCard;
