import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosHeader: {
    flexDirection:'row',marginBottom:10,marginTop:'5%'
  },
  aHeader: {
    flexDirection:'row',marginBottom:10
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
    marginTop:20,
    marginBottom: 20,
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
  rowItemRight:{
    borderRadius:10
  },
  renderitem:{
   width:330.13,height:148,marginLeft:30,marginTop:10,borderRadius:20,elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  input:{

    width:'90%',marginLeft:20,marginTop:20,borderRadius:8,height:46,color:'#D7D7D7',

  },
  input1:{

    width:'90%',marginLeft:20,marginTop:20,borderRadius:8,height:96,color:'#D7D7D7',

  },
  contentstyleios:{
    width: deviceWidth, height:100, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray'  
  },
  contentstyle:{
    width: deviceWidth, height: 100, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray' 
  }
};
