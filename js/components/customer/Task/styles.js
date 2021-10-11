

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
  iosbackgroundimage:{
    width: deviceWidth, height: deviceHeight/3, resizeMode:'cover',
  },
  abackgroundimage:{
    width: deviceWidth, height: deviceHeight/3, resizeMode:'cover',
  },
   text:{textAlign: 'center', color: "#000", backgroundColor:'#fff',flex:1,marginTop:20,borderTopLeftRadius:20,borderTopRightRadius: 20,},
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
    color:"#000000", fontSize:15, marginTop:12 ,fontWeight:'600',marginLeft:30,width:deviceWidth/3
  },
  textheading2:{
    color:"#000000", fontSize:15, marginTop:8 ,fontWeight:'100',marginLeft:30
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
  list1:{
    backgroundColor:"#FFDCD6",
    margin:10,
    width:deviceWidth/1.1,
    height:90,
    borderRadius:10,flexDirection:'row'
  },
  innnerlist:{
    justifyContent:'center',
     width:80,
     alignItems:'center',
     borderRightWidth:1,
     borderRightColor:'lightgray'
  },
  textstyle:{
    color:"#000000", fontSize:12, marginTop:12 ,fontWeight:'600',marginLeft:10,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingHorizontal: 15,
    height:700,
    marginTop:100,
    marginBottom:100,
    borderRadius:30,

  },
  input:{

    borderRadius:8,height:146,color:'#D7D7D7',
    justifyContent:'flex-start',
    alignItems:'flex-start',
   
    marginLeft:20,
    marginRight:20,
   


  },
  chk1:{
    width:35,backgroundColor:'#FF9800',height:35,borderRadius:25,margin:5,borderColor:'#FF9800'
  },
  chk11:{
    width:35,backgroundColor:'#ffffff',height:35,borderRadius:25,margin:5,borderColor:'#FF9800',borderWidth:1
  },
  chk2:{
    width:35,backgroundColor:'#53B958',height:35,borderRadius:25,margin:5,borderColor:'#53B958'
  },
  chk21:{
    width:35,backgroundColor:'#ffffff',height:35,borderRadius:25,margin:5,borderColor:'#53B958',borderWidth:1
  },
  chk3:{
    width:35,backgroundColor:'#007BFF',height:35,borderRadius:25,margin:5,borderColor:'#007BFF'
  },
  chk31:{
    width:35,backgroundColor:'#ffffff',height:35,borderRadius:25,margin:5,borderColor:'#007BFF',borderWidth:1
  },
  chk4:{
    width:35,backgroundColor:'#E83E8C',height:35,borderRadius:25,margin:5,borderColor:'#E83E8C'
  },
  chk41:{
    width:35,backgroundColor:'#ffffff',height:35,borderRadius:25,margin:5,borderColor:'#E83E8C',borderWidth:1
  },
  chk5:{
    width:35,backgroundColor:'#D80B4E',height:35,borderRadius:25,margin:5,borderColor:'#D80B4E'
  },
  chk51:{
    width:35,backgroundColor:'#ffffff',height:35,borderRadius:25,margin:5,borderColor:'#D80B4E',borderWidth:1
  },
  iostoday:{
    backgroundColor:'#fff',borderTopLeftRadius:20,borderTopRightRadius:20,position:'absolute',top:150
  },
  atoday:{
    backgroundColor:'#fff',borderTopLeftRadius:20,borderTopRightRadius:20,position:'absolute',top:120
  },
  contentstyleios1:{ flexDirection:'row', marginTop:'15%' ,backgroundColor:'#FFFFFF',justifyContent:'space-between',alignItems:'center'},
  contentstyle1:{
    flexDirection:'row', marginTop:'10%' ,backgroundColor:'#FFFFFF',justifyContent:'space-between',alignItems:'center'
  }
};
