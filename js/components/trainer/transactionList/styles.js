import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosLogoContainer: {
    top: deviceHeight / 5,
    alignItems: 'center'
  },
  aLogoContainer: {
    top: deviceHeight / 4.5,
    alignItems: 'center',
    height: deviceHeight / 1.5
  },
  iosHeader: {
    backgroundColor: '#ffffff'
  },
  imagetext:{
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  badge: {                                                                                                                                                                                                         
     backgroundColor: '#000000',                                                                                                                                                                                      
     width: 20,                                                                                                                                                                                                   
     height: 20,                                                                                                                                                                                                  
     left:2,                                                                                                                                                                                                    
     top: 0, 
     borderRadius:20,
     position:'absolute'                                                                                                                                                                                                    
  }, 
  dummytext:{
    marginLeft:10, 
    flex: 1
  },
  viewmoretext:{
    width: 200,
    marginTop:50,
    backgroundColor:'#000000',
    padding:20,
    borderRadius:30,
    alignItems: 'center',
    alignSelf:"center", 
    textAlign:'center',
  },
  trainerheading:{
    color:'#000000',
    fontSize:26,
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 5,
    textTransform: "capitalize"  
  },
  desctext:{
    color:'#999999',
    fontSize:14,
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  desctext3:{
    color:'#999999',
    fontSize:16,
    fontWeight:'bold',
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  desctext1:{
    color:'#00ff00',
    fontSize:14,
    with: 60,

  },
  desctext2:{
    color:'#ff0000',
    fontSize:14,
    with: 60,
  },
  inputgrow:{
    fontWeight: "400",
    marginLeft: 2,
    borderBottomColor: "#999",
    color: "#FF0000",
    alignSelf:"center", 
    textAlign:'center',
    borderTopWidth:1, 
    borderBottomWidth:1, 
    borderColor: '#999',
    width: deviceWidth - 120
  },
  filterdatepicker:{
    flex:1,
    margin:10
  },
  aHeader: {
    backgroundColor: '#ffffff',
  },
  iosHeaderTitle: {
    color: '#000000',
  },
  aHeaderTitle: {
    color: '#000000',
  },
  logoutLogo: {
    color: '#000000',
  },
  logoIcon: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 7,
    borderColor: '#316687',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    marginBottom: 20
  },
  logoText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 30,
    marginTop: -10
  },
  loginBtn: {
    height: 50,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    width: deviceWidth - 100,
    borderColor: commonColor.brandButton,
    backgroundColor: '#5CA8D8'
  },
  serviceBtn: {
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:50
  },
  registerBtn: {
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:100
  },
  trainerBtn: {
    height: 50,
    alignSelf: 'center',
    marginTop:20,
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton
  },
  nameBtn:{
    height: 50,
    alignSelf: 'center',
    marginTop:20,
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton
  },
  experienceButton:{
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:150,
    textAlign:"center",
  },
  listcustom: {
    borderBottomWidth: 2,
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
  textColor: {
    color: '#444',
    alignSelf: 'flex-start',
    fontWeight: '400',
    lineHeight:40,
  },
  rightText: {
    // width: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  pickerStyle:{  
        height: 40,  
        width: deviceWidth,  
        color: '#FF0000',  
        justifyContent: 'center',  
        alignSelf:'center', 
        textAlign:'center',
        borderTopWidth:1,
        borderBottomWidth:1, 
        borderColor: '#999',     
        marginTop:10,
        marginBottom:20    
  },  
  textStyle:{  
        fontSize: 19,  
        color:'#ffffff',
        textAlign: 'center',  

    },  
  completeBtn:{
    height: 50,
    alignSelf: 'center',
    marginTop:50,
    width: deviceWidth - 120,
    backgroundColor: commonColor.brandButton,
    marginBottom:30,
    borderRadius:50
  },
  emptyMessageStyle: {
    textAlign: 'center',
    color: "#000",    
    marginTop: 10,
    marginBottom: 10,
  },
};
