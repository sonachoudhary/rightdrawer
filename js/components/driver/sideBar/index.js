import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, Dimensions,ScrollView,Image,TouchableOpacity ,ImageBackground,Share,Linking} from "react-native";
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
  Left
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";

import { closeDrawer } from "../../../actions/drawer";
import { logOutUserAsync,getprofilestudentdata,getprofileteacherdata} from "../../../actions/common/signin";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getMonthEarning, getTearms, getPrivacy, getNotificationList, getNearbyBarber, getNearbyCustomer, getBarberList } from "../../../actions/common/booking";

const deviceHeight = Dimensions.get("window").height;

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
      userType: this.props.userType
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

  render() {
     
    var userType = this.state.userType;
   var uri= 'http://wesmart.in/backend/public/documents/'

    return (

      <ScrollView  style={{ flex: 1, }}>
      <ImageBackground source={ require('../../../../assets/images/Path_12667.png')} style={{ height: deviceHeight, resizeMode:'cover' }} > 
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
              borderColor: "#470B63",
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              flexWrap: "nowrap",
              marginTop: 0,
               backgroundColor: "#470B63",
              flex: 1,
              borderWidth:0
            }}
          >

            <CardItem
              style={{
                borderColor: "transparent",
                borderWidth: 0,
                flexDirection: "column",
                 backgroundColor: "#470B63",
               marginLeft:20,
                alignItems:'flex-start',
                height: 170,
                borderWidth:0
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
               
                {(this.state.userType=='Teacher' ) && (this.props.teacher) &&
                
               <Image
                      source={{ uri: uri+this.props.teacher.photo }}
                      style={{
                      width: 80,
                      height: 80,
                      borderRadius: 20,
                      backgroundColor:'#828282',
                      borderColor: "transparent",
                      marginTop:10,
                      paddingTop:10,
                      
                  }}
                  />
                  }
                  {(this.state.userType=='Driver' ) && 
                
               <Image
                     source={require("../../../../assets/images/dummy_profile.png")}
                      style={{
                      width: 80,
                      height: 80,
                      borderRadius: 20,
                      backgroundColor:'#828282',
                      borderColor: "transparent",
                      marginTop:10,
                      paddingTop:10,
                      
                  }}
                  />
                  }
                  {(this.state.userType=='Student' ) && (this.props.studentimage) &&
                
               <Image
                      source={{ uri: uri+this.props.studentimage.photo }}
                      style={{
                      width: 80,
                      height: 80,
                      borderRadius: 20,
                      backgroundColor:'#828282',
                      borderColor: "transparent",
                      marginTop:10,
                      paddingTop:10,
                      
                  }}
                  />
                  }
                  
              </Item>
            
            { (this.state.userType=='Student' ) && this.props.studentimage &&
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  paddingVertical: 1,
                  fontFamily:'Cabin-Regular', 
                  marginTop:10,
                  marginLeft:-5
                }}
              > 
                {this.props.studentimage.name}
              </Text>
            }

            { (this.state.userType=='Student' ) && this.props.studentimage &&
             <Text
                note
                style={{ color: "#fff", marginBottom:10, paddingVertical: 2, fontFamily:'Cabin-Regular', fontSize: 16 }}
              >
                Class :{this.props.studentimage.class}
              </Text>
            }
            
              { (this.state.userType=="Driver" ) &&
              <Text style={{ color: "#fff", marginBottom:10, paddingVertical: 2, fontFamily:'Cabin-Regular', fontSize: 16 }}> {this.props.driverlogin.email}</Text>
            }
             
            { (this.state.userType=='Teacher' ) && this.props.teacher &&
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  paddingVertical: 1,
                  fontFamily:'Cabin-Regular', 
                  marginTop:10,
                  marginLeft:-5
                }}
              > 
                {this.props.teacher.name}
              </Text>
            }

            {  (this.state.userType=='Teacher' ) && (this.props.teacher) && (this.props.teacher.classes) &&
             <Text
                note
                style={{ color: "#fff", marginBottom:10, paddingVertical: 2, fontFamily:'Cabin-Regular', fontSize: 16 }}
              >
                Class Incharge :{this.props.teacher.classes[0].class}
              </Text>
            }
            </CardItem>
          </Card>
          <List foregroundColor={"white"} style={[styles.Bg],{marginTop:20, borderColor:'#470B63'}}>
            

            


           {(this.state.userType=='Teacher' ) &&
          <ListItem
              button
              onPress={() => {
                this.props.closeDrawer();
                Actions.profile();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/images/account.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                  />
                <Text style={styles.linkText}> My Profile</Text>
              </Left>
            </ListItem>
             }
             {(this.state.userType=='Student' ) &&
          <ListItem
              button
              onPress={() => {
                this.props.closeDrawer();
                Actions.Studentprofile();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/images/account.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                  />
                <Text style={styles.linkText}> My Profile</Text>
              </Left>
            </ListItem>
             }
            {this.state.userType=='Teacher'  && <ListItem
              button
              onPress={() => {
                  Actions.Quizdashboard();
                  this.props.closeDrawer();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/menuicons/asi.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                  />
                <Text style={styles.linkText}>Assignments</Text>
              </Left>
            </ListItem>}    

               
         
  
           

           
       {(this.state.userType=='Student' ) &&
             <ListItem
              button
              onPress={() => {
                Actions.Passchange();
                 this.props.closeDrawer();         
                       
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
              <Image source={require("../../../../assets/images/password.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }/>
                
                <Text style={styles.linkText}>Change Password</Text>
              </Left>
            </ListItem> 
        }
        {(this.state.userType=='Teacher' ) &&
             <ListItem
              button
              onPress={() => {
                Actions.Passchange();
                 this.props.closeDrawer();         
                       
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
              <Image source={require("../../../../assets/images/password.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }/>
                
                <Text style={styles.linkText}>Change Password</Text>
              </Left>
            </ListItem> 
        }
            <ListItem
              button
              onPress={() => {
                  this.props.closeDrawer();
                   this.onShare();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/images/share.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }/>
                <Text style={styles.linkText}>Share app</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                  this.props.closeDrawer();
                   this.term();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/images/share.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }/>
                <Text style={styles.linkText}>T&C</Text>
              </Left>
            </ListItem>
            
            <ListItem
              button
              onPress={() => {
                  this.props.closeDrawer();
                   this.refand();
                }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/images/share.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }/>
                <Text style={styles.linkText}>Refund and Cancellation</Text>
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
                <Image source={require("../../../../assets/images/privacy_and_security.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }/>
                <Text style={styles.linkText}>Privacy & Security </Text>
              </Left>
            </ListItem>
          
          {(this.state.userType=='Student' ) &&
           <ListItem
              button
              onPress={() => {
                Actions.EBook();
                this.props.closeDrawer();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/images/share.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }/>
                <Text style={styles.linkText}>eBook</Text>
              </Left>
            </ListItem>
          }
          
             {(this.state.userType=='Student' ) &&
             <ListItem
              button
              onPress={() => {
                Actions.CustomerGeoFence();
                this.props.closeDrawer();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Image source={require("../../../../assets/images/Group_16886.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                  
                  />
                <Text style={styles.linkText}>Bus Track</Text>
              </Left>
            </ListItem>
          }

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
                <Image source={require("../../../../assets/menuicons/logout.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                  />
                <Text style={{ ...styles.linkText, fontWeight: "700" }}>
                  LogOut
                </Text>
              </Left>
            </ListItem>
          </List>
        </Content>
        <View style={{flexDirection:'row',position:'absolute',bottom:'5%'}}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/Schooling-Smart-104630241267345')}>
                 <Image source={require("../../../../assets/images/facebook.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                 
                  />
                  </TouchableOpacity>
                   <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/schoolingsmart/')}>
                  <Image source={require("../../../../assets/images/instagram.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                   
                  />
                  </TouchableOpacity>
                   <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UC9spMZl95qAvKdhty8Il3ZQ')}>
                  <Image source={require("../../../../assets/images/youtube.png")} style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIconsec
                      : styles.aSidebarIconssec
                  }
                  
                  />
                  </TouchableOpacity>
        </View>
        <Text style={{ ...styles.linkText, fontWeight: "700",marginBottom:10,marginLeft:'3%'}}> Powered By Schooling Smart</Text>
        </ImageBackground>
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
