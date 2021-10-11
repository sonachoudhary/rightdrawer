import React, { Component } from "react";
import { StatusBar, Platform, BackHandler } from "react-native";
import { connect } from "react-redux";
// import { Drawer } from "native-base";
import { Scene, Router, Actions,Drawer,Modal } from "react-native-router-flux";
import PropTypes from "prop-types";
import { closeDrawer } from "./actions/drawer";
import NavigationDrawer from "./DrawerNavigator";
import Login from "./components/common/login/";
import SignIn from "./components/common/signIn/";
import Register from "./components/common/register/";
import Forgot from "./components/common/forgot";
import Reset from "./components/common/reset";
import Events from "./components/common/events";
import Unviewquizassignments from "./components/common/calender/unsubmitted"
import Paper from "./components/common/calender/viewpaper";
import Editpaper from "./components/common/calender/editpaper"
import Paperdetails from "./components/common/calender/paperdetails"

import Privacy from "./components/common/privacy"; 
import Tearms from "./components/common/tearm";
import Resetsuccess from  "./components/common/reset/resetsuccess";
import Changepass from  "./components/common/changepass"
import Viewquizassignmarks from "./components/common/calender/viewquizassignmarks";
import EBook from  "./components/common/ebook"
import EBookstudent from  "./components/common/ebook/ebookstudent"
import Attendance from  "./components/common/attendance"

 
import Services from "./components/common/flow/services";
import Customersignup from "./components/common/flow/customersignup";
import Regsuccess from "./components/common/flow/regsuccess";
import Socialregsuccess from "./components/common/flow/socialregsuccess";

import Notifications from "./components/common/notifications";
 import Searchfooter from "./components/footersearch";

//import CustomerStartupService from "./components/customer/startupServices";

import ShareScreenFirst from "./components/common/share/firstScreen";
import ShareScreenSecond from "./components/common/share/secondScreen";

import SplashScreen from "react-native-splash-screen";
import SideBar from "./components/driver/sideBar";
import { getAppConfig } from "./actions/appConfig";


import Card from "./components/customer/card";
import Carddetail from "./components/customer/carddetail";
import cardPayment from "./components/customer/cardPayment";
import CreditCard from "./components/customer/creditCard";
import Payment from "./components/customer/saveCards";
import PaymentDetails from "./components/customer/paymentDetails";
import PaymentConfirm from "./components/customer/paymentConfirm";
import Feedback from "./components/customer/feedback";
import Schoolfeedback from "./components/customer/feedback/schoolfeeds"; 
import Addfeeds from "./components/customer/feedback/addfeeds";
import TrainerDetails from "./components/trainer/trainerDetails";
import TrainerAppointments from "./components/trainer/trainerAppointments";
import Fees from "./components/common/fees";
import Feedetail from "./components/common/fees/feedetail";

import Favorite from "./components/customer/favorites";
import Bio from "./components/common/bio";
import Profile from "./components/common/profile";
import Studentprofile from "./components/common/profile/studentprofile";


import Editobjective from "./components/common/calender/editchapterobjective";
import Editchapter from "./components/common/calender/editchapter";
import Studentresult from "./components/common/calender/studentresult";
import Calender from "./components/common/calender";
import Quizhistory from "./components/common/calender/quizhistory";
import Result from "./components/common/calender/result";
import Viewquiz from "./components/common/calender/viewquiz";
import Viewquiz2 from "./components/common/calender/viewquiz2";
import Quizresultcheck from "./components/common/calender/quizresultcheck";

import Subject from "./components/common/calender/subject";
import Objective from "./components/common/calender/objective";
import Subjective from "./components/common/calender/subjective";
import Quizdashboard from "./components/common/calender/quizdashboard";
import Viewassignments from "./components/common/assignments/viewassignments";
import Viewquizassignments from "./components/common/assignments/viewquiz";
import Viewquizdetail from "./components/common/assignments/viewquizdetail";
import Quiz from "./components/common/calender/quiz";
import Selectquestions from "./components/common/calender/selectquestions";
import Createquiz from "./components/common/calender/createquiz";

