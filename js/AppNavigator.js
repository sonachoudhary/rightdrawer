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

import Home from "./components/common/home/";
import Details from "./components/common/home/details";

import Login from "./components/common/login/";
import SignIn from "./components/common/signIn/";
import SignStart from "./components/common/signStart/";
import SideBar from "./components/sidebar/sideBar";

import SignUp from "./components/common/signUp/";
import Register from "./components/common/register/";

import Myprofile from "./components/common/myprofile";
import Profile from "./components/common/profile";


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
               drawerPosition= "right"

                hideNavBar
               
                contentComponent={SideBar}
                drawerWidth ={300}
               
                >
                
                  
                  <Scene key="login" component={Login} hideNavBar drawerLockMode ='locked-closed'  />
                   <Scene hideNavBar key="Details" component={Details} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="Home" component={Home} drawerLockMode ='locked-closed'  initial={ !this.props.driverJwtAccessToken ? true : false }/>
                  <Scene hideNavBar key="signIn" component={SignIn} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="signStart" component={SignStart} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="signUp" component={SignUp} drawerLockMode ='locked-closed' />
                  <Scene hideNavBar key="register" component={Register} drawerLockMode ='locked-closed' />
                 
                  <Scene hideNavBar key="Profile" component={Profile} drawerLockMode ='locked-closed'  /> 
                 
                  <Scene hideNavBar key="Myprofile" component={Myprofile} drawerLockMode ='locked-closed' /> 
                 
                  

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
