import {Modal, View, Text,BackHandler,CheckBox ,FlatList,ActivityIndicator,TouchableOpacity,KeyboardAvoidingView,ScrollView,Image,Dimensions} from "react-native";
import React, { Component } from "react";
import { Actions, ActionConst } from "react-native-router-flux";
import ImagePicker from "react-native-image-picker";

import styles from "./styles";
import SplashScreen from "react-native-splash-screen";
import DatePicker from 'react-native-datepicker'; 
import moment from "moment/moment";
import { connect } from "react-redux";
import config from "../../../../config.js";
import MultiSelect from 'react-native-multiple-select';
import RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';


import { 

  Container,
  Content,
  Header,
  
  Button,
  Icon,
  Title,
   Input,Item,
} from "native-base";

const extensions = ['.mp3', '.doc', '.docx', '.pdf'];

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
function mapStateToProps(state) {
  return {
   
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid,
    schoolid:state.driver.user.teacherlogin.schoolid,
    data:state.driver.user.teacherinfo,
     classlist:state.driver.user.classlist,
   };
}
class Addfeeds extends Component {
  constructor(props) {
    super(props);
   
    var getcls = [];
    for(var i=0; i< this.props.classlist.length; i++){
        getcls.push(this.props.classlist[i].id);
    }
    this.state = {
      color:[{id:1,color:'#FF9800',checked:0},{id:1,color:'#53B958'},{id:1,color:'#007BFF'},{id:1,color:'#E83E8C'},{id:1,color:'#D80B4E'}],
      checked:true,
      title:'',
      Descriptions:'',
      Date:new Date(),
      Time:"",
      sendto:getcls,
      filedata:[],
      items:this.props.classlist,
      selectedItems:[],
      showloader:false,
      showmodal:false,
      video:false
     };
    
  }

  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  selectedoptions(value){
     
    this.setState({selected: value})
   
  }

  deleteimagedata(filedata){
      
      if(this.state.filedata.includes(filedata) == true){
         this.state.filedata.pop(filedata);
         this.setState({filedata:this.state.filedata});
      }
   }

  showmodal(){
    this.setState({ showmodal:true })
  }


   renderimage=(item,index)=>{

      return(
               <View style={{height:50}}>
                 { this.state.video==true ?
                   <Image source={require("../../../../assets/images/play_icon.png")} style={{ width:40, height: 40,marginLeft:10, }} /> 
                :
                  <Image source={{ uri: item.item }} style={{ width:40, height: 40,marginLeft:10, }} /> 
                }
                  { item.item.length>0 &&
                    <TouchableOpacity onPress={()=>this.deleteimagedata(item.item)} style={{position:'absolute',top:0,right:0}}>
                      <Image source={require("../../../../assets/images/Group_17099.png")} style={{ width:18.04, height: 18.71 }} />
                    </TouchableOpacity>
                  }
               </View>
      )
  }


