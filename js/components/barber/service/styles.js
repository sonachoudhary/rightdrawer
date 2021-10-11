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
    paddingBottom: 0,
    flex: 2
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
  phoneinut:{
    paddingLeft:0,
    color:'#000000'
  },
  errorTextView:{
    backgroundColor:"#B14C60", width: deviceWidth-60, marginTop:30, marginLeft:30, marginRight:30
  },
  errorText:{
    textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular'
  },
  input:{
    paddingLeft:10,
    borderWidth:1,
    borderRadius:3,
    height:40,
    width: deviceWidth-60,
    marginLeft:30,
    marginRight:30
  },
  fieldContainer:{
    marginTop:10
  },
  fieldContainerText:{
    color: "#E8E8E8", fontSize:16, marginBottom:10, marginLeft:30, marginTop:20
  },
  input1:{
    paddingLeft:0,
    textTransform: 'capitalize'
  },
  phoneinut:{
    paddingLeft:0,
    color:'#000000'
  },
};