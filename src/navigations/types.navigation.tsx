import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type SplashStackNavigatorParamList = {
  Splash: undefined;
  BottomNatigation: undefined;
};

export type SplashNavigationProp =
  NativeStackNavigationProp<SplashStackNavigatorParamList>;

export type BottomStackNavigatorParamList = {
  Home: undefined;
  Post: undefined;
  Account: undefined;
};

export type BottomNavigationProp =
  NativeStackNavigationProp<BottomStackNavigatorParamList>;
