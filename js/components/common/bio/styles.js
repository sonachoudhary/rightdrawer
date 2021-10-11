import commonColor from "../../../../native-base-theme/variables/commonColor";
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosHeader: {
     backgroundColor: '#ffffff',
    borderBottomWidth:0,
    borderBottomColor:'#ffffff',
    borderTopWidth:1,
    borderTopColor:'#E1E1E1',marginTop:40,paddingTop:-30
  },
  aHeader: {
     backgroundColor: '#ffffff',
    borderBottomWidth:0,
    borderBottomColor:'#ffffff',
    borderTopWidth:1,
    borderTopColor:'#E1E1E1',marginTop:40,paddingTop:-30,
    elevation: 0
  
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
    marginLeft: 20,
    marginBottom:30,
  },
  itemStyleLebel: {
    color: "#000000",
    fontSize: 18,
    textTransform: "capitalize",
    marginBottom:0,
    width:'100%'
  },
  itemStyleText:{
    fontSize:17,
    paddingLeft:5,
    color: "#FF0000",
  },
  listcustom: {
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
    color: '#FF0000',
    alignSelf: 'flex-start',
    fontWeight: '400',
    lineHeight:20,
    fontSize:16,
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
    paddingLeft:5,    
  },
  rowItemLeft:{
    color: '#FF0000',
    fontWeight: '400',
    width:100,
    lineHeight:40,
    flex:1,
    fontSize:16
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
};
