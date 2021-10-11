import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions, FlatList, TouchableHighlight,Alert } from "react-native";
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
import { fetchFavorite } from "../../../actions/common/booking";
import Modal from "react-native-modal";
const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    newslist: state.customer.newsfeed.newslist,
    user_id: state.driver.user._id,
    favoriteTrainerList: state.customer.common.favoriteTrainerList,
  };
}

class Favorite extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchFavorite: PropTypes.func,
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
    await this.props.fetchFavorite(this.state.user_id);
  }

  async fetchAppointmentList() {
    await this.props.fetchFavorite(this.state.user_id);
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

  callTrainerProfile(userId) {
    this.props.getProfileData(userId)    
  }

  renderRow = ({ item }) => {
    var name = item.trainer_id.lname + " " + item.trainer_id.fname;    
    return (
      <ListItem
        style={styles.listcustom}
       
      >
        <View style={styles.outerDiv}>
          <Thumbnail
              source={{ uri: item.trainer_id.profileUrl }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 10,
                borderWidth: 0,
                borderColor: "transparent"
              }} />
            <TouchableHighlight underlayColor='none' onPress={() => this.callTrainerProfile(item.trainer_id._id)} >
              <Text style={styles.feedDiv}>{name}</Text>     
            </TouchableHighlight>     
        </View>
      </ListItem>
    );
  };

  renderEmptyContainer = () => {
    return (        
      <Text style={ styles.emptyMessageStyle }>No Favorites</Text>                  
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
              Favorites
            </Title>
          </Body>
          <Right/>            
        </Header>
        
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <View>
            <FlatList
              data={this.props.favoriteTrainerList}
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
    fetchFavorite: user_id => dispatch(fetchFavorite(user_id)),
    getProfileData: userId => dispatch(getProfileData(userId)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Favorite);
