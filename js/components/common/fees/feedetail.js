import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions,ScrollView,TextInput, FlatList,TouchableHightLight ,Image,ImageBackground,TouchableOpacity,BackHandler} from "react-native";
import {
  Tab,
  Tabs, 
  ScrollableTab,
  TabHeading,
  Container,
  Header,
  Content,
  Badge,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
  Text,
  Item,
  Title,
  Left,
  Right,
  Label,
  Body,
  Spinner,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setFeedbackData } from "../../../actions/common/booking";
import Modal from "react-native-modal";
import moment from "moment";
const { width } = Dimensions.get("window");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { openChatWindow } from "../../../actions/common/chat";
import Search from 'react-native-search-box';
import  Footernew  from "../../../components/footernew";
import SplashScreen from "react-native-splash-screen";
import config from "../../../../config.js";
import SyncStorage from 'sync-storage';
import RazorpayCheckout from 'react-native-razorpay';
function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    chatlist: state.chat.chatlist,
    user_id: state.driver.user._id,
    username:state.driver.user.student,
    userid:state.driver.user.studentlogin.studentid,
    data:state.driver.user.student,
    userdata: state.driver.user,
  };
}

class Feedetail extends Component { 
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    loadSpinner: PropTypes.bool,
    appointmentlist: PropTypes.array,
    pending_appointment: PropTypes.array,
    archive_appointment: PropTypes.array,
    afterFocus: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      image: null,
      render: false,
      showmodal:false,
      amount:1,
      jwtAccessToken: this.props.jwtAccessToken,
      user_id: this.props.user_id,
      feesdata:[],
     }; 
  }

   componentDidMount() {
     this.getfeeddetail()
    
  }

  getfeeddetail(){
    const storage=SyncStorage.get('feedetail');
    //   const feedetailId =  142;
      fetch(`${config.serverSideUrl}/student/student/fee/detail/${storage}/${this.props.userid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
          
            if(data!=null){
                  this.setState({feesdata:data});
              }
         })
        .catch(e => {

                 
        });         
     
   
  }

  showmodal(){
  this.setState({
     showmodal:true,
     amount: 1
  })
  
}


  renderItem = ({item, index}) => {
    
    var Time=moment(item.created_at).format('hh:mm ddd')
    var Dateval=moment(item.created_at).format('ll')
    return (
      <TouchableOpacity style={{backgroundColor:'#EFF8FA',marginBottom:10, padding:10,width:deviceWidth-30,height:100,borderRadius:10,flexDirection:'row',justifyContent:'space-between',marginLeft:15}}>
           <View>
           <Text style={{padding:10,color:'#000000'}}>{Dateval}</Text>  
            <Text style={{padding:10}}>{Time}</Text>
            
           </View>
           <View>
             <Text style={{padding:10,color:'#86CC8D',fontSize:16}}>Rs {item.amountpaid}</Text> 
              <Text style={{padding:10}}>{item.paymenttype}</Text>
           </View>
        </TouchableOpacity>            
    )
  };

  render() {
    
    var Datevalnew=moment(this.state.feesdata.duedate).format('MMMM, YYYY')
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
             <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: width,  resizeMode:'cover',height:150}}> 
                       <View style={{marginTop:30, flexDirection:'row'}}>
                        <Button transparent onPress={()=>Actions.Fees()}>
                          <Icon
                            name="md-arrow-back"
                            style={{ fontSize: deviceHeight/35, color: "#000" }}
                          /> 
                          <Text style={{color:'#000000',fontSize:22,fontWeight:'bold',marginLeft:30,paddingTop:5}}> Fees</Text>
                                                        
                        </Button>
                       
                      </View>   
                      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginHorizontal:20,alignItems:'center'}}>
                          <Text  style={{ fontSize:18, color: "#484347",fontWeight:'700' }}> Hi, {this.props.username.name}</Text>
                        </View>
                         <View style={{marginLeft:25,marginTop:8,flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{ fontSize:18, color: "#484347",fontWeight:'300' }}>Your {Datevalnew} Fees</Text>
                        
                  <TouchableOpacity onPress={()=>this.showmodal()}>
                    <Text style={{ paddingVertical:5, paddingHorizontal:15, borderRadius:10,backgroundColor:'#000000', color:'#ffffff',marginRight:20, fontSize:16}}>Pay</Text>
                    </TouchableOpacity>
                  </View> 

                        
          </ImageBackground>
          <Content>
              <View style={{justifyContent:'center',alignItems:'center',marginTop:-120}}>
              <View style={{backgroundColor:'#D22D80',width:deviceWidth-30,height:130,borderRadius:10,position:'absolute',zIndex:1001,marginLeft:27}}>
                  <Text  style={{ fontSize:18, color: "#FFFFFF",fontWeight:'700' ,margin:15,marginTop:20}}>Total Amount</Text>
                  <Text  style={{ fontSize:24, color: "#FFFFFF",fontWeight:'700',marginLeft:15,marginTop:0}}> Rs {this.state.feesdata.paid}</Text>
              </View>
              <View style={styles.whitebox}>
                  <View style={{borderRightWidth:1,borderColor:'lightgray',padding:10,justifyContent:'center',alignItems:'center',width:'50%'}}>
                        <Text  style={styles.amounttext,{marginTop:20}}>This Month</Text>
                        <Text  style={styles.amounttext,{marginTop:5}}> Rs {this.state.feesdata.paid}</Text>
                  </View>
                   <View style={{justifyContent:'center',alignItems:'center',padding:10,width:'50%'}}>
                        <Text  style={styles.amounttext,{marginTop:20,color:'#6A6C87'}}>Pending</Text>
                        <Text  style={styles.amounttext,{marginTop:5,color:'#6A6C87',fontWeight:'600'}}>+Rs {this.state.feesdata.due}</Text>
                  </View>
              </View>

              </View>
              <Text style={{ fontSize:18, color: "#000000",fontWeight:'300',marginLeft:30,marginTop:20 }}>History</Text>
              <ScrollView style={{ height:300,marginTop:5,marginBottom:100}}>
               
                <FlatList
                   data={this.state.feesdata.payments}
                   extraData={this.state}
                   renderItem={this.renderItem}
                 />
                
              </ScrollView>
         
         </Content>
         <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}
                onRequestClose={() => {
                this.setState({showmodal:false,amount: 1});
               }}
            >
            <View>
              <View style={{ height:200, borderRadius:30,  borderColor:'#000', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8, shadowRadius: 1,backgroundColor: '#ffffff', }}>
            
            <TouchableOpacity
                 style={{justifyContent:'flex-end',flexDirection:'row',marginTop:20,marginRight:30}}
                 onPress={() => this.setState({showmodal:false,amount: 1})}
            >
              <Image
                   source={require("../../../../assets/images/Group_17138.png")}
                   style={{ width:20, height: 20, borderRadius:20 }}
              />                         
           </TouchableOpacity>
          <View style={{ width:deviceWidth-150, marginLeft:75}}>
                  
                  <TextInput
                    style={{ width:'80%',height:40, borderRadius:10, paddingLeft:10,marginLeft:'2%', borderWidth:1, borderColor:'#dddddd'}}
                    onChangeText={ value => this.setState({ amount: value.replace(/[^0-9]/g, '') })}
                    placeholder="Enter amount to pay"
                    />

                    <TouchableOpacity  onPress={() => {
                          var options = {
                            description: 'School Fees',
                            image: 'https://www.schoolingsmart.com/wp-content/uploads/2021/08/schooling-smart-1.png',
                            currency: 'INR',
                            key: 'rzp_live_OHMMcQhSct6WZA', // Your api key
                            amount: this.state.amount*100,
                            name: 'wesmart',
                            prefill: {
                              email: this.props.data.email,
                              contact: '+91'+this.props.data.phone,
                              name: this.props.data.name
                            },
                            theme: {color: '#F37254'}
                          }
                          RazorpayCheckout.open(options).then((data) => {
                            // handle success
                            fetch(`${config.serverSideUrl}/student/payment/order/complete`, {
                                    method: "POST",
                                    headers: {
                                      Accept: "application/json",
                                      "Content-Type": "application/json",
                                       Cookie:'token='+this.props.jwtAccessToken
                                    },
                                    body: JSON.stringify({
                                         rzp_signature:data.rzp_signature,
                                         rzp_paymentid:data.razorpay_payment_id,
                                         rzp_orderid:data.rzp_orderid,
                                         feeid:data.feeid,
                                         studentid:this.props.studentid,
                                         amountpaid:data.amountpaid,
                                  })

                                  })
                                  .then(resp => resp.json())
                                  .then(data => {
                                   
                                   
                                     
                                  })
                                  .catch(e => {
                                         //alert('something went wrong')
                                  });
                            alert(`Success: ${data.razorpay_payment_id}`);
                          }).catch((error) => {
                            // handle failure
                            this.setState({
                                 showmodal:false,
                                 amount: 1
                              })
                            alert('Payment Failed');
                            //alert(`Error: ${error.code} | ${error.description}`);
                          });
                        }}>
<Text style={{ marginLeft:40,marginTop:50,paddingVertical:5, width:100, textAlign:'center',paddingHorizontal:15, borderRadius:10,backgroundColor:'#000000', color:'#ffffff',marginRight:20, fontSize:16}}>Pay</Text></TouchableOpacity>
    
          </View>

        </View>
        </View>
      </Modal>
          <Footernew/>
         
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setFeedbackData: (data) => dispatch(setFeedbackData(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Feedetail);