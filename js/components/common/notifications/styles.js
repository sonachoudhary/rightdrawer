import commonColor from '../../../../native-base-theme/variables/commonColor';
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
    borderColor: "#FFF",
    elevation: 3
  },
  messagedata:{
    color: "#000", marginTop:20, textAlign:"center" ,
    width: deviceWidth - 140,
    marginLeft: deviceWidth/5,
    marginRight:10
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff"
  },
  gettopheaderios:{
    flexDirection:'row',marginTop:56
  },
  gettopheaderandroid:{
    flexDirection:'row',marginTop:16
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
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
    margintop: 5,
    flex: 1,
    borderBottomWidth:0,
    marginBottom:20,
    lineHeight:10
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
    marginBottom:15,
    color:'#000000'
  },
  screenButton:{
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:50,
    textAlign:"center",
    borderRadius: 25,
  },
  tabBackground:{
    backgroundColor:"#FFFFFF"
  },
  tabStyle: {
    backgroundColor:"#FFFFFF"
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
    flexDirection:"row",
  },
  feedDiv: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    color: '#444',
    fontWeight: '400',
    marginLeft: 10,
    marginRight: 30,
    textAlign:'left',
    padding:5,    
  },
  timeSpan: {
    marginLeft: 0, 
    paddingLeft:10,
    width: deviceWidth,
    fontWeight: '400',
  },
  modalView: {
    alignSelf: 'center',
    height:deviceHeight,
    marginTop:0, 
    width:deviceWidth,
    backgroundColor:"#FFF", 
    //padding:20, 
    borderWidth:1,
    borderWidthColor:"#333"    
  },
  completeBtn: {
    height: 50,
    marginTop:10,
    width: 100,
    backgroundColor: "#F2F2F2",
    marginBottom:20,
    borderRadius:25
  },
  deleteBtn: {
    height: 50,
    marginTop:20,
    width: 150,
    backgroundColor: "#FF0000",
    marginBottom:10,
    borderRadius:25,
    alignSelf: 'center'
  },

  cancelBtn: {
    height: 50,
    marginTop:10,
    width: 150,
    backgroundColor: "#000000",
    marginBottom:20,
    borderRadius:25,alignSelf: 'center'
  },
  emptyMessageStyle: {
    textAlign: 'center',
    color: "#FFFFFF",
    marginTop: deviceHeight/3
  },
  notification: {
    flex: 1, 
    width: deviceWidth - 150
  },
  boldnotification:{
    flex: 1, 
    width: deviceWidth - 150,
    fontWeight:'500'
  },
  notificationtitle: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop:-50,
    paddingLeft:100
  },

  notificationtab: {
    backgroundColor:'#484848',
    borderWidth:1,
    borderColor:'#484848',
    borderRadius:5,
    paddingTop:10,
    paddingLeft:25,
    paddingRight:20,
    paddingBottom:10,
    height:90,
  },

  tabdate: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'right',
    fontFamily:'ProximaNova-Regular'
  },
  tabtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily:'ProximaNova-Bold',
    marginLeft:15
  },
  tabsubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily:'ProximaNova-Regular',
    opacity:0.6,
    marginTop:10,
    marginLeft:15,
    marginBottom:10
  },

};