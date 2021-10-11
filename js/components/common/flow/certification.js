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

class Certification extends Component {
  navigate(key, name) {
    Actions.uploadFiles({ keys: key, Filename: name });
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCertification: [],
      documentTypes: [
        {
          name: "ACE (American council on exercise)",
          key: "ACE (American council on exercise)",
          show: false
        },
        {
          name: "ACSM (American college of sports medicine)",
          key: "ACSM (American college of sports medicine)",
          show: false
        },
        {
          name: "ISSA (International sports sciences association)",
          key: "ISSA (International sports sciences association)",
          show: false
        },
        {
          name: "NASM (National academy of sports medicine)",
          key: "NASM (National academy of sports medicine)",
          show: false
        },
        {
          name: "NSCA (National strength conditioning association)",
          key: "NSCA (National strength conditioning association)",
          show: false
        },
        {
          name: "Other",
          key: "Other",
          show: false
        },
        {
          name: "N/A",
          key: "N/A",
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
      if (this.state.documentTypes[i].key === value && this.state.documentTypes[i].show == false) {
        this.state.documentTypes[i].show = true
        this.forceUpdate()
        this.setState({
          selectedCertification: [...this.state.selectedCertification, this.state.documentTypes[i].key]
        })
      } else if (this.state.documentTypes[i].key === value && this.state.documentTypes[i].show == true) {
        this.state.documentTypes[i].show = false
        this.forceUpdate()
        const index = this.state.selectedCertification.indexOf(this.state.documentTypes[i].key);
        if (index > -1) {
            this.state.selectedCertification.splice(index, 1);
        }
        this.setState({
          selectedCertification: this.state.selectedCertification
        })
      }
    }    
  }

  renderRow = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.callAction(item.key)}
      >
        <View style={styles.listContainernew1}>
          <View style={styles.rightText}>{this.renderIcon(item.show)}</View>

          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.name}</Text>
          </View>
          
        </View>
      </ListItem>
    );
  };

  certFormAsync = async (values) => {
    
    try {
      await AsyncStorage.setItem('driverRegistration.cert', JSON.stringify(values));
    } catch (error) {
      
    }
    Actions.specialty()
  };

  backgroundSubmit() {
      
     if(this.state.selectedCertification.length<1){
        alert('Please select Certification');
    }else {
        var values = { "certification":this.state.selectedCertification}
        this.certFormAsync(values)
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
            <Button transparent onPress={() => Actions.background()}>
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
          
          <Text style={styles.topheading}>What certification do you have?</Text>
          <Text style={{ color: "#000",paddingLeft:30,paddingTop:0,fontSize:15,marginBottom:30 }}>(Choose all that apply)</Text>
         
          <FlatList
            data={this.state.documentTypes}
            renderItem={this.renderRow}
            style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>

          <Button
            block
            style={styles.completeBtn}
            onPress={() => this.backgroundSubmit()}
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

export default connect(mapStateToProps, null)(Certification);
