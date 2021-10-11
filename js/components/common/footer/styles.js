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
    height: 54,
    width:138,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'transparent',
    marginLeft: '30%',

  },
  regBtn1: {
    height: 48,
    width:222,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'transparent',
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
iosfooter:{
  width: deviceWidth, height: 45, flexDirection:'row', justifyContent:'center', position:'absolute', bottom:60*pr
},
andfooter:{
  width: deviceWidth, height: 35, flexDirection:'row', justifyContent:'center', position:'absolute', bottom:50*pr
}
};