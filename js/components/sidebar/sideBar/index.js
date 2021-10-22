import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, Dimensions,ScrollView,Image,TouchableOpacity ,ImageBackground,Share,Linking,TextInput} from "react-native";
import _ from "lodash";


import PropTypes from "prop-types";
import {
  Content,
  View,
  Text,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Item,
  List,
  ListItem,
  Left,Button
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";

import { closeDrawer } from "../../../actions/drawer";
import { logOutUserAsync,getprofilestudentdata,getprofileteacherdata} from "../../../actions/common/signin";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getMonthEarning, getTearms, getPrivacy, getNotificationList, getNearbyBarber, getNearbyCustomer, getBarberList } from "../../../actions/common/booking";

const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 
function mapStateToProps(state) {
  return {
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    userType: state.driver.user.userType,
    profileUrl: state.driver.user.profileUrl,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    studentimage:state.driver.user.student,
    teacher:state.driver.user.teacherinfo,
    driverlogin:state.driver.user.driverlogin,
    // assignments:state.driver.user.assignments,
    // studentloginid:state.driver.user.studentlogin,
    // studentloginid:state.driver.user.studentlogin.studentid,
    // teacherloginid:state.driver.user.teacherlogin.teacherid,
  };
}
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      userType: this.props.userType,
      isopen:false,
      isopen2:false
    };
  }

  static propTypes = {
    fname: PropTypes.string,
    logOutUserAsync: PropTypes.func,
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    userType:PropTypes.string,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.fname === undefined) {
      Actions.login({ type: ActionConst.RESET });
    }
  }
  async componentDidMount() {
   // this.props.chapterlist(this.props.jwtAccessToken)
    if(userType==Student){

     this.props.getprofilestudentdata(this.props.jwtAccessToken,this.props.studentloginid)
    }
    else if(userType==Teacher){
      this.props.getprofileteacherdata(this.props.jwtAccessToken,this.props.teacherloginid)
     
    }
    
  }



  handleLogOut() {
    this.props.logOutUserAsync(this.props.jwtAccessToken);
  }
  term=()=>{
    Linking.openURL('https://www.schoolingsmart.com/terms-conditions/')
   }
  privacypolicy(){
    Linking.openURL('https://www.schoolingsmart.com/privacy-policy/')
  }
  refand(){

    Linking.openURL('https://www.schoolingsmart.com/refund-and-cancellation/')
   
  }
  onShare = async () => {
  
    try {
      const result = await Share.share({
       title: 'App link',
       message: 'Please install this app and stay ahead in your schooling , AppLink :https://play.google.com/store/apps/details?id=com.schoolingsmart.wesmart', 
       url: 'https://play.google.com/store/apps/details?id=com.schoolingsmart.wesmart'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


opendropdown=()=>{
   this.setState({isopen:true})
   if(this.state.isopen==true){
    this.setState({isopen:false})
   }else{
    this.setState({isopen:true})
   }

}
opendropdown2=()=>{
   this.setState({isopen2:true})
   if(this.state.isopen2==true){
    this.setState({isopen2:false})
   }else{
    this.setState({isopen2:true})
   }

}
closedropdown=()=>{
  this.setState({isopen:false})
}
  render() {
     
    var userType = this.state.userType;
   

    return (

      <ScrollView  style={{ flex: 1, }}>
      
        <Content
          bounces={false}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          style={
            
            Platform.OS === "android"
              ? styles.adrawerContent
              : styles.drawerContent
          }
        >
            

            <Card
            style={{
              
            }}
          >

            <CardItem
              style={{
               
                
              }}
            >
              <Item
                style={{
                  
                  
                }}
                onPress={() => {

                  Actions.profile();
                  this.props.closeDrawer();
                }}
              >
               
                <View style={{ flexDirection:'row', marginLeft:10,marginTop:20,marginRight:10}} >
                        <TextInput
                          placeholder='Search'
                          style={{ borderColor:'#e2e2e2', borderWidth:1,  color:'#000', height:40, width:deviceWidth/1.7, fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                           onChange={(event) => this.setState({item: event.nativeEvent.text})}
                           value={this.state.title}
                          
                        />            
                     </View>
                 
                 
                  
              </Item>
            
           
             
           

            
            </CardItem>
          </Card>
          <List foregroundColor={"white"} style={[styles.Bg],{marginTop:20, }}>
            

            


            <ListItem
              button
              onPress={() => {
                this.props.closeDrawer();
                Actions.Home();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                
            <Text style={styles.linkText}> Home</Text>
              </Left>
            </ListItem>
          
             <ListItem
              button
              onPress={() => {
                  this.opendropdown();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
               
                <Text style={styles.linkText}>Services </Text>
                <Button transparent onPress={() =>this.opendropdown()} style={{position:'absolute',right:0,marginTop:-5}}>
                      <Image                      
                       source={require("../../../../assets/images/arrow-down.png")}
                      style={{ width:30,height:30,}}
                      /> 
                                                   
                    </Button>
              </Left>
            </ListItem>
            {this.state.isopen &&
              <View style={{marginLeft:'3%'}}>
                <Text style={styles.linkText}>Services </Text>
                <Text style={styles.linkText}>Services </Text>
                <Text style={styles.linkText}>Services </Text>
                <Text style={styles.linkText}>Services </Text>
                <Text style={styles.linkText}>Services </Text>
                <Text style={styles.linkText}>Services </Text>
              </View>
          }

             <ListItem
              button
              onPress={() => {
                  this.props.closeDrawer();
                   this.privacypolicy();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
               
                <Text style={styles.linkText}>Success Story </Text>
                 <Button transparent onPress={() =>this.opendropdown2()} style={{position:'absolute',right:0}}>
                      <Image                      
                       source={require("../../../../assets/images/arrow-down.png")}
                      style={{ width:30,height:30,}}
                      /> 
                                                   
                    </Button>
              </Left>
            </ListItem>
            {this.state.isopen2 &&
              <View style={{marginLeft:'3%'}}>
                <Text style={styles.linkText}>Story </Text>
                <Text style={styles.linkText}>Story </Text>
                <Text style={styles.linkText}>Story </Text>
                <Text style={styles.linkText}>Story </Text>
                <Text style={styles.linkText}>Story </Text>
                <Text style={styles.linkText}>Story </Text>
              </View>
          }
             <ListItem
              button
              onPress={() => {
                  this.props.closeDrawer();
                   this.privacypolicy();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
               
                <Text style={styles.linkText}>Contact </Text>
              </Left>
            </ListItem>
             <ListItem
              button
              onPress={() => {
                  this.props.closeDrawer();
                   this.privacypolicy();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
               
                <Text style={styles.linkText}>Wedding Planner</Text>
              </Left>
            </ListItem>
             <ListItem
              button
              onPress={() => {
                  this.props.closeDrawer();
                   this.privacypolicy();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
               
                <Text style={styles.linkText}>Term & Policy </Text>
              </Left>
            </ListItem>
            
            <ListItem
              button
              onPress={() => {
                this.props.closeDrawer();
                this.handleLogOut();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
               >
              <Left>
               
                <Text style={{ ...styles.linkText, fontWeight: "700" }}>
                  LogOut
                </Text>
              </Left>
            </ListItem>
          </List>
        </Content>
        
      </ScrollView>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    logOutUserAsync: jwtAccessToken => dispatch(logOutUserAsync(jwtAccessToken)),
    getprofilestudentdata:(data,userid)=>dispatch(getprofilestudentdata(data,userid)),
    getprofileteacherdata:(data,userid) => dispatch(getprofileteacherdata(data,userid)), 
  
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(SideBar);
