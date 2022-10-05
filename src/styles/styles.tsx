import { StyleSheet } from 'react-native';

export const space1 = 5;
export const space2 = 10;
export const space3 = 20;
export const space4 = 30;

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
  componentError: {
    backgroundColor: 'red',
    color: 'white',
  },
});

export const margins = StyleSheet.create({
  l2: {
    marginLeft: space2,
  },
  b2: {
    marginBottom: space2,
  },
  v2: {
    marginVertical: space2,
  },
  t3: {
    marginTop: space3,
  },
  v1: {
    marginVertical: space1,
  },
  v3: {
    marginVertical: space3,
  },
  t4: {
    marginTop: space4,
  },
  b4: {
    marginBottom: space4,
  },
});
