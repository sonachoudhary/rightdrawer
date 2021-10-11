import commonColor from "../../../../native-base-theme/variables/commonColor";
const React = require('react-native');
const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
  iosHeader: {
    backgroundColor: '#ffd3ca'
  },
  aHeader: {
    backgroundColor: '#ffd3ca',
    borderColor: "#aaa",
    elevation: 3,

  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
   color: "#000000"
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
  // input: {
  //   paddingBottom: 0,
  //   flex: 2
  // },
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
    backgroundColor:'#FFCB7F',width:155,height:83, borderRadius: 10,marginLeft:20,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginTop:5,
    marginBottom:5,
    padding:5,
   
    
    justifyContent:'center',
   
  },
  Smallbox1:{
    width:'100%',height:73,
    marginTop:5,
    marginBottom:5,
    padding:10,
    justifyContent:'center',
    borderBottomWidth:1,borderColor:'#e6e6e6'
  },
   textheading:{
     color:"#484347", fontSize:18, marginTop:10 ,fontWeight:'600',
  },
  subtext:{
     color:"#707070", fontSize:12,fontWeight:'bold',width:'100%',height:'50%',margin:10
  },
  subtextheead:{
     color:"#707070", fontSize:20,fontWeight:'bold',width:'100%',
  },
  subtextnew:{
     color:"#707070", fontSize:12,fontWeight:'bold',width:'60%',
  },
textheading1:{
     color:"#484347", fontSize:20,fontWeight:'600',marginLeft:0,marginTop:10, width:deviceWidth, justifyContent:'center', textAlign:'center'
  },
  textheadingnewdata:{
     color:"#000", fontSize:deviceHeight/38, marginTop:10,fontWeight:'bold',marginLeft:10,width:deviceWidth/2
  },
  input:{

    width:370,marginLeft:20,marginTop:20,borderRadius:8,color:'#D7D7D7',

  },
  input2:{
     width:300,marginLeft:20,borderRadius:5,height:40,color:'#D7D7D7',borderColor:'gray',
  },
  iosview:{
    flexDirection:'row',justifyContent:'space-between'
  },
  aview:{
    flexDirection:'row',justifyContent:'space-between',marginLeft:-100
  }
};
