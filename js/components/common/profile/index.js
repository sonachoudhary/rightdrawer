import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, FlatList,TouchableWithoutFeedback } from "react-native";
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

import { getMonthEarning, upcomingBooking } from "../../../actions/common/booking";
import RNFS from 'react-native-fs';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import  Footer  from "../../../components/footer";
 const uri= 'http://wesmart.in/backend/public/documents/'
function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    user_id: state.driver.user._id,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating,
    user: state.driver.user,
    userType: state.driver.appState.userType,
    appointmentList: state.booking.appointmentList,
    barberMonthEarning: state.booking.barberMonthEarning,
    data:state.driver.user.teacherinfo
  };
}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: uri+this.props.data.photo,
       teacherinfo:this.props.data
    };
  }
  // _pickImage(userDetails) {
  //   var options = {
  //     title: "Select Avatar",
  //     quality: 0.3,
  //     allowsEditing: true,
  //     aspect: [4, 3]
  //   };
  //   ImagePicker.showImagePicker(options, response => {
  //     if (response.didCancel) {
  //       this.setState({ image: this.props.profileUrl });
  //     } else if (response.error) {
  //       this.setState({ image: this.props.profileUrl });
  //     } else {
  //       let source = { uri: response.uri };
  //       let userData = Object.assign(userDetails, {
  //         profileUrl: source.uri
  //       });        
  //     }
  //   });
  // }


