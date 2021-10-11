import commonColor from "../../../../native-base-theme/variables/commonColor";
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
  iosHeader: {
    backgroundColor: commonColor.brandPrimary,
    marginTop:30,
  },
  aHeader: {
    backgroundColor: commonColor.brandPrimary,
    borderColor: "#aaa",
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
   color: "#fff"
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
   color: "#fff"
  },
  profileIcon: {
    alignSelf: "center",
    padding: 10,
    fontSize: 50
  },
  inputContainer: {
    borderWidth: null,
    paddingBottom: 0,
    paddingTop: 0,
    margin: null
  },
  input: {
    // paddingBottom: 0,
    flex: 2
  },
  textheadingnewdata:{
     color:"#484347", fontSize:24, marginTop:12,fontWeight:'600',marginLeft:10
  },
  blueBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEEFEF",
    paddingBottom: 0,
    backgroundColor: "#F2F2F2"
  },
  blueHeader: {
    color: "#000",
    padding: 5,
    fontWeight: "bold"
  },
  itemStyle:{
    marginHorizontal: 10,
    flex: 1,
    alignItems: "stretch",
    flexDirection:'row',
    borderBottomWidth: 0,
    marginLeft: 10
  },
  itemStyleLebel: {
    color: "#777",
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 5,
    width:150
  },
  editdata:{
    color: "#FF0000", 
    fontWeight: "bold", 
    fontSize: 18, 
    right:10, 
    position:'absolute', 
    top:50
  },
  itemStyleText:{
    fontSize:14,
    fontWeight: '600',
    color: "#999",
    marginBottom: 5,
    marginTop: 10
  },
  Smallbox:{
    backgroundColor:'#ffff',width:66,height:60, borderRadius: 10,marginLeft:20,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginTop:10,
    margin:20,
    padding:10,
   
    
    justifyContent:'center',
    alignItems:'center'
  },
   textheading:{
     color:"#484347", fontSize:15, marginTop:10 ,fontWeight:'600'
  },
  subtext:{
     color:"#707070", fontSize:12,fontWeight:'bold',width:'60%',
  },

  input:{

    width:370,marginLeft:20,marginTop:20,borderRadius:8,height:46,color:'#D7D7D7',

  },
  input2:{
     width:300,marginLeft:20,borderRadius:5,height:40,color:'#D7D7D7',borderColor:'gray',
  },
  savebtn:{
    borderColor:'#2680EB',width:200,height:50,borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center'
  },
  savebtn2:{
    backgroundColor:'#470B63',width:100,height:50,borderWidth:1,borderRadius:5,marginLeft:10,justifyContent:'center',alignItems:'center'
  },
   contentstyleios:{
    width: deviceWidth, height: 100, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray'  
  },
  contentstyle:{
    width: deviceWidth, height: 100, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray' 
  }
};
