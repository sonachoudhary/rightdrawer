import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Platform, View,Dimensions,Image } from "react-native";
import pr from 'pr-unit';

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
  iosnotheading:{
    flexDirection:'row',marginTop:deviceHeight/20
  },
  androidnotheading:{
     flexDirection:'row',marginTop:deviceHeight/30
  },
  iostextfield:{
    color: '#ffffff',fontFamily:'ProximaNova-Regular',height:48,marginTop:-3,paddingTop:0,justifyContent:'center',borderBottomColor:'#313131',borderBottomWidth:0
  },
  androidtextfield:{
     color: '#ffffff',fontFamily:'ProximaNova-Regular',height:48,marginTop:0,paddingTop:8,justifyContent:'center',borderBottomColor:'#313131',borderBottomWidth:0
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary,
  },
  myprofileios:{
  width:deviceHeight/3.5,height:deviceHeight/3.5,zIndex:0,padding:2,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},

myprofileandroid:{
  width:deviceHeight/3.5,height:deviceHeight/3.5,zIndex:0,padding:2,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
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
    justifyContent:'center',
    alignItems:'center',

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
iosnoti:{
  width:deviceWidth-75,justifyContent:'center'
},
acehnoti:{
  width:deviceWidth-90,justifyContent:'center'
},
ioscheckHeader:{
  transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
},
acehckHeader:{
  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
},
iosgender:{
  backgroundColor:'#313131',borderRadius:30,paddingLeft:15,height:48,lineHeight:20,paddingTop:0,borderBottomColor:'#313131',borderBottomWidth:0
},
andgender:{
 backgroundColor:'#313131',borderRadius:30,paddingLeft:15,height:48,lineHeight:20,paddingTop:3,justifyContent:'center',borderBottomColor:'#313131',borderBottomWidth:0
}
};
