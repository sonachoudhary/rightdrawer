import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Platform, View,Dimensions,Image } from "react-native";
import pr from 'pr-unit';
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight= Dimensions.get('window').height; 
export default {
  iosHeader: {
    backgroundColor: '#fff',
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: commonColor.brandPrimary,
  },
  gettopheaderios:{
    justifyContent:'center',alignItems:'center',width:deviceWidth,marginTop:70
  },
  gettopheaderandroid:{
    justifyContent:'center',alignItems:'center',width:deviceWidth,marginTop:30
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary,
  },
  setnewcls:{
    color:'#ffffff',opacity:0.6,fontSize:42*pr,letterSpacing:0.42,marginBottom:5,marginLeft:25*pr,fontFamily:'ProximaNova-Regular'
  },
  nameheda:{
    color:'#ffffff',fontFamily:'ProximaNova-Bold',paddingLeft:10,fontSize:68*pr,marginTop:15,marginBottom:3,textTransform: 'capitalize'
  },
  biodetail:{
    color:'#ffffff',paddingLeft:10,paddingTop:20,paddingRight:30,fontSize:50*pr,lineHeight:30,fontFamily:'ProximaNova-Regular'
  },
  CircleShape:{
    width: 3,
    height: 3,
    borderRadius: 3/2,
    backgroundColor: '#F54462',
    marginBottom:3
  },
  orText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
  },
  regBtnContain: {
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  },
  regBtn: {
    height: 54,
    width:138,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'#1A1A1A',
    marginLeft: '30%',

  },
  regBtn2:{
    height: 44,
    width:138,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'#1A1A1A',
  },
  regBtn1: {
    height: 48,
    width:222,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'#1A1A1A',
    marginLeft: '20%',

  },
  googleLeft: {
  flex: 1,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#B6382C",
  borderBottomLeftRadius: 4,
  borderTopLeftRadius: 4
},
fbLeft: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  height: 50,
  backgroundColor: "#000",
  borderBottomLeftRadius: 4,
  borderTopLeftRadius: 4,
  width:20,
},



container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

      },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
    borderWidth:0,
  },
  list1: {
    flex: 1,
    borderWidth:0,
    height:deviceHeight*2
  },
  contentContainer: {
    width: deviceWidth,
    paddingHorizontal: 0,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    elevation:0,
    marginLeft:2,
    width:deviceWidth,
    borderWidth:0,
    borderColor:'#1A1A1A'
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
  ioscheckHeader:{
      marginTop:5,marginRight:10
  },
  acehckHeader:{
    marginTop:6,marginRight:10
  },
  modalView: {
    alignSelf: 'center',
    width:deviceWidth,
    height:deviceHeight,
    justifyContent:'center',
    alignItems:'center',
    zIndex:1001
  },

};
