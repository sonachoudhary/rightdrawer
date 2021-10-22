import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
export default {
  links: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 0,
    
  },
  alinks: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 0,
    
  },
  iosAboutlink: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderTopColor: '#232232',
    borderBottomColor: 'transparent'
  },
  aAboutlink: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: 'transparent'
  },
  linkText: {
    paddingLeft: 10,
    color: '#000',
    fontSize: 18,
    fontWeight: '500'
  },
  logoutContainer: {
    padding: 30
  },
  logoutbtn: {
    paddingTop: 30,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#797979'
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  drawerContent: {
    paddingTop: 30,
    backgroundColor: '#fff',
     height: deviceHeight -10
  },
  Bg: {
    backgroundColor: commonColor.brandSecondry,
    marginBottom:40
  },
  adrawerContent: {
    paddingTop: 20,
    backgroundColor: '#fff',
    height: deviceHeight -10
  },
  aProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginLeft: 15,
    fontSize: 25
  },
  iosProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 5,
    fontSize: 25
  },
  aSidebarIcons: {
    marginLeft: 30,
    fontWeight: '600',
    color: '#000',
    fontSize: 25,
    opacity: 0.8,
    width: 25
  },
  iosSidebarIcons: {
    color: '#000',
    marginLeft: 30,
    fontWeight: '600',
    marginTop: 2,
    fontSize: 25,
    opacity: 0.8
  },
  profile: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingTop: 10,
    paddingBottom: 10
  }
};