import Schoolassignments from "./components/common/assignments/schoolassignments"; 

import Teacherquiz from "./components/common/calender/teacherprofilequiz";
import Quiztwo from "./components/common/calender/quiz2";
import Quizthree from "./components/common/calender/quiz3";
import Quizfour from "./components/common/calender/quiz4";

import Leaverequest from "./components/common/calender/leave";
import TrainerGeoFence from "./components/trainer/map";
import CustomerAppointmentDetail from "./components/customer/geofence/appointmentdetail";
import CustomerGeoFence from "./components/customer/geofence/maps";
import CustomerWalk from "./components/customer/geofence/customerwalk";

import Passchange from "./components/common/passchange";
import Chat from "./components/common/chat";
import Teacherchat from "./components/common/chat/teacherchat";
import Chatlist from "./components/common/chatlist";
import Teacherchatlist from "./components/common/chatlist/teacherchatlist";

import BarberHome from "./components/barber/home";
import Homework from "./components/barber/Homework";
import Homework2 from "./components/barber/Homework/homework2";
import Subjectlist from "./components/barber/Homework/subjectlist";
import Edit from "./components/barber/Homework/edit";
import Subjectliststudent from "./components/barber/Homework/studentsubject";

import Addhomework from "./components/barber/Homework/addhomework";
import DriverHome from "./components/common/driverhome";

import SchoolHome from "./components/customer/school";

import CustomerHome from "./components/customer/landing";

import Task from "./components/customer/Task";
import Addtask from "./components/customer/Task/add_task";

import BookingDate from "./components/barber/booking/bookingdate";
import BookingTime from "./components/barber/booking/bookingtime";
import BookingSelect from "./components/barber/booking/barberselect";
import BookingService from "./components/barber/booking/servicesbook";
import BookingSuccess from "./components/barber/booking/success";
import BookingDetail from "./components/barber/booking/bookingdetail";
import BookingPayMethod from "./components/barber/booking/bookingpaymethod";
import BarberAcceptSuccess from "./components/barber/booking/barberacceptsuccess";

