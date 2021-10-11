import React from "react";
import Setup from "./js/setup";
//navigator.geolocation = require('@react-native-community/geolocation');



export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <Setup />;
  }
}