  _pickImage() {
     this.setState({showloader:false,video:false,showmodal:false})
    var options = {
      title: "Select Avatar",
      storageOptions: {
                skipBackup: true,
                path: 'images',
            },
             mediaType: 'photo',
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
        if(response.uri!=undefined){
           var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                let tempArray = this.state.filedata;
                tempArray.push('data:image/png;base64,'+res);
                this.setState({filedata:tempArray });
            })
        }
    });
  }

  _pickImage1() {
    if(this.state.filedata.length >0){
        alert('You only attach one video, please remove added files to continue')
    }else {
      this.setState({showmodal:false})
      var options = {
        title: "Select Video",
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        mediaType: 'video',
        videoQuality: 'low',
        durationLimit:180,
      };
      ImagePicker.launchImageLibrary(options, response => {
        
          this.setState({showloader:true,video:true})
          if(response.uri!=undefined){
             var data = RNFS.readFile( response.uri, 'base64').then(res => { 
               console.log('res',res);
                  let tempArray = this.state.filedata;
                  tempArray.push('data:video/mp4;base64,'+res);
                  this.setState({filedata:tempArray });
                  this.setState({showloader:false})
              })
          }else {
            this.setState({showloader:false})
          }
      });
    }
  }

  _pickImage2(){
    if(this.state.filedata.length >0){
        alert('You only attach one file, please remove added files to continue')
    }else {
      this.setState({showmodal:false,video:true})

    FilePickerManager.showFilePicker(null, (response) => {
          if (response.didCancel) {
            
          }
          else if (response.error) {
            
          }else {
              if(response.type=='application/pdf'){
                  if(response.uri!=undefined){
                     var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                          let tempArray = this.state.filedata;
                          tempArray.push('data:application/pdf;base64,'+res);
                          this.setState({filedata:tempArray });
                      })
                  }                  
              }else {
                alert('Only pdf file allowed')
              }
         }
        
      });
    }
  }

  _pickImage3(){

    if(this.state.filedata.length >0){
        alert('You only attach one file, please remove added files to continue')
    }else {
      this.setState({showmodal:false,video:true})

    FilePickerManager.showFilePicker(null, (response) => {
      console.log('response',response);
      // console.log('responseuri',response);
          if (response.didCancel) {
            
          }
          else if (response.error) {
            
          }else {
             // if(response.type=='audio/mpeg' || response.type=='audio/ogg){
                  this.setState({showloader:true,video:true})
                  if(response.uri!=undefined){
                     var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                          
                          let tempArray = this.state.filedata;

                          tempArray.push('data:video/mp3;base64,'+btoa(res));
                          this.setState({filedata:tempArray });
                          this.setState({showloader:false})
                      })
                  }else {
                    this.setState({showloader:false})
                  }
              //}else {
                //alert('Only mp3 file allowed')
              //}
         }
        
      });
     }

  }
  
  _pickImage4(){

    if(this.state.filedata.length >0){
        alert('You only attach one file, please remove added files to continue')
    }else {
      this.setState({showmodal:false,video:true}) 

    FilePickerManager.showFilePicker(null, (response) => {
          if (response.didCancel) {
            
          }
          else if (response.error) {
            
          }else {
              if(response.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
                  if(response.uri!=undefined){
                     var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                          let tempArray = this.state.filedata;
                          tempArray.push('data:application/doc;base64,'+res);
                          this.setState({filedata:tempArray });
                      })
                  }
              }else {
                alert('Only document file allowed')
              }
         }
        
      });

     }

  }
  

  savebtn(){
    if(this.state.title==""){
      alert('Title required')
    } else if(this.state.Descriptions==""){
      alert('Descriptions required')
    }
     var bodyData={};
     bodyData.schoolid=this.props.schoolid;
     bodyData.teacherid=this.props.userid;
     bodyData.title=this.state.title;
     bodyData.message=this.state.Descriptions;
     bodyData.to=this.state.selectedItems;
     bodyData.filedata=this.state.filedata;
     this.setState({showloader:true})
     
    if(this.state.Descriptions==""){
      alert('Descriptions required')
    } else{
     
      fetch(`${config.serverSideUrl}/teacherbroadcastcreate9`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
           body: JSON.stringify(bodyData)
        })
        .then(resp => resp.json())
        .then(data => {
          console.log('data',data);
           var tokenData=data.token;

           for(var i=0; i<tokenData.length; i++){

               const userEmail = { message:data.message,
                token: tokenData[i]};
              
                fetch(`http://54.160.96.88:13678/callpushNotification`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userEmail)
              })
                .then(response => response.json())
                .then(data => {
                  
                })
                .catch(error => {
                  // alert('fa')
                });
            }
           
            if(data!=null){
              this.setState({showloader:false})
           
              alert('Feed added successfully');
                this.setState({data2:data});
                Actions.Feedback();
              }
         })
        .catch(e => {
          console.log('e',e);
          this.setState({showloader:false})
          alert('Getting error while uplaoding this document, try some other files');
                  
        });
      
    }

  }
  
 