import BarberWalk from "./components/barber/geofence/barberwalk";

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {
  static propTypes = {
    driverJwtAccessToken: PropTypes.string,
    userType: PropTypes.string
  };
  componentWillMount() {
    this.props.getAppConfig();
  }
  
  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }

  render() {
      // alert(this.props.userType)
    return (

        // <StatusBar backgroundColor={statusBarColor} />
        <RouterWithRedux>
          <Modal>
             <Drawer key="SideBar"
                ref="navigation"
                hideNavBar
                drawerWidth={500}
                contentComponent={SideBar}
                drawerWidth ={500}                           
                >                  
                  <Scene 
                    hideNavBar 
                    key="signIn" 
                    component={SignIn} 
                    drawerLockMode ='locked-closed'                           
                    initial={ !this.props.isLoggedIn ? true : true }
                  />
                 
                 
                  <Scene
                    key="login"
                    component={Login}
                    hideNavBar
                    drawerLockMode ='locked-closed'

                  />
                  
               <Scene  key="Editobjective" component={Editobjective}  drawerLockMode ='locked-closed' hideNavBar/>
                  <Scene hideNavBar key="EBook" component={EBook} drawerLockMode='locked-closed' />
                   <Scene hideNavBar key="EBookstudent" component={EBookstudent} drawerLockMode='locked-closed' />
                   <Scene hideNavBar key="Createquiz" component={Createquiz} drawerLockMode='locked-closed' />
                  <Scene hideNavBar key="Selectquestions" component={Selectquestions} drawerLockMode='locked-closed' />
                  <Scene hideNavBar key="Register" component={Register} drawerLockMode='locked-closed' />
                  <Scene hideNavBar key="forgot" component={Forgot} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="resetform" component={Reset} drawerLockMode ='locked-closed' />                  
                  <Scene hideNavBar key="Changepass" component={Changepass} drawerLockMode ='locked-closed'/>                  
                  
                  <Scene hideNavBar key="resetsuccess" component={Resetsuccess} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="services" component={Services} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="customersignup" component={Customersignup} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="regsuccess" component={Regsuccess} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="socialregsuccess" component={Socialregsuccess} drawerLockMode ='locked-closed'/>
                  
                  <Scene  key="privacy" component={Privacy} />
                  <Scene  key="tearms" component={Tearms} />

                <Scene  key="Paperdetails" component={Paperdetails}  drawerLockMode ='locked-closed' hideNavBar/>
               <Scene  key="Leaverequest" component={Leaverequest}  drawerLockMode ='locked-closed' hideNavBar/>
                   <Scene  key="Studentresult" component={Studentresult} hideNavBar />
                     <Scene  key="Searchfooter" component={Searchfooter} hideNavBar />


                   <Scene key="Unviewquizassignments" component={Unviewquizassignments} hideNavBar />
                      
                      <Scene key="Editpaper" component={Editpaper} hideNavBar />
                    <Scene key="Paper" component={Paper} hideNavBar />
                  <Scene key="Passchange" component={Passchange} hideNavBar />
                  <Scene key="Events" component={Events} hideNavBar />
                  <Scene key="trainerDetails" component={TrainerDetails} hideNavBar />     
                  <Scene key="Editchapter" component={Editchapter} hideNavBar />
                     <Scene key="trainerDetails" component={TrainerDetails} hideNavBar />
                  <Scene hideNavBar key="Quizresultcheck" component={Quizresultcheck} />
                  <Scene hideNavBar key="Schoolassignments" component={Schoolassignments} />
                  <Scene hideNavBar key="Viewassignments" component={Viewassignments} />
                  <Scene hideNavBar key="Fees" component={Fees} />
                  <Scene hideNavBar key="Feedetail" component={Feedetail} />
                  <Scene hideNavBar key="card" component={Card} />
                  <Scene hideNavBar key="carddetail" component={Carddetail} />
                  <Scene hideNavBar key="creditCard" component={CreditCard} />
                  <Scene hideNavBar key="cardPayment" component={cardPayment} />                                    
                  <Scene hideNavBar key="Feedback" component={Feedback} />  
                  <Scene hideNavBar key="bio" component={Bio} />                         
                  <Scene hideNavBar key="favorite" component={Favorite} />
                  <Scene hideNavBar key="payment" component={Payment} />
                  <Scene hideNavBar key="Addfeeds" component={Addfeeds} />
                  <Scene hideNavBar key="paymentConfirm" component={PaymentConfirm} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="paymentDetails" component={PaymentDetails} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="Studentprofile" component={Studentprofile} />
                  <Scene hideNavBar key="profile" component={Profile} />   
                  <Scene hideNavBar  key="chat" component={Chat} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="chatlist" component={Chatlist} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar  key="Calender" component={Calender} /> 
                   <Scene hideNavBar  key="Attendance" component={Attendance} /> 
                  <Scene hideNavBar key="Quizhistory" component={Quizhistory} /> 
                  <Scene  hideNavBar key="Result" component={Result} /> 
                   <Scene hideNavBar key="Viewquiz" component={Viewquiz} /> 
                   <Scene hideNavBar key="Viewquiz2" component={Viewquiz2} /> 
                   <Scene hideNavBar key="Viewquizassignmarks" component={Viewquizassignmarks} /> 
                   <Scene hideNavBar key="Subject" component={Subject} />
                   <Scene hideNavBar key="Objective" component={Objective} /> 
                   <Scene hideNavBar key="Subjective" component={Subjective} /> 
                   <Scene hideNavBar  key="Quizdashboard" component={Quizdashboard} /> 
                   <Scene hideNavBar key="Quiz" component={Quiz} />  
                   <Scene hideNavBar key="Quiztwo" component={Quiztwo} />
                   <Scene hideNavBar key="Quizthree" component={Quizthree} />
                   <Scene hideNavBar key="Quizfour" component={Quizfour} />
                    <Scene hideNavBar key="Teacherquiz" component={Teacherquiz} />
                     <Scene hideNavBar key="Schoolfeedback" component={Schoolfeedback} />
                     <Scene hideNavBar key="Teacherchat" component={Teacherchat} />
                   <Scene hideNavBar key="Addhomework" component={Addhomework} />



                  <Scene hideNavBar  key="ShareScreenFirst" component={ShareScreenFirst} />
                  <Scene hideNavBar key="ShareScreenSecond" component={ShareScreenSecond}/>

                  <Scene hideNavBar key="BarberHome" component={BarberHome} initial={(this.props.userType == "Student") ? true : false} />
                  <Scene hideNavBar key="SchoolHome" component={SchoolHome} initial={(this.props.userType == "School") ? true : false} />
                  <Scene hideNavBar key="Teacherchatlist" component={Teacherchatlist}  />
                   <Scene hideNavBar key="Homework" component={Homework}  />
                  <Scene hideNavBar key="Homework2" component={Homework2}  />
                  <Scene hideNavBar key="Subjectlist" component={Subjectlist}  />
                  <Scene hideNavBar key="notifications" component={Notifications} />
                  <Scene hideNavBar key="Edit" component={Edit} />
                 <Scene hideNavBar key="Subjectliststudent" component={Subjectliststudent}  />
                 
                  <Scene hideNavBar key="TrainerGeoFence" component={TrainerGeoFence}  />  
                  <Scene hideNavBar key="BarberAcceptSuccess" component={BarberAcceptSuccess}  />  
                 
                  <Scene hideNavBar key="BarberWalk" component={BarberWalk} />
                  <Scene hideNavBar key="Viewquizassignments" component={Viewquizassignments} /> 

                  <Scene hideNavBar key="Viewquizdetail" component={Viewquizdetail} />

                 

                  <Scene hideNavBar key="CustomerHome" component={CustomerHome}  initial={(this.props.userType == "Teacher") ? true : false}  />
                  <Scene hideNavBar key="Task" component={Task} /> 
                  <Scene hideNavBar key="Addtask" component={Addtask} />
                  <Scene hideNavBar key="BookingDate" component={BookingDate} />
                  <Scene hideNavBar key="BookingTime" component={BookingTime} drawerLockMode ='locked-closed'  />
                  <Scene hideNavBar key="BookingSelect" component={BookingSelect} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="BookingTime" component={BookingTime} drawerLockMode ='locked-closed'  />
                  <Scene hideNavBar key="BookingService" component={BookingService} drawerLockMode ='locked-closed'  />
                  <Scene hideNavBar key="BookingPayMethod" component={BookingPayMethod} drawerLockMode ='locked-closed'  />
                  <Scene hideNavBar key="BookingDetail" component={BookingDetail} drawerLockMode ='locked-closed'  />
                  <Scene hideNavBar key="BookingSuccess" component={BookingSuccess} drawerLockMode ='locked-closed'  />                   
                  
                
                    
                     <Scene hideNavBar key="DriverHome" component={DriverHome}  /> 
                  <Scene hideNavBar key="CustomerGeoFence" component={CustomerGeoFence} initial={(this.props.userType == "Driver") ? true : false} />     
                  <Scene hideNavBar key="CustomerWalk" component={CustomerWalk} />                                      
          </Drawer>
        </Modal>
      </RouterWithRedux>

    );
  }
}
function bindAction(dispatch) {
  return {
    getAppConfig: () => dispatch(getAppConfig())

  };
}
const mapStateToProps = state => ({
  driverApproved: state.driver.user.isApproved,
  driverJwtAccessToken: state.driver.appState.jwtAccessToken,
  userType: state.driver.appState.userType,
  isLoggedIn: state.driver.appState.isLoggedIn,
});

export default connect(
  mapStateToProps,
  bindAction
)(AppNavigator);
