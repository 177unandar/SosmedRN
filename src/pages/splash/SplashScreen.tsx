import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text} from 'react-native';
import {SplashNavigationProp} from '../../navigations/types.navigation';

const SPLASH_DELAY: number = 1000;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        navigation.navigate('BottomNatigation');
      }, SPLASH_DELAY);
    });

    return unsubscribe;
  }, [navigation]);

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
