import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosLogoContainer: {
    marginTop:'8%'
  },
  aLogoContainer:{
    marginTop:'5%'
  },
   text:{textAlign: 'center', color: "#000", backgroundColor:'#fff',marginTop:10,},
   text2:{flexDirection:'row',justifyContent:'space-between'},
   box:{
    backgroundColor:'#ffff',width:'90%',height:150, borderRadius: 10,position:'absolute',top:120,marginLeft:20,marginRight:20,zIndex:1002 ,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection:'row',justifyContent:'space-between',
  },
   Smallbox:{
    backgroundColor:'#ffff',width:66,height:60, borderRadius: 10,marginLeft:20,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginTop:10,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  eventsbox:{
    backgroundColor:'#ffff',width:deviceWidth/5,height:60, borderRadius: 10,marginLeft:10,
    marginTop:10,
    
    justifyContent:'center',
    alignItems:'center'
  },
  Smallbox2:{
    backgroundColor:'#FEE4C8',width:200,height:122, borderRadius: 10,marginLeft:20,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    
    padding:10,
   
    
   
  },
  textheading:{
color:"#484347", fontSize:15, marginTop:10 ,fontWeight:'bold',marginLeft:30
  },
  subtext:{
     color:"#707070", fontSize:10,width:'60%',marginLeft:20
  },
  boxtext:{
    
    marginLeft:30,marginRight:20,
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
    width: deviceWidth - 60,
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
 
  contentstyleios:{
    width: deviceWidth, height: deviceHeight/2.5, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray'  
  },
  contentstyle:{
    width: deviceWidth, height: deviceHeight/2.5, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray' 
  },
  menustyle:{
    width:30.08, height: 30.08, position:'absolute', left:10 , backgroundColor:'#FFDEDB',marginTop:20,marginLeft:17,
  },
  menustyleandroid:{
    width:30.08, height: 30.08, position:'absolute', left:10 , backgroundColor:'#FFDEDB',marginTop:20,marginLeft:17,
  },
 

};
