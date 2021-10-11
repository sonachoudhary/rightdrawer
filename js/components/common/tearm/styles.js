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
   text:{textAlign: 'center', color: "#000", backgroundColor:'#fff',flex:1,marginTop:60,},
   text2:{flexDirection:'row',justifyContent:'space-between'},
   box:{
    backgroundColor:'#ffff',width:'90%',height:150, borderRadius: 10,position:'absolute',top:180,marginLeft:20,marginRight:20,zIndex:1002 ,elevation: 5,shadowColor: '#000',
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
  Smallbox2:{
    backgroundColor:'#FEE4C8',width:200,height:122, borderRadius: 10,marginLeft:20,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    
    padding:10,
   
    
   
  },
  textheading:{
color:"#484347", fontSize:15, marginTop:10 ,fontWeight:'600',marginLeft:30
  },
  subtext:{
     color:"#707070", fontSize:12,fontWeight:'bold',width:'60%',marginLeft:30
  },
  boxtext:{
    
    marginLeft:30,marginRight:20,
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
  rowItemLeft:{
    color: '#444',
    fontWeight: '400',
    width:100,
    lineHeight:40,
    flex:1
  },
  rowItemLeft1:{
    color: '#444',
    fontWeight: '400',
    width:80,
    lineHeight:40,
    
  },
  rowItemRight1:{
    
    color: '#000',
    fontWeight: '400',
    width:150,
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
    paddingLeft:10,
    borderWidth:1,
    
    borderRadius:3,
    height:40
  },
  fieldContainer:{
    marginTop:10
  },
  fieldContainerText:{
    color: "#E8E8E8", fontSize:16, marginTop:10, marginBottom:10
  },
  input1:{
    paddingLeft:0,
    textTransform: 'capitalize'
  },
  phoneinut:{
    paddingLeft:0,
    color:'#000000'
  },
  errorTextView:{
    backgroundColor:"#B14C60", width: deviceWidth-60, marginTop:30
  },
  errorText:{
    textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14
  }
};
