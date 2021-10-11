import React, { Component } from "react";
import { Dimensions, AsyncStorage,TouchableOpacity, View, Platform, FlatList, TextInput,Image } from "react-native";
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
  Item,
  Input,
  Container,
  Header,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Title,
  Left,
  Picker,
  Right,
  Body,
  Radio, 
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import DatePicker from 'react-native-datepicker'; //https://www.npmjs.com/package/react-native-datepicker

import { appointmentRequest } from "../../../actions/common/booking";
import moment from "moment";
import { gettransactionDataList, withdrawTransaction } from '../../../actions/common/checkUser';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const validate = values => {
  const errors = {};
  if (!values.state) {
    errors.state = 'State is Required';
  }
  if (!values.city) {
    errors.city = 'City is Required';
  }
  if (!values.zip) {
    errors.zip = 'Zip is Required';
  }
  
  return errors;
};

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Input {...input} {...props} />
      {meta.touched && meta.error && <Text style={{ color: 'red', textAlign:"right", paddingRight:10 }}>{meta.error}</Text>}
    </View>
  );
};
input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes()

if(dd<10) { dd='0'+dd; } 
if(mm<10) { mm='0'+mm; } 
//today = mm + '-' + dd + '-' + yyyy + '-' + time ;
//today = "2016-05-15";

today = moment(
  today,
  "MMM Do YY h:mm A"
);

var endDate = new Date();
endDate.setMonth(endDate.getMonth() + 6);
var edd = endDate.getDate();
var emm = endDate.getMonth()+1; 
var eyyyy = endDate.getFullYear();
if(edd<10) { edd='0'+edd; } 
if(emm<10) { emm='0'+emm; } 
endday = edd+'-'+emm+'-'+eyyyy;


function mapStateToProps(state) {
  return {
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating,
    trainerProfileId: state.driver.user.trainerProfileId,
    tfname: state.driver.user.tfname,
    tlname: state.driver.user.tlname,
    cfname: state.driver.user.fname,
    clname: state.driver.user.lname,
    user_id: state.driver.user._id,
    latitude: state.driver.user.gpsLoc[1],
    longitude: state.driver.user.gpsLoc[0],
    transactionDataList: state.driver.user.transactionDataList,
  };
}

