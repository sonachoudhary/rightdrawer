import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosHeader: {
    backgroundColor: '#FCC5C7'
  },
  aHeader: {
    backgroundColor: '#FCC5C7',
    borderColor: "#FFF",
    elevation: 3
  },
  outer: {
     flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
  },
  iosHeaderTitle: {
    fontSize: 24,
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
    height: deviceHeight-170,
    marginRight:10
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
     borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
     marginHorizontal: 15,
    // paddingVertical: 3,
    
  },

  textBox: {
   
    flex: 1,
    fontSize: 16,
    
    fontFamly:'Cabin,Regular',
    color: '#000000',

  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    padding:7,
    position:'absolute',
    right:45,
    bottom:0,
    // marginTop:6,
   
  },
  sendButton1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    padding:7,
    position:'absolute',
    right:15,
    bottom:0
  },
  //MessageBubble

  messageBubble: {
      borderRadius: 10,
      marginTop: 8,
      marginRight: 0,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,    
      height:'auto',
      maxWidth: '80%',  
      minHeight: 'auto',     
      justifyContent:'center',alignItems:'center',

  },

  messageBubbleLeft: {
    backgroundColor: '#470B63',

  },

  messageBubbleLeft2: {
    backgroundColor: '#FB97AF',

  },

  messageBubbleTextLeft: {
    color: '#FFFFFF', fontSize:14, fontFamily:'Cabin-Regular',
    maxWidth:deviceWidth-100
  },

  messageBubbleTextLeft1: {
    color: '#ffffff', fontSize:14, fontFamily:'Cabin-Regular'
  },
  messageBubbleRight: {
    backgroundColor: '#FB97AF',
    paddingRight: 10,
  },
   messageBubbleRight2: {
    backgroundColor: '#470B63',
    paddingRight: 10,
  },

  messageBubbleTextRight: {
    color: '#FFFFFF',
    paddingRight: 30,
    fontSize:14, fontFamily:'Cabin-Regular',
    maxWidth:deviceWidth-200
  },
  messageBubbleTextRight1: {
    color: '#FFFFFF',
    paddingRight: 30,
    fontSize:14, fontFamily:'Cabin-Regular'
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
    color: '#000',
    fontSize:10
  }
};
