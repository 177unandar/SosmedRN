import {Colors, DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue500,
    accent: Colors.blue200,
  },
};