class transactionList extends Component {
  constructor(props) {

    super(props);
    this.state = {
      showSortlist: true,
      showSortName:false,
      showSortdate:false,
      sortasc:1,
      time:today,
      choosenIndex: "1",  
      itemSelected: 'current',  
      trainerProfileId: this.props.trainerProfileId,
      tfname: this.props.tfname,
      tlname: this.props.tlname,
      customer_id: this.props.user_id,
      cfname: this.props.cfname,
      clname: this.props.clname,
      customer: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
      },
      transactionDataList: this.props.transactionDataList,
      searchData:"Search",
    };      
    
  }

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
    transactionDataList: PropTypes.array
  };

  async componentDidMount() {
    await this.props.gettransactionDataList(this.props.user_id);      
  }

  renderRow = ({ item }) => {
   
    //var time = moment(item.time,"MMM Do YY h:mm A");
    time = moment(new Date(item.createdAt)).format("MMM Do YY, h:mm A"); 
    name = item.userIdTo.fname +" "+ item.userIdTo.lname;
   
    return (
      <ListItem style={{ flexDirection: "row", marginLeft:0, justifyContent: "center", borderBottomWidth:1, borderColor: '#dddddd' }}>
         <View style={{flexDirection:'row'}}>
            <Image source={require('../../../../assets/images/dollortrans.png')} style={{width: 40, height: 40,marginTop:10, marginRight:20 }}/>
            
            <View style={styles.dummytext}>
              <View style={{flexDirection:'row'}}>
                  <Text style={styles.trainerheading}>{name}</Text>
                  {(item.status==0) &&
                   <Text style={styles.desctext1}>+ {item.amount}$</Text>
                  }
                  {(item.status==1) &&
                    <Text style={styles.desctext1}>+ {item.amount}$</Text>
                  }
                  {(item.status==2) &&
                    <Text style={styles.desctext2}>- {item.amount}$</Text>
                  }
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={styles.desctext}>{time}</Text>
                  
              </View>
            </View>
         </View>
      </ListItem>
    );
  };

  showHide = () =>{
    if(this.state.showSortlist == true){
      this.setState({showSortlist: false})
    }else{
      this.setState({showSortlist: true})
    }
  }
  withdrawitem = () =>{
    
    this.props.dispatch(withdrawTransaction(this.props.user_id));
    this.props.gettransactionDataList(this.props.user_id);
  }

  showHidename = () =>{
    this.setState({showSortdate: false})
    if(this.state.showSortName == true){
      this.setState({showSortName: false})
    }else{
      this.setState({showSortName: true})
    }
  }

  showHidedate = () =>{
    this.setState({showSortName: false})
    if(this.state.showSortdate == true){
      this.setState({showSortdate: false})
    }else{
      this.setState({showSortdate: true})
    }
  }

  sortby = (sorttype) =>{
    if(this.state.sortasc == 1){
      this.setState({sortasc: 0})
    }else{
      this.setState({sortasc: 1})
    }
    //this.props.sortNearByTrainers(sorttype,this.state.sortasc,this.state.customer.latitude,this.state.customer.longitude);
  }

  render() {

    
    
    let totalQuantity = 0;
    if(this.props.transactionDataList && this.props.transactionDataList.user.length > 0) {
        this.props.transactionDataList.user.forEach((item) => {
          if(item.status==0){
            totalQuantity += item.amount;
          }
        })
    }
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={styles.iosHeader}
          iosBarStyle="light-content"
        >
          <Left>
            <Button transparent>
              <Icon name="ios-menu" style={styles.logoutLogo} onPress={Actions.drawerOpen} />
            </Button>
          </Left>
          <Body>
            <Title style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>
              Transactions
            </Title>
          </Body>
          <Right>
        
          </Right>
        </Header>
        <Content style={{ backgroundColor: "#FFFFFF",marginTop:30}}>
        { this.state.showSortlist==true &&
            <View style={{flexDirection:'row',marginTop:10,marginLeft:50}}>
              <Text style={{ fontWeight:'bold'}}> Filter By:</Text>
              <TouchableOpacity onPress={() => this.showHidename()}>
                <Text style={{ paddingRight:10}}> Name</Text>
              </TouchableOpacity>
              <Text> | </Text>
              <TouchableOpacity onPress={() => this.showHidedate()}>
                <Text style={{ borderRightColor:'#000000',paddingRight:10,borderRightWidth:1}}> Date</Text>
              </TouchableOpacity>
            </View>
          }
          { this.state.showSortName==true &&
          <View style={styles.filterdatepicker}>
                <Input
                   value={this.state.searchData}
                   onChangeText={ value => this.setState({ searchData: value })}
                   style={styles.inputgrow}            
                />
          </View>
          }
          { this.state.showSortdate==true &&
          <View style={styles.filterdatepicker}>
                <DatePicker
                      style={styles.inputgrow} 
                      date={this.state.time}
                      mode="datetime"
                      placeholder="Start"
                      showIcon={false}
                      format="MMM Do YY h:mm A"
                      minDate={today}
                      maxDate={endday}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: { textAlign: 'center', alignSelf: 'center', borderWidth: 0 },
                        dateText:{ color: "#FF0000", fontSize: 18, alignSelf:'center', textAlign:'center' }
                      }}
                      onDateChange={time => {
                        this.setState({ time: time });
                      }} />
          </View>
          }
          <View style={{ backgroundColor: "#FFFFFF", marginTop:40,marginLeft:20, marginRight:20 }}>
             <Text style={styles.desctext3}>Closing Balance: ${totalQuantity}.00</Text>

             { this.props.transactionDataList && this.props.transactionDataList.user.length > 0 ? 
              <FlatList
                data={this.props.transactionDataList.user}
                renderItem={this.renderRow}  /> 
                 : 
              <Text style={ styles.emptyMessageStyle }>No transactions available</Text>
            }

             { (this.props.transactionDataList && this.props.transactionDataList.user.length > 0) &&
             <View style={styles.viewmoretext}>
                <Text style={styles.textStyle} onPress={() => this.withdrawitem()}>Withdraw</Text>
             </View>
            }
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    gettransactionDataList: (userId) => dispatch(gettransactionDataList(userId)),
    withdrawTransaction: (userId) => dispatch(withdrawTransaction(userId))
  };
}


transactionList = reduxForm({
  form: "bookForm", // a unique name for this form
  validate
})(transactionList);

transactionList = connect(mapStateToProps, bindActions)(transactionList);

export default transactionList;
