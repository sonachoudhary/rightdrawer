import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Platform, View,Dimensions,Image } from "react-native";

const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 

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
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary,
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
    height: 46,
    width:118,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'#1A1A1A',
    marginTop:32
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
iosmarginHeader:{
  width: deviceWidth, justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:55 
},
andmarginHeader:{
  width:deviceWidth,justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:40
},
myprofileios:{
  width:deviceHeight/3,height:deviceHeight/3,zIndex:1001,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},

myprofileandroid:{
  width:deviceHeight/3,height:deviceHeight/3,zIndex:0,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},
mainlogo: { 
     width:70,height:70,
     marginTop:10
  },
   sevenhomeheading: {
    textAlign: 'center',
    fontFamily:'ProximaNova-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    width:deviceWidth-20
  },

  maintitle: {
    color: "#fff",
    fontSize:18,
    marginLeft:20,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  subtitle: {
    color: "#fff",
    fontSize:12,
    marginLeft:20,
    textTransform: 'lowercase'
  },

  loginheading: {
    color: "#fff",
    fontSize:19,
    marginLeft:20,
    fontFamily:'ProximaNova-Black',
    textAlign: 'center',
    marginTop:40,
    borderColor:'#F54462',
    justifyContent:'center',
    borderRadius:26,
    borderWidth: 3.5,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:35,
    paddingRight:35,
  },
   registerheading: {
     color: "#fff",
    fontSize:19,
    marginLeft:20,
    fontFamily:'ProximaNova-Black',
    textAlign: 'center',
    justifyContent:'center',
    marginTop:40,
    borderColor:'#F54462',
    borderRadius:26,
    borderWidth: 3.5,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:25,
    paddingRight:25,
  },
  iosnot:{
    marginTop:50,marginLeft:10,position:'absolute',right:10
  },
  androidnot:{
     marginTop:40,marginLeft:10,position:'absolute',right:10
  },
  iosnotheading:{
    marginTop:55,width: deviceWidth-100,paddingLeft:100,justifyContent:'center',alignItems:'center'
  },
  androidnotheading:{
     marginTop:35,width: deviceWidth-100,paddingLeft:100,justifyContent:'center',alignItems:'center'
  },
  iosnotheadingicon:{
    marginTop:45,marginLeft:10,position:'absolute',right:10
  },
  androidnotheadingicon:{
     marginTop:25,marginLeft:10,position:'absolute',right:10
  },
  iosnotimage:{
    marginTop:deviceHeight/12,justifyContent:'center',alignItems:'center'
  },
  androidnotimage:{
      marginTop:deviceHeight/12,justifyContent:'center',alignItems:'center'
  },
  imagebottomios:{
    width: deviceWidth,justifyContent:'center',alignItems:'center',marginTop:55
  },
  imagebottomandroid:{
    width: deviceWidth,justifyContent:'center',alignItems:'center',marginTop:25
  }
};
