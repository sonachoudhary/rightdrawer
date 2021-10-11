import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosHeader: {
    backgroundColor: '#FFFFFF'
  },
  aHeader: {
    backgroundColor: '#FFFFFF',
    borderColor: "#FFF",
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000"
  },
  logoutLogo: {
    color: '#000000',
  },
  dummytext:{
    marginLeft:10, 
    
    flex: 1
  },
  bioselected:{
    color:'#000000',
    fontSize:18,
    borderBottomWidth:1,
    borderBottomColor:'#FF0000'
  },
   bio:{
    marginTop:10,
    marginBottom:10,
    width:deviceWidth-50,
    marginLeft:-10
  },
  desctext:{
    color:'#999999',
    fontSize:14,
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  trainerheading:{
    color:'#000000',
    fontSize:24,
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom:0,
    paddingTop:15
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
  bioheading:{
    color:'#000000',
    fontSize:19,
    marginBottom:10,
   
  },
  bioheadingdata:{
    color:'#999999',
    fontSize:16,
    
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
    borderBottomColor: "#FFF",
    paddingBottom: 0,
    backgroundColor: "#f8f8f8"
  },
  blueHeader: {
    color: commonColor.lightThemePlaceholder,
    padding: 5,
    fontWeight: "bold"
  },
  itemBox: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: "stretch",
    borderBottomWidth: 0,
    marginLeft: 10
  },
  itemLastBox: {
    margintop: 5,
    flex: 1,
    borderBottomWidth:0,
    marginBottom:20,
    lineHeight:10,
    padding: 15,
  },
  label: {
    color: "#777",
    fontWeight: 'bold',
    fontSize: 18,    
    marginBottom: 10,
    marginTop: 5
  },
  screenButton:{
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:20,
    marginBottom:20,
    textAlign:"center",
    borderRadius: 25,
  },
  tabBackground:{
    backgroundColor:"#FFFFFF"
  },
  tabStyle: {
    backgroundColor:"#FFFFFF"
  },
  textstack:{
    color: "#999",
    fontSize:16,
    fontWeight: "600",
  },
  listcustom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopWidth: 0,
    marginLeft: 0,
    paddingLeft: 15,
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
  outerDiv:{
    
  },
  emptyMessageStyle: {
    textAlign: 'center',
    color: "#000",
    marginTop: deviceHeight/3
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
    fontSize: 22,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 5
  },
  itemStyleText:{
    color: "#999",
    fontSize: 16,
  }
};
