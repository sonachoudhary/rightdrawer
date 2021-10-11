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
  myprofileios:{
  width:deviceWidth-140,height:deviceWidth-140,padding:4,opacity:0.4,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},

myprofileandroid:{
  width:deviceWidth-140,height:deviceWidth-140,padding:4,opacity:0.4,
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
textareaContainer: {
    height: deviceHeight/5.5,
    padding: 5,
    backgroundColor:'#313131',
    borderRadius:10
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 110,
    fontSize: 14,
    padding:10,
    opacity:0.8,
    color: '#ffffff',
  }
};
