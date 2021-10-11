import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import {
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
  Spinner,
  Body,
  Label,  
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfile } from "../../../actions/common/all";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    user_id: state.driver.user._id,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null
    };
  }
  _pickImage(userDetails) {
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        this.setState({ image: this.props.profileUrl });
      } else if (response.error) {
        this.setState({ image: this.props.profileUrl });
      } else {
        let source = { uri: response.uri };
        let userData = Object.assign(userDetails, {
          profileUrl: source.uri
        });        
      }
    });
  }

  async componentDidMount() {
    
    //await this.props.getProfile(this.props.user_id);
  }

  render() {
    var userType = this.props.userDetails.userType;

    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
              
              <View style={{ flexDirection:'row', marginTop:20 }} >

                <View style={{  marginLeft:5 }} >
                  <Button transparent onPress={() => Actions.pop()}>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
                      
                </View>
                </View>
                 <View style={{ flexDirection:'row', marginTop:20 }} >

                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:18, marginLeft:10 }}>
                    Check your booking details
                  </Text>     

                </View>
              </View>

              <View style={{ flexDirection:'row', marginTop:20,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >Date</Text>
              </View>
              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >July 12, 2020</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop:10,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >Time</Text>
              </View>
              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >9:00 to 10:00 AM</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop:10,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >Barber Shop</Text>
              </View>
              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >HoldThatChair</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop:10,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >Barber</Text>
              </View>
              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 10 }} >John West</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop:10,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >Service</Text>
              </View>
              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >1.Regular hair cut</Text>
              </View>
               <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >2.Hair color</Text>
              </View>
               <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15 }} >3.Foot massage</Text>
              </View>

               <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >

                <Button
                  block
                  style={{ padding: 10, height: 55, marginHorizontal: 5, marginTop:10, marginBottom:10, bottom: 0, backgroundColor:"#392F2A", width:316 }}
                  >
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}> Book Now </Text>
                </Button>
              </View>



              
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    getProfile: user_id => dispatch(getProfile(user_id)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Appointments);
