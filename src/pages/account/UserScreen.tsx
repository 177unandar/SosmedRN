import * as React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Headline, Subheading} from 'react-native-paper';
import {User} from '../../models/User';
import {accoutSlice} from '../../redux/AccountSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {margins, styles} from '../../styles/styles';
import {clearSession} from '../../utils/storage/UserSession';
import {initial} from '../../utils/StringHelpers';

const UserScreen = () => {
  const dispatch = useAppDispatch();
  const user: User | null = useAppSelector(state => state.account.user);

  const logout = async () => {
    await clearSession();
    dispatch(accoutSlice.actions.updateUserState(null));
  };

  return (
    <View style={styles.centerChilds}>
      <Avatar.Text size={92} label={initial(`${user?.fullname}`)} />
      <Headline>{user?.fullname}</Headline>
      <Subheading>{user?.username}</Subheading>
      <Button
        style={margins.t4}
        mode="outlined"
        onPress={async () => await logout()}>
        Logout
      </Button>
    </View>
  );
};
export default UserScreen;
