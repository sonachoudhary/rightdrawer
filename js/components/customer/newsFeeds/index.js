import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions, FlatList,Alert } from "react-native";
import {
  Tab,
  Tabs, 
  ScrollableTab,
  TabHeading,
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
  Text,
  Item,
  Title,
  Left,
  Right,
  Label,
  Body,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { fetchNewsListCustomerAsync } from "../../../actions/common/newsfeed";
import Modal from "react-native-modal";

const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    newslist: state.customer.newsfeed.newslist,
    user_id: state.driver.user._id
  };
}

class CustomerNewsFeed extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchNewsListCustomerAsync: PropTypes.func,
    loadSpinner: PropTypes.bool,
    newslist: PropTypes.array,    
  };

  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      image: null,
      render: false,
      //trainerProfileId: this.props.trainerProfileId,
      jwtAccessToken: this.props.jwtAccessToken,
      user_id: this.props.user_id,
      modalVisible: false,
      customerName: '',
      modalDataStatus: '',
      trainingTime:''
    };
    
    //this.props.dispatch(getProfileData(this.state.trainerProfileId));    
  }

  setModalVisible(visible) {
     this.setState({modalVisible: visible});
  }

  async componentDidMount() {
    await this.props.fetchNewsListCustomerAsync(this.state.user_id);
  }

  async fetchAppointmentList() {
    await this.props.fetchNewsListCustomerAsync(this.state.user_id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  openConfirmPopup(item,status){
    this.setState({
      customerName: item.clname+" "+item.cfname,
      modalDataStatus: status,
      trainingTime: item.time
    })
    this.setModalVisible(true)
  }

  confirmAppointment(){
    this.fetchAppointmentList()
    this.setModalVisible(false)
  }

  rejectAppointment(){
    this.fetchAppointmentList()
    this.setModalVisible(false)
  }

  renderRow = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
      >
        <View style={styles.outerDiv}>
          <Text style={styles.feedDiv}>{item.feed}</Text>
          <Text style={styles.timeSpan}> {item.time} </Text>          
        </View>
      </ListItem>
    );
  };

  renderEmptyContainer = () => {
    return (        
      <Text style={ styles.emptyMessageStyle }>No Newsfeed</Text>                  
    );
  };

  render() {
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#fff" }}
              />
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
              Newsfeed
            </Title>
          </Body>
          <Right/>            
        </Header>
        
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <View>
            <FlatList
              data={this.props.newslist}
              renderItem={this.renderRow}
              style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}
              ListEmptyComponent={this.renderEmptyContainer()}
              />
          </View>
          
          <Modal
              animationType="slide"
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
                <View style={styles.modalView}>
                  <Text style={{ color: "#000", fontSize:24, marginTop:20, textAlign:"center" }}>{this.state.customerName}</Text>
                  <Text style={{ color: "#000", fontSize:16, marginTop:10, textAlign:"center" }}>{this.state.trainingTime}</Text>

                  {
                    this.state.modalDataStatus == 'pending' && 
                    <View>
                      <Text style={{ color: "#000", marginTop:10, textAlign:"center" }}> Please check and confirm for the appointment.</Text>
                      <View style={{ flexDirection: "row", justifyContent: "center", margin:10,  }}>
                        <Button
                          block
                          style={styles.completeBtn}
                          onPress={() => this.confirmAppointment() } >
                            <Text style={{ alignSelf: "center", color: "#000" }}> Confirm </Text>
                        </Button>

                        <Button
                          block
                          style={[styles.completeBtn,{marginLeft:20}]}
                          onPress={() => this.rejectAppointment() } >
                            <Text style={{ alignSelf: "center", color: "#000" }}> Reject </Text>
                        </Button>
                      </View>
                    </View>
                  }

                  {
                    this.state.modalDataStatus != 'pending' && 
                    <View>
                      <View style={{ flexDirection: "row", justifyContent: "center", margin:10,  }}>
                        <Button
                          block
                          style={styles.completeBtn}
                          onPress={() => this.confirmAppointment() } >
                            <Text style={{ alignSelf: "center", color: "#000" }}> Close </Text>
                        </Button>                       
                      </View>
                    </View>
                  }
              </View>
          </Modal>
        </Content>        
        
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    fetchNewsListCustomerAsync: user_id =>
      dispatch(fetchNewsListCustomerAsync(user_id))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(CustomerNewsFeed);
