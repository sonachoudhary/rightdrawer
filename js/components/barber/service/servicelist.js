import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox, FlatList } from "react-native";
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
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getBarberServices, editService } from "../../../actions/common/booking";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import SearchableDropdown from 'react-native-searchable-dropdown';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,
    barberSpecificService: state.booking.barberSpecificService   
  };
}

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      items : this.props.barberList,
      selectedBaberId: undefined,
      selectedBaberName: undefined,
      error: false 
    };
  }
  

  componentDidMount(){
    this.props.getBarberServices();
  }

  editService(item){
    this.props.editService(item);
  }

  renderBarberList = ({item, index}) => {
    if(item.name.trim()!='null'){
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft:10, marginRight:10, padding:5, flexDirection:'row' }} >
          <Text style={{ padding:10, color:'#E8E8E8', height:45, width:deviceWidth-80, fontSize:16}} onPress={()=> this.editService(item)} >{item.name}</Text>          

          <Text style={{ padding:10, color:'#E8E8E8', height:45, width:60, right:10, fontSize:16}} onPress={()=> this.editService(item)} >${item.price}</Text>                       
        </View>
      )  
    }    
  };

  render() {
   

    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
                           
              <View style={{ flexDirection:'row', marginTop:20 }} >
                <View style={{  marginLeft:5, width:deviceWidth-40 }} >
                  <Button transparent onPress={()=>Actions.BarberHome()}>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text onPress={()=>Actions.BarberHome()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                      Back
                    </Text> 
                  </Button>                      
                </View>
                <View style={{  right:15, marginTop:15, width:40 }} >       
                  <TouchableOpacity onPress={() => Actions.CreateService() }>    
                    <Text onPress={()=>Actions.CreateService()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                        Add
                    </Text> 
                  </TouchableOpacity>
                </View>

              </View>

              <View style={{ flexDirection:'row', marginTop:40 }} >
                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:28, marginLeft:10, fontWeight:'600' }}>
                    Services
                  </Text>     
                </View>
              </View> 

              {this.state.error && 
              <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor:"#B14C60", width: deviceWidth-40, marginTop:30 }}>
                  <Text style={{ textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular' }}>
                    Please select a barber.
                  </Text>
                </View>
              </View>
              }
              
              <FlatList
                data={this.props.barberSpecificService}
                extraData={this.props.barberSpecificService}
                renderItem={this.renderBarberList} />              

        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    getBarberServices: () => dispatch(getBarberServices()),
    editService: (item) => dispatch(editService(item)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(ServiceList);
