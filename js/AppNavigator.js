import React, { Component } from "react";
import { StatusBar, Platform, BackHandler } from "react-native";
import { connect } from "react-redux";
// import { Drawer } from "native-base";
import { Scene, Router, Actions,Drawer,Modal } from "react-native-router-flux";
import PropTypes from "prop-types";
import { closeDrawer } from "./actions/drawer";
import NavigationDrawer from "./DrawerNavigator";
import SplashScreen from "react-native-splash-screen";
import { statusBarColor } from "./themes/base-theme";
import { getAppConfig, createUuid } from "./actions/appConfig";
import Plan from "./components/common/plan/"
import Home from "./components/common/home/";
import Details from "./components/common/home/details";
import Slider from "./components/common/slider/";
import Login from "./components/common/login/";
import SignIn from "./components/common/signIn/";
import SignStart from "./components/common/signStart/";
import SideBar from "./components/driver/sideBar";
import SuccessStory from "./components/common/story/successStory"
import SignUp from "./components/common/signUp/";
import Register from "./components/common/register/";
import Forgotpassword from "./components/common/forgotpassword";
import Resetpassword from "./components/common/resetpassword";
import Changepassword from "./components/common/flow/changepassword";
import Notifications from "./components/common/notifications";
import About from "./components/common/about";
import Contact from "./components/common/contact";
import Bio from "./components/common/bio";
import Profile from "./components/common/profile";
import Match from "./components/common/match";
import Myprofile from "./components/common/myprofile";
import Editprofile from "./components/common/editprofile";
import Editprofile1 from "./components/common/editprofile1";
import Profilematch from "./components/common/profile/profilematch";
import Preferencelist from "./components/common/profile/preferencelist";
import Chat from "./components/common/chat";
import Chatlist from "./components/common/chatlist";
import Settings from "./components/common/settings";
import { _socket } from "./services/socket";

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {
  static propTypes = {
    driverJwtAccessToken: PropTypes.string,
    userType: PropTypes.string
  };
  componentWillMount() {
    _socket();
    this.props.getAppConfig();

  }
  
  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
    const {uuid} = this.props;
    if(!uuid)
     this.props.createUuid();
     

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
    return (

        // <StatusBar backgroundColor={statusBarColor} />
        <RouterWithRedux>
          <Modal>
             <Drawer key="SideBar"
                hideNavBar
               
                hideNavBar
               
                contentComponent={SideBar}
                drawerWidth ={300}
               
                >
                <Scene
                    key="slider"
                    component={Slider}
                    hideNavBar
                    drawerLockMode ='locked-closed'
                    
                  />
                  <Scene key="SuccessStory" component={SuccessStory} hideNavBar drawerLockMode='locked-closed'  />
                  <Scene key ="Plan" component={Plan} hideNavBar drawerLockMode='locked-closed' />
                  <Scene key="login" component={Login} hideNavBar drawerLockMode ='locked-closed'  />
                   <Scene hideNavBar key="Details" component={Details} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="Home" component={Home} drawerLockMode ='locked-closed' initial={ !this.props.driverJwtAccessToken ? true : false } />
                  <Scene hideNavBar key="signIn" component={SignIn} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="signStart" component={SignStart} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="signUp" component={SignUp} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="register" component={Register} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="Chatlist" component={Chatlist} drawerLockMode ='locked-closed' /> 
                  <Scene hideNavBar key="forgotpassword" component={Forgotpassword} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="resetpassword" component={Resetpassword} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="changepassword" component={Changepassword} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="bio" component={Bio} drawerLockMode ='locked-closed' />                         
                  <Scene hideNavBar key="notifications" component={Notifications} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="about" component={About} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="contact" component={Contact} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="Profile" component={Profile} drawerLockMode ='locked-closed'  /> 
                  <Scene hideNavBar key="match" component={Match} drawerLockMode ='locked-closed'/> 
                  <Scene hideNavBar key="Myprofile" component={Myprofile} drawerLockMode ='locked-closed' /> 
                  <Scene hideNavBar key="editprofile" component={Editprofile} drawerLockMode ='locked-closed'/>
                  <Scene hideNavBar key="editprofile1" component={Editprofile1} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="settings" component={Settings} drawerLockMode ='locked-closed' /> 
                  <Scene hideNavBar key="profilematch" component={Profilematch} drawerLockMode ='locked-closed' /> 
                  <Scene hideNavBar key="preferencelist" component={Preferencelist} drawerLockMode ='locked-closed' />   
                  <Scene hideNavBar key="Chat" component={Chat} drawerLockMode ='locked-closed' />
                  

          </Drawer>
        </Modal>
      </RouterWithRedux>

    );
  }
}
function bindAction(dispatch) {
  return {
    getAppConfig: () => dispatch(getAppConfig()),
    createUuid : () => dispatch(createUuid())
  };
}
const mapStateToProps = state => ({
  driverApproved: state.driver.user.isApproved,
  driverJwtAccessToken: state.driver.appState.jwtAccessToken,
  userType: state.driver.appState.userType,
  uuid : state.app.uuid
});

export default connect(
  mapStateToProps,
  bindAction
)(AppNavigator);