_pickImage() {
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
        if(response.uri!=undefined){
           var data = RNFS.readFile( response.uri, 'base64').then(res => { 
            
               //   let tempArray = this.state.image;
               // tempArray.push('data:image/png;base64,'+res);
                this.setState({image:response.uri });
                
            })

        }
    });
  }
  earning() {
    this.props.getMonthEarning();
    Actions.BarberEarnings();
  }

  async componentDidMount() {
   
    this.props.getMonthEarning();
    // this.props.getprofileteacherdata(this.props.data)
    //await this.props.getProfile(this.props.user_id);
    
  }

  renderItem2 = ({item, index}) => {
    return (
      <View style={{padding:10, borderWidth:1, width:80,marginLeft:10, borderColor:'#cccccc',marginRight:10,marginBottom:10}}>
        <Text style={{ fontSize:14, color: "#707070", marginLeft:15}}>{item.class}</Text>
      </View>
    )
  };

  render() {
    
    
    var social = false;
    if(this.props.userDetails && this.props.userDetails.socialId && this.props.userDetails.socialId !== '') {
      social = true;
    }
    
    return (
      <Container style={{backgroundColor:'#fff'}}>
      <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle}> 
           
          <View style={{flexDirection:'row',marginTop:'10%'}}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
               <Text style={styles.textheadingnewdata}> My profile</Text>
            </View>
          
           <View style={{ justifyContent:'center', marginTop:20,alignItems:'center',}} >
                {this.state.image ? 
                <Thumbnail

                  source={{ uri:this.state.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderWidth: 0,
                    borderColor: "transparent",
                    marginTop:10
                  }}
                />:<Image
                    source={require("../../../../assets/images/dummy_profile.png")}
                    style={{ width:100, height: 100, borderRadius:50 }}
                />}
                
                <TouchableOpacity style={{backgroundColor:'#FF7346',
                                        width:40,height:40,
                                        borderRadius:25,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        position:'absolute',right:'35%',opacity:0}}
                                  onPress={()=>this._pickImage()}
                                        >

                  <Image
                         source={require("../../../../assets/images/cemra4.png")}
                          style={{ marginTop:2,width:25,height:25 ,borderRadius:5,position:'absolute',}}
                      />
                </TouchableOpacity>
                

                <View style={{ justifyContent:'center', marginLeft:10 ,marginTop:10}} >
                 {this.props.data && <Text style={{ color:"#516091", fontSize:18, marginLeft:10, fontFamily:'Cabin-Bold' }}>
                    {this.props.data.name}
                  </Text>
                }
                {this.props.data.classes &&
                  <Text style={{ color:"#707070", fontSize:18, marginLeft:17, fontFamily:'Cabin-Bold' }}>
                     class {this.props.data.classes[0].class}
                  </Text>
                 } 

                </View>
              </View>
           
            </ImageBackground>
             <Content> 
             <View style={{backgroundColor:'#fff',}}> 
              <View style={{ borderColor:'#707E85', color:'#707E85'}} >
                <TouchableOpacity>
                  <View style={{ flexDirection:'row',marginTop:10, paddingTop:20,paddingLeft:20,paddingBottom:5 }} >
                      <Image
                         source={require("../../../../assets/icon/back.png")}
                          style={{ marginTop:2  }}
                      />
                      <Text style={{ fontSize:14, color: "#707070", width: deviceWidth/3, textAlign:'left',paddingLeft:15, fontWeight:'bold' }}>Email :</Text>
                      <Text style={{ fontSize:14, color: "#707070" }}>{this.props.data.email}</Text>
                  </View>  
                </TouchableOpacity>
              </View>


               <View style={{ borderColor:'#707E85', color:'#707E85'}} >
                <TouchableOpacity>
                  <View style={{ flexDirection:'row',marginTop:10, paddingTop:20,paddingLeft:20,paddingBottom:5 }} >
                      <Image
                         source={require("../../../../assets/icon/back.png")}
                          style={{ marginTop:2  }}
                      />
                      <Text style={{ fontSize:14, color: "#707070", width: deviceWidth/3, textAlign:'left',paddingLeft:15, fontWeight:'bold' }}>Mobile Number :</Text>
                      <Text style={{ fontSize:14, color: "#707070" }}>{this.props.data.phone}</Text>
                  </View>  
                </TouchableOpacity>
                
              </View>


               <View style={{ borderColor:'#707E85', color:'#707E85'}} >
                <TouchableOpacity>
                  <View style={{ flexDirection:'row',marginTop:10, paddingTop:20,paddingLeft:20,paddingBottom:5 }} >
                      <Image
                         source={require("../../../../assets/icon/back.png")}
                          style={{ marginTop:2  }}
                      />
                      <Text style={{ fontSize:14, color: "#707070", width: deviceWidth/3, textAlign:'left',paddingLeft:15, fontWeight:'bold' }}>Adderss :</Text>
                      <Text style={{ fontSize:14, color: "#707070" }}>{this.props.data.address}</Text>
                  </View>  
                </TouchableOpacity>
              </View>


               <View style={{ borderColor:'#707E85', color:'#707E85'}} >
                <TouchableOpacity>
                  <View style={{ flexDirection:'row',marginTop:10, paddingTop:20,paddingLeft:20,paddingBottom:5 }} >
                      <Image
                         source={require("../../../../assets/icon/back.png")}
                          style={{ marginTop:2  }}
                      />
                      <Text style={{ fontSize:14, color: "#707070", width: deviceWidth/3, textAlign:'left',paddingLeft:15, fontWeight:'bold' }}>Gender :</Text>
                      <Text style={{ fontSize:14, color: "#707070" }}>{this.props.data.gender}</Text>
                  </View>  
                </TouchableOpacity>
              </View>


               <View style={{ borderColor:'#707E85', color:'#707E85'}} >
               <TouchableOpacity>
                  <View style={{ flexDirection:'row',marginTop:10, paddingTop:20,paddingLeft:20,paddingBottom:5 }} >
                      <Image
                         source={require("../../../../assets/icon/back.png")}
                          style={{ marginTop:2  }}
                      />
                      <Text style={{ fontSize:14, color: "#707070", width: deviceWidth/3, textAlign:'left',paddingLeft:15, fontWeight:'bold' }}>Joining Date :</Text>
                      <Text style={{ fontSize:14, color: "#707070" }}>{this.props.data.joiningdate}</Text>
                  </View>  
                </TouchableOpacity>
              </View>
               
              <View style={{ borderColor:'#707E85', color:'#707E85', }} >
                <TouchableOpacity>
                <View style={{ flexDirection:'row',  marginTop:10, paddingTop:20,paddingLeft:20,paddingBottom:5 }} >
                    <Image
                       source={require("../../../../assets/icon/back.png")}
                        style={{ marginTop:2  }}
                    />
                    <Text style={{ fontSize:14, color: "#707070", width: deviceWidth-80, marginLeft:15, fontWeight:'bold' }}>Classes</Text>
                    </View>  
                    <FlatList
                       style={{ margin:10}}
                       data={this.props.data.classes}
                       numColumns={3}
                       renderItem={this.renderItem2}
                   />
                </TouchableOpacity>
              </View>
              </View>
            </Content>
         <Footer />
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
     
      
    getMonthEarning:() => dispatch(getMonthEarning()),
    upcomingBooking:(user_id) => dispatch(upcomingBooking(user_id)),
  };
}


export default connect(
  mapStateToProps,
  bindActions
)(Profile);
