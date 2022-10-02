import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../pages/splash/SplashScreen';
import BottomNatigation from './BottomNatigation';
import {SplashStackNavigatorParamList} from './types.navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Snackbar} from 'react-native-paper';
import {snackbarSlice, SNACKBAR_ERROR} from '../redux/SnackbarSlice';
import {styles} from '../styles/styles';
import {useAppDispatch, useAppSelector} from '../redux/hook';

const Stack = createNativeStackNavigator<SplashStackNavigatorParamList>();

const App = () => {
  const dispatch = useAppDispatch();
  const snackbarType: number = useAppSelector(state => state.snackbar.type);
  const snackbarMessage: string = useAppSelector(
    state => state.snackbar.message,
  );
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

      <Snackbar
        style={snackbarType === SNACKBAR_ERROR ? styles.componentError : {}}
        visible={snackbarMessage.length > 0}
        action={{
          label: 'Close',
          onPress: () => {
            dispatch(snackbarSlice.actions.hide());
          },
        }}
        onDismiss={() => dispatch(snackbarSlice.actions.hide())}>
        {snackbarMessage}
      </Snackbar>
    </NavigationContainer>
  );
};

export default App;
