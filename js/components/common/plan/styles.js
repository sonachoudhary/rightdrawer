import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Platform, View,Dimensions,Image } from "react-native";
import pr from 'pr-unit';
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight= Dimensions.get('window').height; 
export default {
  firstview:{
    flexDirection:'row',
   justifyContent:'space-between',marginLeft:'2%',marginRight:'2%',
  },
  headerview:{
    backgroundColor:'#ed1e79',
    padding:'2%',
  },
  text:{
    fontSize:24,color:'#fff'
  },
  normaltext:{
    fontSize:18,color:'#000',fontWeigth:'bold'
  },
   normaltext2:{
    fontSize:14,color:'red',fontWeigth:'bold'
  },
  btn:{
    backgroundColor:'#f0ad4e',justifyContent:'center',alignItems:'center',
  }

};
