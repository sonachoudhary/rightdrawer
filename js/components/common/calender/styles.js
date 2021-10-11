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
    elevation: 3,
    
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
   width:'90%',marginLeft:20,borderRadius:8,height:46,color:'#000000',padding:5
  },
  textheadingnewdata:{
     color:"#000", fontSize:deviceHeight/35,fontWeight:'bold',width:deviceWidth,paddingTop:5
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

  inputvalue:{

    width:deviceWidth-100,marginLeft:20,marginTop:20,borderRadius:8,height:156,color:'#D7D7D7',borderColor:'lightgray',

  },
  input2:{
     width:deviceWidth-100,marginLeft:20,borderRadius:5,height:40,color:'#D7D7D7',borderColor:'gray',
  },
  savebtn:{
    borderColor:'#2680EB',width:200,height:50,borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center'
  },
  savebtn2:{
    backgroundColor:'#470B63',width:100,height:50,borderWidth:1,borderRadius:5,marginLeft:10,justifyContent:'center',alignItems:'center'
  },
  uncheckassignments:{
    color:'#000',marginLeft:20,marginTop:5,marginBottom:2
  },
  uncheckassignmentsview:{
    borderTopWidth:1,borderColor:'#e6e6e6',backgroundColor:'#FFFEFE',marginTop:0,padding:5
  },
  flatlistview:{
    backgroundColor:'#FFFEFE',borderBottomLeftRadius:20,borderBottomRightRadius: 20,elevation:2
  },
  allview:{
    color:"#000", fontSize:13, marginLeft:10
  },
  resultview:{
    color:'#000',marginLeft:20,marginTop:2,marginBottom:2
  },
  result:{
    flexDirection:'row',justifyContent:'space-between',paddingTop:10
  },
  image:{
    width:25, height: 25, position:'absolute', left:5 ,marginTop:10,color:'#000'
  },
  select:{
    width:"45%",height:50,backgroundColor:'#C4E0FF',marginLeft:10,borderRadius:10,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:5
  },
  select2:{
    width:"45%",height:50,backgroundColor:'#FEE4C9',marginLeft:10,borderRadius:10,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:5
  },
  contentstyleios:{
    width: deviceWidth, height: deviceHeight/3.5, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray'  
  },
  contentstyle:{
    width: deviceWidth, height: deviceHeight/3.5, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray' 
  },
  listtextstyle:{
    marginTop:5,backgroundColor:'#E4E4E4',textAlign:'center',width:'50%', color:'#341F54',padding:15,fontSize:15,
  },
  linebar:{
    width:1,marginTop:5,height:'90%', fontSize:15,backgroundColor:'#E4E4E4',borderWidth:.5, borderColor:'#828282',color:'#828282'
  },
  listtextstyle1:{
    marginTop:5,backgroundColor:'#E4E4E4',textAlign:'center',width:'49%', color:'#341F54',padding:15,fontSize:15
  },
  listtextstyle2:{
    marginTop:5,textAlign:'center',width:'50%', color:'#ffffff',fontSize:17,
  },
  listtextstyle21:{
    marginTop:5,textAlign:'center',width:'49%', color:'#ffffff',fontSize:17
  },
  iosheaderstyle:{
    flexDirection:'row', paddingTop:40 ,backgroundColor:'#341F54',justifyContent:'space-between',alignItems:'center'
  },
  androidheader:{
    flexDirection:'row',backgroundColor:'#341F54',justifyContent:'space-between',alignItems:'center'
  },
  iosbackbtn:{
    flexDirection:'row',marginTop:20
  },
  abackbtn:{
    flexDirection:'row',
  },
  iosresult:{
    height:170,marginTop:0,elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8,
                          shadowRadius: 1,backgroundColor:'#FFF',
                          position:'absolute',top:110,borderRadius:20,
                          justifyContent:'center',alignItems:'center',margin:10
  },
  aresult:{
    height:170,marginTop:10,elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8,
                          shadowRadius: 1,backgroundColor:'#FFF',position:'absolute',top:50,borderRadius:20,justifyContent:'center',alignItems:'center',margin:'5%'
  },
   Smallbox1:{
    width:'100%',height:73,
    marginTop:5,
    marginBottom:5,
    padding:10,
    justifyContent:'center',
    borderBottomWidth:1,borderColor:'#e6e6e6'
  },
  circleios:{
    flexDirection:'row',margin:'5%'
  },
  ccirclestyle:{
    flexDirection:'row',marginTop:'10%',marginLeft:'5%'
  },
  androidassignmentheader:{
    flexDirection:'row',marginTop:'5%'
  },
  iosassignments:{
    flexDirection:'row',marginTop:'8%'
  }
  
};
