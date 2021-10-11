import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Platform, View,Dimensions,Image } from "react-native";

const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 
import pr from 'pr-unit';

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
    width: deviceWidth,justifyContent:'center',alignItems:'center',marginTop:105
  },
  gettopheaderandroid:{
    width: deviceWidth,justifyContent:'center',alignItems:'center',marginTop:55
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
    width:deviceWidth
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
 myprofileios:{
  width:(deviceWidth-40)*2.6*pr,height:(deviceWidth-40)*2.6*pr,zIndex:1001,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},

myprofileandroid:{
  width:(deviceWidth-40)*1.8*pr,height:(deviceWidth-40)*1.8*pr,zIndex:0,padding:2,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},
  regBtn1: {
    height: 120*pr,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'#1A1A1A',
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

customStyle:{
  width:deviceWidth-100,height:(deviceHeight-deviceHeight/2)/1.5,borderRadius:deviceWidth-100/2
},
style:{
  width:deviceWidth-100,height:(deviceHeight-deviceHeight/2)/1.5,borderRadius:deviceWidth-100/2
},
backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: '#000000'
  },
  logo: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: 160,
    height: 52
  },
  backdrop: {
    flex:1,
    flexDirection: 'column'
  },
  headline: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white'
  }

};
