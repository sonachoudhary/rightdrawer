import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
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
     width:130, 
     height: 200,
     marginTop:30
  },
   sevenhomeheading: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    color: '#FFFFFF',
    lineHeight: 30,
    width:deviceWidth-80
  },

  maintitle: {
    color: "#fff",
    fontSize:18,
    marginLeft:20,
    fontWeight: 'bold',
  },

  subtitle: {
    color: "#fff",
    fontSize:12,
    marginLeft:20
  },

  loginheading: {
    color: "#fff",
    fontSize:19,
    marginLeft:20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:40,
    borderColor:'#F54462',
    borderRadius:25,
    borderWidth: 5,
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
    marginTop:40,
    borderColor:'#F54462',
    borderRadius:25,
    borderWidth: 5,
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
    borderColor:'#FFFFFF',
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
  inputbar: {
    backgroundColor:'#373737',
    padding:15,
    borderRadius:30,
    width:330,
    marginLeft:20
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
};
