'use strict';

import {Linking} from "react-native";

let regex = {

  isEmpty: function (val) {
    switch (val) {
      case "":
      case 0:
      case "0":
      case null:
      case false:
      case typeof this === "undefined":
        return true;
      default:
        return false;
    }
  },

  validateEmail: function (val) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
  },

  validatePassword: function (val) {
    return /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_]\S{5,16}$/.test(val);
  },

  matchPassword: function (val1, val2) {

    if (val1 !== val2) {
      return false
    } else {
      return true
    }

  },

  checkPicture: function (val) {
    if (this.isEmpty(val)) {
      return 'https://s3.amazonaws.com/mane-emergency-me/user.png'
    } else {
      let pattern = /^((http|https|ftp):\/\/)/;
      if (!pattern.test(val)) {
        return 'https://s3.amazonaws.com/mane-emergency-me/user.png'
      } else {
        return val;
      }
    }
  },

  sortData: function (property) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  },

  isInt: function (n) {
    return Number(n) === n && n % 1 === 0;
  },

  isFloat: function (n) {
    return Number(n) === n && n % 1 !== 0;
  },

  openLink: function (url) {
    
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  },

  

  
};

module.exports = regex;
