import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosHeader: {
    // backgroundColor: "#FCC5C7",
  },
  aHeader: {
    // backgroundColor: "red",
    borderColor: "#FFF",
    elevation: 3,
     justifyContent:'flex-start',
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
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop:5
  },
  textColor: {
    color: '#000',
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize:18,
    lineHeight:20,
    textTransform: 'capitalize'
  },
  msgTextColor: {
    color: '#999',
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize:14,
    lineHeight:20,
    textTransform: 'capitalize'
  },
  dateColor: {
    color: '#444',
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize:16,
    lineHeight:20,
  },
  messagecount:{
    textAlign: 'right',    
  },
  rightText: {
    // width: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  modalView: {
    alignSelf: 'center',
    height:250,
    marginTop:50, 
    width:deviceWidth - 100,
    backgroundColor:"#FFF", 
    padding:20, 
    borderWidth:1,
    borderWidthColor:"#333"    
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
    color: "#000",    
    marginTop: 10,
    marginBottom: 10,
  },
  whitebox:{backgroundColor:'#fff',width:deviceWidth-30,height:150,elevation: 3,shadowColor: '#707070',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,borderRadius:10,
    marginTop:230,flexDirection:'row',

  },

amounttext:{
 fontSize:18, color: "#FFFFFF",fontWeight:'700' ,margin:15
}
}
