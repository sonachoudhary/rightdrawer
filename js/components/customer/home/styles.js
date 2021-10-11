import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const {Dimensions} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: deviceWidth,
    height: deviceWidth,
    flex: 999999,
  },
  imageiconclass:{
    textAlign:"center",
    width:deviceWidth - 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBg: {
    height: null,
    width: null,
    top: 0,
    flex: 999,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pageTouch: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: deviceHeight,
    width: deviceWidth,
    flex: 999999,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: commonColor.brandPrimary,
  },
  detailsContainer: {
    padding: 30,
    paddingTop: 40,
    alignItems: 'center',
    position: 'absolute',
    top: deviceHeight / 2,
    right: 0,
    left: 0,
  },
  time: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  place: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    opacity: 0.8,
  },
  rating: {
    color: '#ccc',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
  },
  iosRateStar: {
    marginTop: 5,
    fontSize: 16,
    color: '#ccc',
    alignSelf: 'center',
  },
  aRateStar: {
    marginTop: -23,
    fontSize: 16,
    color: '#ccc',
    alignSelf: 'center',
  },
  iosHeader: {
    backgroundColor: '#ffffff'
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
  logoutLogo: {
    color: '#000000',
  },
  locate:{
    // flexDirection: "row",
    // alignItems: "flex-end",
    backgroundColor: 'transparent',
    // justifyContent: "flex-end",
    position: 'absolute',
    // bottom: 30,
    top: deviceHeight - 120,
    right: 20
  },
  modalView: {
    alignSelf: 'center',
    height:'auto',
    marginTop:50, 
    width:deviceWidth - 100,
    backgroundColor:"#FFF", 
    padding:20, 
    borderRadius:10    
  },
  completeBtn:{
    height: 50,
    alignSelf: 'center',
    marginTop:10,
    width: 150,
    backgroundColor: "#E3E3E3",
    marginTop:25,
    marginBottom:15,
    borderRadius:35
  },
  trainButton:{
    height: 70,
    alignSelf: 'center',
    width: deviceWidth - 100,
    marginTop: deviceHeight - 150,
    textAlign:"center",
    borderRadius: 50,
    backgroundColor: "#FF0000"
  },
};
