import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, FlatList } from "react-native";
import {
  Tabs, 
  TabHeading,
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Label,
  ListItem,
  Body,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";
import { getTrainerReview } from "../../../actions/common/booking";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    trainerProfileId: state.driver.user.trainerProfileId,
    trainerReviewList: state.customer.common.trainerReviewList
  };
}
class Tab2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      render: false
    };
  }

  async componentDidMount() {
    await this.props.getTrainerReview(this.props.trainerProfileId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  renderRow = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
      >
        <Item
          stackedLabel
          style={styles.itemBox}
        >
          <Label style={styles.label} note>
            {item.customer_id.lname} {item.customer_id.fname}
          </Label>
          <Text style={styles.textstack} >
            {item.review}
          </Text>
        </Item>
      </ListItem>
    );
  };

  renderEmptyContainer = () => {
    return (        
      <Text style={ styles.emptyMessageStyle }>No Reviews</Text>                  
    );
  };

  render() {
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>        
        <Content>
          <View style={{ padding: 15 }}>
            
            <FlatList
              data={this.props.trainerReviewList}
              renderItem={this.renderRow}
              style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}
              ListEmptyComponent={this.renderEmptyContainer()}
            />

          </View>
        </Content>         
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    getTrainerReview: user_id => dispatch(getTrainerReview(user_id))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Tab2);
