import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  
  head:{
    marginTop:'5%',
  },
  ios:{
   marginTop:'8%',
  },
   text:{textAlign: 'center', color: "#000", backgroundColor:'#fff',flex:1,marginTop:60,},
   text2:{flexDirection:'row',justifyContent:'space-between'},
   box:{
    backgroundColor:'#ffff',
    width:'90%',
    height:130, 
    borderRadius: 10,
    marginLeft:20,
    marginRight:20,
    zIndex:1002 ,
    elevation: 5,
    shadowColor: '#e6e6e6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1.1,
    shadowRadius: 1,
    flexDirection:'row',
    justifyContent:'space-between', 
    padding:5,position:'absolute',top:160,
  },
   Smallbox:{
    backgroundColor:'#ffff',height:deviceWidth/7.5, width:deviceWidth/7.5, borderRadius: 10,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    textAlign:'center',
    marginVertical:10,
    marginLeft:15,
    padding:10,
    flexDirection:'row',
   
    
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
   color:"#484347", fontSize:15,fontWeight:'600',textAlign:'center',
  },
  subtext:{
     color:"#000", fontSize:12,fontWeight:'600',textAlign:'center',marginTop:10
  },
  subtext2:{
     color:"#000", fontSize:9,fontWeight:'300',width:'60%',marginLeft:30
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
  contentstyleios:{
    flexDirection:'row',justifyContent:'space-between',marginTop:deviceHeight/20,marginLeft:20,marginRight:20,
  },
  contentstyle:{
    flexDirection:'row',justifyContent:'space-between',marginTop:10,marginLeft:20,
  }
  
};
