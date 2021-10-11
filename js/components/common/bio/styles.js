import commonColor from "../../../../native-base-theme/variables/commonColor";
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosHeader: {
    backgroundColor: commonColor.brandPrimary
  },
  aHeader: {
    backgroundColor: commonColor.brandPrimary,
    borderColor: "#aaa",
    elevation: 3
  },
  savedata:{
    color: "#FF0000", 
    fontWeight: "bold", 
    fontSize: 18, 
    right:10, 
    position:'absolute', 
    top:50,
    width:50
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
   color: "#000000"
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    marginTop: -5,
   color: "#000000"
  },
  profileIcon: {
    alignSelf: "center",
    padding: 10,
    fontSize: 50
  },
  textheadingnewdata:{
     color:"#484347", fontSize:18, marginTop:12,fontWeight:'600',marginLeft:10
  },
  inputContainer: {
    borderWidth: null,
    paddingBottom: 0,
    paddingTop: 0,
    margin: null
  },
  input: {
    paddingBottom: 0,
    flex: 2
  },
  blueBorder: {
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
    borderBottomWidth: 0,
    marginLeft: 10
  },
  itemStyleLebel: {
    color: "#777",
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: "uppercase",
    
  },
  itemStyleText:{
    fontSize:14,
    fontWeight: "600",
    marginLeft: 10, 
    width: deviceWidth - 10
  },
  listcustom: {
    //borderBottomWidth: 2,
    //borderBottomColor: '#ddd',
    marginLeft: 0,
    paddingLeft: 30,
    backgroundColor: '#fff'
  },
  listContainer: {
    flexDirection: 'row'
    // flexWrap: 'no-wrap'
  },
  lextText: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  textColor: {
    color: '#444',
    alignSelf: 'flex-start',
    fontWeight: '400',
    lineHeight:20,
  },
  rightText: {
    // width: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    height: 20
  },
  addressContainer: {
    flexDirection: 'row',
    flex:1,
    paddingLeft:30,    
  },
  rowItemLeft:{
    color: '#444',
    fontWeight: '400',
    width:100,
    lineHeight:40,
    flex:1
  },
  rowItemRight:{
    flex:1,
    color: '#000',
    fontWeight: '400',
    width:150,
    lineHeight:20,
    textAlign:"right",
    paddingRight:10
  },
  fieldContainer:{
    marginTop:10
  },
  fieldContainerText:{
    color: "#000000", fontSize:16, marginTop:10, marginBottom:10, fontFamily:'Cabin-Regular'
  },
  errorTextView:{
    backgroundColor:"#B14C60", width: deviceWidth-60, marginTop:30
  },
  errorText:{
    textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular'
  }
};
