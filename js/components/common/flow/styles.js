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
    flexDirection: 'row',
    marginLeft:10
    // flexWrap: 'no-wrap'
  },
  listContainernew1:{
    flexDirection: 'row',
    marginLeft:10
  },
  listContainernew:{
     flexDirection: 'row',
     marginLeft:10
  },
  lextText: {
   
   
  },
  textColor: {
    color: '#4C4C4C',
    alignSelf: 'flex-start',
    fontWeight: '400',
    lineHeight:20,
   
  },
  rightText: {
    // width: 40,
     
      width:40,
  },
  addressContainer: {
    flexDirection: 'row',
    flex:1,
    paddingLeft:30,
    paddingTop:10,
    paddingBottom:10,
    borderTopColor:"#ddd",
    borderTopWidth:1,
    marginTop:20
  },
  rowItemLeft:{
    color: '#444',
    fontWeight: '400',
    width:100,
    lineHeight:40,
    flex:1,
    fontSize:18
  },
  rowItemLeft1:{
    color: '#444',
    fontWeight: '400',
    width:80,
    lineHeight:40,
    fontSize:18
  },
  rowItemRight1:{
    
    color: '#000',
    fontWeight: '400',
    width:200,
    lineHeight:20,
    
    paddingRight:10
  },
  rowItemRight2:{
    
    color: '#000',
    fontWeight: '400',
    width:200,
    lineHeight:20,
    
    paddingRight:10
  },
  rowItemRight:{
    flex:1,
    color: '#000',
    fontWeight: '400',
    width:150,
    lineHeight:20,
    
    paddingRight:10
  },
  rowItemRates:{
    flex:1,
    color: '#000',
    fontWeight: '400',
    width:150,
    lineHeight:20,
    
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
  input:{
    paddingLeft:0,
    fontSize:16,
  },
  input1:{
    paddingLeft:0,
    textTransform: 'capitalize'
  },
  phoneinut:{
    paddingLeft:0,
    color:'#333333'
  },
  topheading:{
    color: "#363636",paddingLeft:30,paddingTop:20,marginBottom:30,fontSize:30,width:deviceWidth-20
  },
  backbuttoncolor:{
    color: "#D6D6D6", marginTop:3
  },
  backbuttonarrowcolor:{
    fontSize: 24,
    marginLeft: 5,
    color: "#D6D6D6"
  },
  checkmarkcls:{
     color: "#D41818",
          fontWeight: "bold",
          fontSize: 48,
          marginRight: 10,
          marginBottom:-30,
          marginTop:-15
  },
  cprtext1:{
    color: "#000",paddingLeft:30,marginTop:-30,fontSize:15,marginBottom:30 
  },
  cprtext:{
    color: "#000",paddingLeft:30,fontSize:15,marginBottom:30 
  },
};
