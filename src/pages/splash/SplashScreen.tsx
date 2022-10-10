import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Colors, Title } from 'react-native-paper';
import { User } from '../../models/User';
import { SplashNavigationProp } from '../../utils/types/navigation.types';
import { accoutSlice } from '../../redux/AccountSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { snackbarSlice } from '../../redux/SnackbarSlice';
import { margins } from '../../styles/styles';
import { getLogedUser } from '../../utils/storage/UserSession';

const SPLASH_DELAY: number = 2000;

const SplashScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user: User | null = useAppSelector(state => state.account.user);
  const navigation = useNavigation<SplashNavigationProp>();

  const updateUserState = async () => {
    let loggedUser = await getLogedUser();
    dispatch(accoutSlice.actions.updateUserState(loggedUser));
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(snackbarSlice.actions.hide());
      setTimeout(async () => {
        if (user == null) {
          await updateUserState();
        }
        navigation.navigate('BottomNatigation');
      }, SPLASH_DELAY);
    });

    return unsubscribe;
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Avatar.Icon style={margins.b4} size={100} icon="chat" />
      <Title style={{ color: Colors.blue500 }}>SOSMED APP</Title>
    </View>
  );
};

export default SplashScreen;
