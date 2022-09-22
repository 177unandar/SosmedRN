import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../pages/splash/SplashScreen';
import BottomNatigation from './BottomNatigation';
import {SplashStackNavigatorParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<SplashStackNavigatorParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomNatigation"
          component={BottomNatigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
