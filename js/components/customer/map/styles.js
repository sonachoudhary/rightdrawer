const React = require('react-native');

const {Dimensions} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  pickMap: {
    position: "absolute",
    top: 130,
    left: 0,
    right: 0,
    bottom: 0
  },
  startMap: {
    position: "absolute",
    top: 130,
    left: 0,
    right: 0,
    bottom: 100
  },
  dropMap: {
    position: "absolute",
    top: 130,
    left: 0,
    right: 0,
    bottom: 45
  },
  locationContainer: {
    width: null,
    height: null,
    backgroundColor: "white",
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  triangle: {
    position: "absolute",
    bottom: 20,
    left: 48,
    width: 10,
    height: 15,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "#fff",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  },
  thumbnail: {
    width: 40,
    height: 40,
    margin: 0,    
  },
  trainButton:{
    height: 70,
    alignSelf: 'center',
    width: deviceWidth - 100,
    bottom:20,
    position:'absolute',
    textAlign:"center",
    borderRadius: 50,
    backgroundColor: "#FF0000"
  },
  iosHeader: {
    backgroundColor: '#ffffff',
    zIndex: 1001
  },
  aHeader: {
    backgroundColor: '#ffffff',
  },
  iosHeaderTitle: {
    color: '#000000',
  },
  aHeaderTitle: {
    color: '#000000',
  },
};
