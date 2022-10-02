import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text} from 'react-native';
import {User} from '../../models/User';
import {SplashNavigationProp} from '../../navigations/types.navigation';
import {accoutSlice} from '../../redux/AccountSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {getLogedUser} from '../../utils/storage/UserSession';

const SPLASH_DELAY: number = 1000;

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
      <Text style={{color: 'black'}}>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
