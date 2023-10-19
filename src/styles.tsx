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
  rightItemContainer: {
    flexDirection: "column",
    flex: 1
  },
  image: {
    width: 64,
    height: 88,
    marginRight: 8
  },
  title: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  ratingContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  rating: {
    fontWeight: 'bold',
    color: "#444"
  },
  voteCount: {
    color: 'grey'
  }
});
