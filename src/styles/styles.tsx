import {StyleSheet} from 'react-native';

const space1 = 5;
const space2 = 10;
const space3 = 15;
const space4 = 20;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: space2,
    paddingVertical: space1,
  },
  fullScreenCenterChilds: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 1,
  },
  centerChilds: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignCenter: {
    textAlign: 'center', //Centered horizontally
  },
  fullWidth: {
    width: '100%',
  },
  componentStyle: {
    marginVertical: space1,
  },
});

export const margins = StyleSheet.create({
  v3: {
    marginVertical: space3,
  },
  t4: {
    marginTop: space4,
  },
});
