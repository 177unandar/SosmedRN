import * as React from 'react';
import {View} from 'react-native';
import {User} from '../../models/User';
import {useAppSelector} from '../../redux/hook';
import {styles} from '../../styles/styles';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import UserScreen from './UserScreen';

const AccountScreen: React.FC = () => {
  const user: User | null = useAppSelector(state => state.account.user);
  const isRegistering: boolean = useAppSelector(
    state => state.account.isRegistering,
  );
  return (
    <View style={[styles.container, styles.fullScreenCenterChilds]}>
      {user !== null && <UserScreen />}
      {user == null && isRegistering && <RegisterScreen />}
      {user == null && !isRegistering && <LoginScreen />}
    </View>
  );
};

export default AccountScreen;