clearSelectedCategories = () => {
   this._multiSelect._removeAllItems();
};


  
  render() {
    
    const { selectedItems } = this.state;
    return (
      <Container style={{backgroundColor:'#fff'}}>
      <View style={{ flex: 1, justifyContent: 'center',marginTop:'5%'}} behavior="padding"  keyboardVerticalOffset={30}>
            <View style={{ flexDirection:'row',backgroundColor:'#FFFFFF',justifyContent:'space-between',alignItems:'center'}} >
                <View style={{  flexDirection:'row',marginBottom:10}} >
                    <Button transparent onPress={() =>Actions.pop()}>
                       <Icon
                        name="md-arrow-back"
                        style={{ fontSize:deviceHeight/30, color: "#000000" }}
                      />                          
                    </Button>
                  <View style={{ flexDirection:'row'}} >
                    <Text style={{ color:"#000", fontSize:deviceHeight/44,fontWeight:'bold',marginTop:10}}>
                        Add Feeds
                      </Text>     
                  </View>
                </View>
            </View>
      <ScrollView>
       
      <View style={{backgroundColor:'#F0F0F0',marginTop:10}}> 
        <MultiSelect
          hideTags
          ref={c => this._multiSelect = c}

          items={this.state.items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Class"
          searchInputPlaceholderText="Search class..."
          onChangeInput={ (text)=> console.log(text)}
         
          tagRemoveIconColor="#FFFFFF"
          styleTextDropdown={{paddingLeft:'5%'}}
          styleTextDropdownSelected={{paddingLeft:'5%'}}
          tagBorderColor="#7FBD7B"
          tagContainerStyle={{backgroundColor:'#7FBD7B'}}
          tagTextColor="#fff"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#7FBD7B"
          itemTextColor="#000"
          displayKey="class"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#7FBD7B"
          submitButtonText="Close"
        />
          {selectedItems.length>0 &&
            <View style={{margin:5}}>
              {this.multiSelect.getSelectedItemsExt(selectedItems)}
            </View>
          }
          <View style={{backgroundColor:'#fff'}}>
            <Item regular  style={styles.input}>
                <Input   placeholder='Title'
                            style={{ color:'#000', height:40, width:'90%', fontSize:16, padding:5,borderRadius:5}}
                            placeholderTextColor="#777"
                            editable={true}
                            onChange={(event) => this.setState({title: event.nativeEvent.text})}
                            value={this.state.title}
                        />  
            </Item>
            <Item regular  style={styles.input1}>
                <Input  placeholder='Descriptions'
                            style={{ color:'#000',  width:'90%', fontSize:16, padding:5,borderRadius:5,marginTop:-40}}
                            multiline
                            placeholderTextColor="#777"
                            editable={true}
                            onChange={(event) => this.setState({Descriptions: event.nativeEvent.text})}
                            value={this.state.Descriptions}
                        />  
            </Item>
            {this.state.showloader==true ?
              <View style={{width:deviceWidth,alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator
                size="large"
                color={"#E91E63"}
                style={{
                   marginTop:110,
                  alignItems: "center",justifyContent: 'center',
                }}
              />
               <Text style={{color:'#000', fontSize:16, }}>File Uploading...</Text>
              </View>
             :
            <TouchableOpacity onPress={()=>this.showmodal()}>

              <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10}}> Add Media</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>
            }
              <View style={{margin:30}}>
                             
                             <TouchableOpacity style={{backgroundColor:'#470B63',
                              height:40,marginLeft:10,justifyContent:'center',
                              alignItems:'center',borderRadius:5,}}
                              onPress={()=>this.savebtn()}
                              >
                                <Text style={{color:'#fff'}}> Save</Text>
                             </TouchableOpacity>

                         </View>
                         <View style={{ borderRadius:10, marginTop:10,marginBottom:10}}>
                              <FlatList
                               style={{ margin:10}}
                               data={this.state.filedata}
                               extraData={this.state}
                               horizontal={true}
                               renderItem={this.renderimage}
                                />
                     
                          </View>
              </View>
              

                   
          </View>
       
      
      </ScrollView>
      </View>
      <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}
                onRequestClose={() => {
                this.setState({showmodal:false});
               }}
            >
            <View>
              <View style={{ height:260, borderRadius:30,  borderColor:'#000', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8, shadowRadius: 1,backgroundColor: '#ffffff', }}>
            
            <TouchableOpacity
                 style={{justifyContent:'flex-end',flexDirection:'row',marginTop:20,marginRight:30}}
                 onPress={() => this.setState({showmodal:false})}
            >
              <Image
                   source={require("../../../../assets/images/Group_17138.png")}
                   style={{ width:20, height: 20, borderRadius:20 }}
              />                         
           </TouchableOpacity>
           <View style={{ width:deviceWidth-150, marginLeft:75}}>
                 
             <TouchableOpacity onPress={()=>this._pickImage()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:130}}> Select Photo</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage1()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:130}}> Select Video</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage2()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:130}}> Select PDF</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage3()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:130}}> Select Audio</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage4()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:130}}> Select Document</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

           </View>

        </View>
        </View>
      </Modal>
      </Container> 
    );
  }
}
function bindActions(dispatch) {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Addfeeds);
