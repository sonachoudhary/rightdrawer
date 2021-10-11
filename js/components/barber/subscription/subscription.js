import { Actions, ActionConst } from "react-native-router-flux";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo,
  AsyncStorage,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Item,
  Body,
  Toast,
  Spinner,
  Thumbnail,
  Grid,
  Col,
  ListItem,
  Radio
} from "native-base";
import PropTypes from "prop-types";

import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { connectionState } from "../../../actions/network";

import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { selectRole } from '../../../actions/common/register';
import { updateSubscription } from '../../../actions/common/all';

const password = 'fa5190ad405247518bd9d458d4c05455';
//import * as RNIap from 'react-native-iap';

import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  ProductPurchase,  
  InAppPurchase,
  Product,
  PurchaseError,
  Subscription,
  SubscriptionPurchase,
  finishTransaction,
} from 'react-native-iap';


//'htc_limited','htc_unlimited'
//'test_limited','test_unlimited' 
const itemSkus = Platform.select({
  ios: [
    'htc_limited','htc_unlimited'
  ],
  android: [
    'limited','unlimited'
  ]
});

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    appConfig: state.basicAppConfig.config,
    activeLogin: state.entrypage.active,    
    userType: state.driver.appState.userType,
  };
}

class SubscriptionPanel extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func,
    selectRole:PropTypes.func
  };

  purchaseUpdateSubscription = null
  purchaseErrorSubscription = null

  constructor(props) {
    super(props);
    this.state = {
      loading: true,     
      itemSelected: undefined,
      reciptData: undefined,
      purchase: undefined
    };
  }

  async initialize() {
    try {
      const result = await RNIap.initConnection();
      //await RNIap.consumeAllItemsAndroid();
      
    } catch (err) {
      console.warn(err.code, err.message);
    }    
  }

  componentDidMount() {
    this.initialize();

    this.purchaseUpdateSubscription = purchaseUpdatedListener((purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase ) => {
    //purchaseUpdateSubscription = purchaseUpdatedListener( async (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
        const receipt = purchase.transactionReceipt;
        this.setState({
          reciptData: receipt,
          purchase: purchase
        })

       
        if (receipt) {
          if (Platform.OS === 'ios') {
            RNIap.finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            // If consumable (can be purchased again)
            //RNIap.consumePurchaseAndroid(purchase.purchaseToken);
            // If not consumable
            RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
          }

          finishTransaction(purchase);
          
          this.validate();
          
        }
      }
    );

    this.purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        
      }
    );

    this.getProduct()
  }

  async getProduct(){
   
    try {
     
      const products: Product[] = await RNIap.getSubscriptions(itemSkus);
      
      this.setState({ products });
    } catch(err) {
      console.warn(err); // standardized err.code and err.message available
    } 
  }
  
  // validateReceiptIos - second option is devMode: isTest should set to false in production mode 
  async validate() {
    try {      
      const receiptBody = {
        'receipt-data': this.state.reciptData,
        'password': password
      };
      
      if (Platform.OS === 'ios') {
        RNIap.validateReceiptIos(receiptBody, false).then(response => {
                  

          if(response.status==0) {
            let requestObj = {
              tranaction_response: this.state.reciptData,
              device_type: "ios",
              plan: this.state.itemSelected
            };
            this.props.updateSubscription(requestObj)        
          } else {
            RNIap.validateReceiptIos(receiptBody, true).then(response => {
                     

              if(response.status==0) {
                let requestObj = {
                  tranaction_response: this.state.reciptData,
                  device_type: "ios",
                  plan: this.state.itemSelected
                };
                this.props.updateSubscription(requestObj)        
              } else {
                
              }
            }).catch((error) => {
              
            })
            
          }
        }).catch((error) => {
         
        })
      } else {


        //RNIap.validateReceiptAndroid(receiptBody, true).then(response => {
        //RNIap.validateReceiptAndroid('com.htc.live',this.state.purchase.productId,this.state.purchase.purchaseToken,this.state.purchase.purchaseToken,true).then(response => {
          

          // if(response.status==0) {
         
            let requestObj = {
              tranaction_response: this.state.purchase.purchaseToken,
              device_type: "android",
              plan: this.state.itemSelected         
            };
            this.props.updateSubscription(requestObj)
          // } else {
          
          // }
        // }).catch((error) => {
        
        // })

        // validateReceiptAndroid(bundleId: string, productId: string, productToken: string, accessToken: string)
        // bundleId: the packageName
        // productId: productId
        // productToken: productToken
        // accessToken: accessToken
        // isSubscription: isSubscription
        // https://stackoverflow.com/questions/35127086/android-inapp-purchase-receipt-validation-google-play
      }

    } catch (err) {
      this.setState({subscribed: true, isLoading: false});
    }
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }


  getPlanPaid = async() => {
    
    try {
      await RNIap.requestPurchase(this.state.itemSelected, false);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  

  renderCheck(productId) {
    if(this.state.itemSelected == productId) {
      return (
        <Icon
          name="checkmark"
          style={styles.checkmarkcls}
        />
      );
    }
  }

  renderRow = ({ item }) => {    
    return (
      <View style={{ justifyContent:'center', marginTop:30, marginLeft:20, marginRight:20 }} >
        <View style={{ height: 158, backgroundColor: "#151D22",  justifyContent: 'center', alignItems: 'center' }} >
            <TouchableWithoutFeedback onPress={() => this.setState({ itemSelected: item.productId })}>
              <View style={{ flexDirection: "row", justifyContent: "center", width:deviceWidth-100  }} >
                  
                  <View style={{ width:50, justifyContent:'center', height:100, marginLeft:10 }}>
                    { this.renderCheck(item.productId) }
                  </View>

                  <View style={{ width:deviceWidth-100  }} >
                    <Text style={{ color: "#E8E8E8", fontSize:24, fontFamily:'Cabin-Bold' }}>
                        {item.title}
                    </Text>
                    <Text style={{ color: "#E8E8E8", fontSize:20, fontFamily:'Cabin-Bold', marginTop:10 }}>
                        {"1 Month"}
                    </Text>
                    <Text style={{ color: "#E8E8E8", fontSize:20, fontFamily:'Cabin-Bold', marginTop:10 }}>
                        {item.price} {" "} {item.currency} 
                    </Text>
                    <Text style={{ color: "#E8E8E8", fontSize:16, fontFamily:'Cabin-Regular', marginTop:10 }}>
                        {item.description}
                    </Text>                    
                  </View>
              </View>
            </TouchableWithoutFeedback>
        </View>
      </View>
    );    
  };
  
  render() {
    
    return(
      <Container style={{ backgroundColor: "#fff" }}>
          
          <View style={{ flex: 1 }}>
            <Content style={{ backgroundColor: "#0D1214" }}>
              <Header style={{ backgroundColor: "#0D1214" }} >
              <Left>
               {/* <Button 
                  transparent 
                  onPress={()=> (this.props.userType=='barber') ? Actions.BarberHome() : Actions.BookingDate() }
                >
                  <Icon
                    name="md-arrow-back"
                    style={{
                      fontSize: 24,
                      marginLeft: 15,
                      fontWeight:'bold',
                      color: "#E8E8E8"
                    }}
                  />
                  <Text style={{ color: "#E8E8E8", marginTop:3, fontSize:16, fontFamily:"Cabin-Bold" }}>{" "}Back</Text>
                </Button>*/}
              </Left>
              <Body>
                <Title/>
              </Body>
              <Right />
            </Header>
            <View style={{ padding: 20, marginTop: 20 }} >              
              <Text style={{ color:"#E8E8E8", fontSize:28, fontFamily:"Cabin-Bold"  }}>
                Select Subscription Plan
              </Text>
              <Text style={{ color: "#E8E8E8", fontSize:16, fontFamily:"Cabin-Regular", marginTop:10  }}>
                Please select a auto renewing subscription. 
              </Text>
              
            </View>

            <FlatList
                data={this.state.products}
                renderItem={this.renderRow}
                style={{ borderTopWidth: 2, borderTopColor: "#ddd" }} />


            <Button
                block
                onPress={()=> this.getPlanPaid()}
                style={[styles.nameBtn,{backgroundColor:"#392F2A"}]} >
                <Text style={{ fontSize:16, fontFamily:'Cabin-Bold', color: "#FFFFFF" }}>
                    SUBSCRIBE NOW              
                </Text>
            </Button>   


            <View style={{ marginTop: 30, justifyContent:'center', width: deviceWidth, alignItems: 'center', flexDirection: "row" }} >              
              
              <TouchableWithoutFeedback onPress={() => Actions.tearms() }>
              <Text style={{ color:"#E8E8E8", fontSize:13, fontFamily:"Cabin-Bold", color:"#233659"  }}>
                Terms of Service 
              </Text> 
              </TouchableWithoutFeedback>         
              
              <Text style={{ color:"#E8E8E8", fontSize:13, fontFamily:"Cabin-Bold", color:"#333"  }}>
                {" "}and{" "} 
              </Text>          

              <TouchableWithoutFeedback onPress={() => Actions.privacy() }>
              <Text style={{ color:"#E8E8E8", fontSize:13, fontFamily:"Cabin-Bold", color:"#233659"  }}>
                Privacy Policy 
              </Text>          
              </TouchableWithoutFeedback>

            </View>

            </Content>
          </View>
          
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status)),
    currentLocationUser: () => dispatch(currentLocationUser()),
    clearEntryPageFields: () => dispatch(clearEntryPageFields()),
    selectRole:(role) => dispatch(selectRole(role)),
    updateSubscription:(data) => dispatch(updateSubscription(data)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(SubscriptionPanel);