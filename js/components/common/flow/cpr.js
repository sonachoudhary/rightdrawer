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

class Cpr extends Component {
  navigate(key, name) {
    Actions.uploadFiles({ keys: key, Filename: name });
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCpr: [],
      documentTypes: [
        {
          name: "Yes",
          key: "yes",
          show: false
        },
        {
          name: "No",
          key: "no",
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
          selectedCpr: this.state.documentTypes[i].key
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
        <View style={styles.listContainer}>
          <View style={styles.rightText}>{this.renderIcon(item.show)}</View>

          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.name}</Text>
          </View>
          
        </View>
      </ListItem>
    );
  };

  cprFormAsync = async (values) => {
    
    try {
      await AsyncStorage.setItem('driverRegistration.cpr', JSON.stringify(values));
    } catch (error) {
      
    }
    Actions.insurance()
  };

  cprSubmit() {
    
    var values = { "CPR":this.state.selectedCpr}
    this.cprFormAsync(values)
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
            <Button transparent onPress={() => Actions.rates()}>
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
          
          <Text style={styles.topheading}>Are you CPR certified?</Text>

          

          <Text style={Platform.OS === "ios" ? styles.cprtext : styles.cprtext1}>(Optional)</Text>
          <FlatList
            data={this.state.documentTypes}
            renderItem={this.renderRow}
            style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>

          <Button
            block
            style={styles.experienceButton}
            onPress={() => this.cprSubmit()}
          >
            <Text style={{ alignSelf: "center", fontSize:20,color:'#FFFFFF'}}>
              NEXT  {" "}
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

export default connect(mapStateToProps, null)(Cpr);