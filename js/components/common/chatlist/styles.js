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
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff"
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
  myprofileios:{
  width:deviceWidth/5.5,height:deviceWidth/5.5,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},

myprofileandroid:{
  width:deviceWidth/5.5,height:deviceWidth/5.5,
  shadowColor: '#ffffff',
  shadowOffset: { width: 0, height:0 },
  shadowOpacity: 1,
  shadowRadius: 3, 
  elevation: 5
},

  regBtn: {
    height: 46,
    width:118,
    borderRadius: 30,
    borderColor:'#F54462',
    borderWidth:3,
    backgroundColor:'#1A1A1A',
    marginTop:32
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
    backgroundColor: "#1A1A1A"
  },
  blueHeader: {
    color: commonColor.lightThemePlaceholder,
    padding: 5,
    fontWeight: "bold"
  },
  itemBox: {
    margintop: 5,
    flex: 1,
    
    marginBottom:20,
    lineHeight:10
  },
  itemLastBox: {
    margintop: 5,
    flex: 1,
    
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
    backgroundColor:"#1A1A1A"
  },
  tabStyle: {
    backgroundColor:"#1A1A1A"
  },
  listcustom: {
    borderColor:'#1A1A1A',
    borderWidth: 0,
    marginLeft: 0,
    marginTop:30,
    paddingLeft: 10,
    backgroundColor: '#1A1A1A'
  },
  listContainer: {
    flexDirection: 'row',
    // flexWrap: 'no-wrap'
  },
  lextText: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 25,
    marginTop:5
  },
  textColor: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    fontFamily:'ProximaNova-Bold',
    fontSize:16,
    lineHeight:20,
    textTransform: 'capitalize'
  },
  msgTextColor: {
    color: '#ffffff',
    opacity:0.6,
    alignSelf: 'flex-start',
    fontFamily:'ProximaNova-Regular',
    width:deviceWidth-200,
    flex:1,
    fontSize:15,
    lineHeight:20,
    textTransform: 'capitalize',
    marginTop:5
  },
  dateColor: {
    color: '#959595',
    alignSelf: 'flex-end',
    fontFamily:'ProximaNova-Regular',
    fontSize:13,
    lineHeight:20,
  },
  messagecount:{
    textAlign: 'right',    
  },
  rightText: {
    // width: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    flex:1,justifyContent: 'flex-end',flexDirection: 'row',paddingRight:5
  },
  modalView: {
    alignSelf: 'center',
    height:250,
    marginTop:50, 
    width:deviceWidth - 100,
    backgroundColor:"#1A1A1A", 
    padding:20, 
    borderWidth:1,
      
  },
  completeBtn:{
    height: 50,
    marginTop:10,
    width: 100,
    backgroundColor: "#F2F2F2",
    marginBottom:20,
    borderRadius:25
  },
  emptyMessageStyle: {
    textAlign: 'center',
    color: "#FFFFFF",    
    marginTop: 30,
    marginBottom: 10,
  },
  mainlogo: {
     width:152,height:160,
     marginTop:30
  },
   sevenhomeheading: {
    textAlign: 'center', // <-- the magic
    fontFamily:'ProximaNova-Bold',
    fontSize: 19,
    color: '#FFFFFF',
    width:deviceWidth-20
  },

  maintitle: {
    color: "#fff",
    fontSize:18,
    marginLeft:20,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  subtitle: {
    color: "#fff",
    fontSize:12,
    marginLeft:20,
    textTransform: 'lowercase'
  },

  loginheading: {
    color: "#fff",
    fontSize:19,
    marginLeft:20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'ProximaNova-Black',
    marginTop:40,
    borderColor:'#F54462',
    justifyContent:'center',
    borderRadius:25,
    borderWidth: 3.5,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:35,
    paddingRight:35,
  },
   registerheading: {
     color: "#fff",
    fontSize:19,
    marginLeft:20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'ProximaNova-Black',
    marginTop:40,
    borderColor:'#F54462',
    justifyContent:'center',
    borderRadius:25,
    borderWidth: 3.5,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:25,
    paddingRight:25,
  },
  iosnot:{
    marginTop:45,marginLeft:10,position:'absolute',right:10
  },
  androidnot:{
     marginTop:30,marginLeft:10,position:'absolute',right:10
  }
};
