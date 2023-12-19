import {StyleSheet} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  checkbox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContainer: {
    marginTop: 32,
    padding: 16,
    // paddingHorizontal: 24,
    borderWidth: 1,
  },
  selected: {
    borderColor: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});
