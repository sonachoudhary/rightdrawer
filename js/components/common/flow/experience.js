import React, { Component } from "react";
import { AsyncStorage, View, Platform, FlatList } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Title,
  Left,
  Right,
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import update from 'react-addons-update'; // ES6


class Experience extends Component {
  navigate(key, name) {
    Actions.uploadFiles({ keys: key, Filename: name });
  }
   
  constructor(props) {
   
    super(props);
    this.state = {
       selectedExp: [],
       documentTypes : [
        {
          name: "1 year or less",
          key: "one",
          show: false
        },
        {
          name: "2-4 years",
          key: "two",
          show: false
        },
        {
          name: "5+ years",
          key: "five",
          show: false
        }
      ]
    };
  }

 

  renderArrow() {
    return (
      <Icon
        name="ios-arrow-forward"
        style={{
          ...styles.textColor,
          color: "#aaa",
          fontWeight: "bold",
          fontSize: 22
        }}
      />
    );
  }
  renderCheck() {
    return (
      <Icon
        name="checkmark"
        style={styles.checkmarkcls}
      />
    );
  }

  renderIcon(key) {
    if(key === true) {
      return this.renderCheck()
    } else {
      return null;
    }    
  }

  callAction(value){
    for (var i = 0; i < this.state.documentTypes.length; i++) {
      if (this.state.documentTypes[i].key === value) {
        this.state.documentTypes[i].show = true
        this.forceUpdate()
        this.setState({
          selectedExp: this.state.documentTypes[i].key
        })
      } else {
        this.state.documentTypes[i].show = false
      }
    }
       
  }

  renderRow = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.callAction(item.key)}
      >
        <View style={styles.listContainernew}>
          <View style={styles.rightText}>{this.renderIcon(item.show)}</View>

          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.name}</Text>
          </View>
          
        </View>
      </ListItem>
    );
  };

  expFormAsync = async (values) => {
    
    try {
      await AsyncStorage.setItem('driverRegistration.exp', JSON.stringify(values));
    } catch (error) {
      
    }
    Actions.address()
  };

  expSubmit() {
    if (this.state.selectedExp=="") {
         alert('Please select experience');
    }else {
      var values = { "Experience":this.state.selectedExp}
      this.expFormAsync(values)
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          iosBarStyle="dark-content"
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.phone()}>
              <Icon
                name="md-arrow-back"
                style={styles.backbuttonarrowcolor}
              />
             <Text style={styles.backbuttoncolor}>{" "}Back</Text>
            </Button>
          </Left>
          
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Documents
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          
          <Text style={styles.topheading}>How long have you been a Trainer/Instructor?</Text> 
          
          <FlatList
            data={this.state.documentTypes}
            renderItem={this.renderRow}
            style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>

          <Button
            block
            style={styles.experienceButton}
            //onPress={() => Actions.address()}
            onPress={() => this.expSubmit()}
          >
            <Text style={{ alignSelf: "center", fontSize:20,color:'#FFFFFF' }}>
              NEXT {" "}
              <Icon
                name="md-arrow-forward"
                style={{
                  fontSize: 16,
                  marginLeft: 40,
                  paddingTop:7,
                  paddingLeft:40,
                  color: "#FFF"
                }}
              />
            </Text>
          </Button>

        </Content>
        

        

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}

export default connect(mapStateToProps, null)(Experience);
