import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../pages/home/HomeScreen';
import PostScreen from '../pages/post/PostScreen';
import AccountScreen from '../pages/account/AccountScreen';
import {bottomNavStyle} from '../styles/bottomNavStyle';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {snackbarSlice} from '../redux/SnackbarSlice';
import {BottomStackNavigatorParamList} from './types.navigation';
import {User} from '../models/User';

const Tab = createMaterialBottomTabNavigator<BottomStackNavigatorParamList>();

const iconSize = 26;
const EXIT_DELAY: number = 3000;

const BottomNatigation = () => {
  const dispatch = useAppDispatch();
  const user: User | null = useAppSelector(state => state.account.user);
  const [backToExit, setBackToExit] = React.useState<boolean>(false);

  useEffect(() => {
    const backAction = () => {
      if (backToExit) {
        dispatch(snackbarSlice.actions.hide);
        BackHandler.exitApp();
      } else {
        dispatch(snackbarSlice.actions.info('Press once again to exit'));
        setBackToExit(true);
        setTimeout(() => {
          setBackToExit(false);
        }, EXIT_DELAY);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FFF"
      barStyle={bottomNavStyle.barStyle}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="image-auto-adjust"
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
      {user!! && (
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarLabel: 'Post',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="camera-plus"
                color={color}
                size={iconSize}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNatigation;
