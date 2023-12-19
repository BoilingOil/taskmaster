import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
  detailsButton: {
    marginLeft: 8,
    borderRadius: 2,
    padding: 4,
    backgroundColor: 'lightblue',
    opacity: 0.5,
  },
  detailsText: {
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContainer: {
    margin: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'lightgrey',
  },
  selected: {
    borderColor: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
  },
});
