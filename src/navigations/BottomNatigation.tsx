import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../pages/home/HomeScreen';
import PostScreen from '../pages/post/PostScreen';
import AccountScreen from '../pages/account/AccountScreen';
// import {SplashNavigationProp} from './types';

const Tab = createMaterialBottomTabNavigator();

const BottomNatigation = () => {
  // const natigation = useNavigation<SplashNavigationProp>();
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FFF"
      barStyle={{backgroundColor: 'purple'}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="image-auto-adjust"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="camera-plus"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNatigation;
