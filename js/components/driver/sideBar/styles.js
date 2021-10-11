import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
export default {
  links: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#470B63'
  },
  alinks: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#470B63'
  },
  iosAboutlink: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderTopColor: '#470B63',
    borderBottomColor: 'transparent'
  },
  aAboutlink: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: 'transparent'
  },
  linkText: {
    paddingLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontFamily:'Cabin-Regular'
  },
  logoutContainer: {
    padding: 30
  },
  logoutbtn: {
    paddingTop: 30,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#470B63'
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  drawerContent: {
    paddingTop: 30,
    
     height: deviceHeight -10
  },
  Bg: {
    marginTop:30,
    backgroundColor: "#470B63",
    marginBottom:40,
    borderColor:'#470B63'
  },
  adrawerContent: {
    paddingTop: 20,
    // backgroundColor: '#470B63',
    height: deviceHeight -10
  },
  aProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginLeft: 15
  },
  iosProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 5
  },
  aSidebarIcons: {
    marginLeft: 30,
    opacity: 0.8,
    width: 25
  },
  iosSidebarIcons: {
    marginLeft: 30,
    marginTop: 2,
    opacity: 0.8
  },
  aSidebarIconssec: {
    marginLeft: 25,
    opacity: 0.8,
    width: 20,
    height:20
  },
  iosSidebarIconsec: {
    marginLeft: 25,
    marginTop: 2,
    opacity: 0.8,
    width:20,
    height:20
  },
  profile: {
    backgroundColor: '#470B63',
    paddingTop: 10,
    paddingBottom: 10
  }
};
