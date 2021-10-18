import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Platform, View,Dimensions,Image } from "react-native";
import pr from 'pr-unit';
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight= Dimensions.get('window').height; 
export default {
  boxmain:{
    flexDirection:'row',
    justifyContent:'space-between',margin:'1%'
  },
  titletext:{
    color:'#ed1e79',fontSize:18
  },
  desctext:{
    color:'#000',fontSize:18,width:'70%'
  },
  img:{
   elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderWidth:4,borderColor:'#e6e6e6'
  },
  datetext:{
    color:'#000',fontWeight:'bold',paddingLeft:5
  },
  Readmore:{
    fontSize:24,color:'#327da8',paddingLeft:5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

};
