import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    padding: 24
  },
  listItem: {
    flexDirection: "row",
    padding: 8
  },
  image: {
    width: 64,
    height: 88,
    marginRight: 8
  },
  title: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  ratingContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  rating: {
    fontWeight: 'bold'
  }
});
