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
  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    minHeight:250,
  },
  outerand:{ 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    
    marginBottom:10,
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
  topouter:{
    flexDirection:'row', marginBottom:15,backgroundColor:'#ed1e79',paddingTop:50,paddingBottom:10
  },
  topouterand:{
    flexDirection:'row', marginBottom:15,backgroundColor:'#ed1e79',paddingTop:20,paddingBottom:10
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    marginLeft: 10,
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    marginTop: -5,
    color: "#fff",
    marginLeft: 5,
  },
  
  messages: {
    flex: 1,
    height: deviceHeight - 100,
    marginRight:5,
    backgroundColor:'#ed1e79',
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    backgroundColor:'#ed1e79',
    paddingLeft:18,
    paddingTop:10,
    paddingBottom:10,
    marginBottom:5,
    paddingRight:10,
    justifyContent: 'flex-end',
  },
  inputBarand:{
    flexDirection: 'row',
    backgroundColor:'#ed1e79',
    paddingLeft:18,
    paddingTop:10,
    paddingBottom:10,
    justifyContent: 'flex-end',
    paddingRight:10,

  },
  textBox: {
    borderRadius: 25,
    backgroundColor:'#ffffff',
    color:'#ed1e79',
    flex: 1,
    width:deviceWidth-150,
    fontSize: 16,
    paddingTop:10,
    justifyContent:'center',
    paddingLeft:20,
    paddingRight:20,
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
  },

  //MessageBubble

  messageBubble: {
      borderRadius: 10,
      marginTop: 28,
      marginRight: 10,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 2,    
      maxWidth:deviceWidth-100
  },

  messageBubbleLeft: {
    backgroundColor: '#FFFFFF',
    borderWidth:1,
    borderColor:'#484848',
    paddingRight:30,
    

  },

  messageBubbleTextLeft: {
    color: '#ed1e79',
    paddingHorizontal:10,
    fontFamily:'ProximaNova-Regular',
    paddingVertical:10,
    fontSize:15,
    
  },

  messageBubbleRight: {
    backgroundColor: '#FFFFFF',
    paddingRight: 10,
    fontSize:15,
    
  },

  messageBubbleTextRight: {
    color: '#ed1e79',
    fontFamily:'ProximaNova-Regular',
    padding: 10,
  },
  headerPicView: {
    flex:1,
    width:40,    
  },
  headerUserPic: {
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 25,
    paddingLeft:10,
  },
  showmessageBubble:{
    color: '#ed1e79',
    fontSize:15,
    
  },
  showmessageBubble1:{
    color: '#ed1e79',
    fontSize:13,
    opacity:0.5
  },
  iosHeader: {
    backgroundColor: "#1A1A1A"
  },
  aHeader: {
    backgroundColor: "#1A1A1A",
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
  
  mainlogo: {
     width:132,height:150,
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
    fontFamily:'ProximaNova-Bold',
    textTransform: 'capitalize'
  },

  subtitle: {
    color: "#fff",
    fontSize:13,
    fontFamily:'ProximaNova-Regular',
    marginLeft:20,
    marginTop:10,
    textTransform: 'lowercase',
    fontWeight:'600'
  },

  loginheading: {
    color: "#fff",
    fontSize:19,
    marginLeft:20,
    textAlign: 'center',
    marginTop:40,
    borderColor:'#F54462',
    fontFamily:'ProximaNova-Black',
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
    fontFamily:'ProximaNova-Black',
    textAlign: 'center',
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
   notificationtitle: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop:-50
  },

   notificationtab: {
   backgroundColor:'#484848',
    borderWidth:1,
    borderColor:'#484848',
    borderRadius:5,
    padding:20,
    marginTop:10,
  },

  tabdate: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'right'
  },
  tabtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft:15
  },
  tabsubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop:10,
    marginLeft:15,
    marginBottom:10
  },
  chatright: {
    fontSize: 16,
    alignSelf: 'flex-end',
    backgroundColor : '#F54462',
    width: 230,
    padding:20,
    borderRadius:12,
    borderWidth:1,
    borderColor: '#F54462',
    marginTop:20,
    marginRight:15
  },
  chatleft: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor : '#484848',
    width: 230,
    padding:20,
    borderRadius:12,
    borderWidth:1,
    borderColor: '#484848',
    marginLeft:15,
  },
  chatdate: {
    color: "#fff",
    fontSize:19,
    marginLeft:20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:40,
    borderColor:'#000',
    borderRadius:25,
    borderWidth: 2,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:35,
    paddingRight:35,
  },
  tabdateleft: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft:90,
    marginTop:-12
  },
  
  
  chattitle: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop:-50
  },
  headtitle: {
    color: "#fff",
    fontSize:18,
    marginLeft:20,
    fontWeight: 'bold',
    marginTop:12,
    marginLeft:18
  },

  subheadtitle: {
    color: "#fff",
    fontSize:14,
    marginLeft:20,
    marginLeft:15,
    color:'#959595'
  },
   errorTextView:{
    backgroundColor:"#B14C60", width: deviceWidth-60, marginTop:30
  },
  errorouterTextView:{
    width: deviceWidth,justifyContent:'center',alignItems:'center'
  },
  errorText:{
    textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14
  },
  rightIcon:{
    marginTop:5,
    paddingTop:10
  },
  setcenter:{
    justifyContent:'center',
    alignItems:'center',
    width:deviceWidth-20,
    marginTop:20,
    marginBottom:0
  },
  datetext:{
    borderRadius:18,
    borderWidth:0.5,
    borderColor:'#000',
    paddingVertical:8,
    paddingHorizontal:40,
    width:'auto'
  }
};
