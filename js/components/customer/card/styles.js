import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosLogoContainer: {
    top: deviceHeight / 5,
    alignItems: 'center'
  },
  aLogoContainer: {
    top: deviceHeight / 4.5,
    alignItems: 'center',
    height: deviceHeight / 1.5
  },
  logoIcon: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 7,
    borderColor: '#316687',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    marginBottom: 20
  },
  logoText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 30,
    marginTop: -10
  },
  loginBtn: {
    height: 50,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    width: deviceWidth - 100,
    borderColor: commonColor.brandButton,
    backgroundColor: '#5CA8D8'
  },
  serviceBtn: {
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:50
  },
  registerBtn: {
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:100
  },
  trainerBtn: {
    height: 50,
    alignSelf: 'center',
    marginTop:20,
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton
  },
  nameBtn:{
    height: 50,
    alignSelf: 'center',
    marginTop:20,
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton
  },
  experienceButton:{
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:150,
    textAlign:"center",
  },
  listcustom: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    borderTopWidth: 0,
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  listContainer: {
    flexDirection: 'row'
    // flexWrap: 'no-wrap'
  },
  lextText: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  textColor: {
    color: '#444',
    alignSelf: 'flex-start',
    fontWeight: '400',
    lineHeight:40,
  },
  rightText: {
    // width: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  addressContainer: {
    flexDirection: 'row',
    flex:1,
    paddingLeft:30,
    paddingTop:10,
    paddingBottom:10,
    borderColor:"#ddd",
    borderWidth:1,
  },
  rowItemLeft:{
    color: '#444',
    fontWeight: '400',
    width:100,
    lineHeight:40,
    flex:1
  },
  rowItemRight:{
    flex:1,
    color: '#000',
    fontWeight: '400',
    width:150,
    lineHeight:20,
    textAlign:"right",
    paddingRight:10
  },
  completeBtn:{
    height: 50,
    alignSelf: 'center',
    marginTop:20,
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginBottom:30,
  },
};
