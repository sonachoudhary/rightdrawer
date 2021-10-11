import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, TextInput, ImageBackground, TouchableOpacity, FlatList ,StyleSheet} from "react-native";
//import ImagePicker from "react-native-image-picker";
import {
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
  Spinner,
  Body,
  Form, 
  Picker,
  Label,
  Input,
  Toast
} from "native-base";
import { Actions } from "react-native-router-flux";

import SettingsForm from "./form";
import {
  updateUserProfileAsync,
  updateUserProfilePicAsync
} from "../../../actions/driver/settings";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

import config from "../../../../config.js";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { RNS3 } from 'react-native-s3-upload';//https://www.npmjs.com/package/react-native-s3-upload

import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';

import ModalView from "../ModalView";
import moment from "moment";
import RNPickerSelect from 'react-native-picker-select';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
  guide: false,
  allowEmpty: true,
});
function validatephone(val) { 
    return /^[0-9\b]+$/.test(val);
}

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = "First name is Required";
  } else if (!values.lname) {
    errors.lname = "Last name is Required";
  } else if (!values.city) {
    errors.city = "City is Required";
  } else if (!values.state) {
    errors.state = "State is Required";
  }  else if (!values.weight) {
    errors.weight = "Weight is Required";
  } else if (!values.height) {
    errors.height = "Height is Required";
  } else if (!values.facebook) {
    errors.facebook = "Facebook is Required";
  } else if (!values.instagram) {
    errors.instagram = "Instagram is Required";
  } else if (!values.twitter) {
    errors.twitter = "Twitter is Required";
  } else if (!values.contact) {
    errors.contact = 'Phone is Required';
  } else if(!validatephone(values.contact)){
    errors.contact = 'Only numeric allowed';
  }
  return errors;
};

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <View style={{ flexDirection: "row", flex: 1 }}>
         <Input {...input} {...props} placeholderTextColor="#FF0000" style={{color:'#FF0000'}} />
      </View>
      <View>{meta.touched && meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}</View>
    </View>
  );
};

let lengthText = 300;
function calculate(text) {
  lengthText = 300;
  lengthText = lengthText - text.length
}
const getImageOptions = (maxFiles) => {
  const imageOptions = {
    width: 150,
    height: 150,
    compressImageQuality: 0.15,
    mediaType: "photo",
    includeBase64: true
  }

  // if(Platform.OS === 'ios') {
  //   imageOptions.writeTempFile = false
  // }

  if (maxFiles != null) {
    imageOptions.multiple = true;
    imageOptions.maxFiles = maxFiles;
  }

  return imageOptions;
}

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const getRandomId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2)

const imageUploadOptions = {
  keyPrefix: "backimage/",
  bucket: "b1-s3b-fitworld",
  region: "us-east-2",
  accessKey: "AKIAXJHBNQN2GK5CQWFF",
  secretKey: "0pHpNcEf6dXqWeSPXO4y0RCsZ8ZSWhPHRH+GdzWF",
  successActionStatus: 201,
  width: 150,
  height: 150,
  compressImageQuality: 0.15,
  mediaType: "photo",
  includeBase64: true  
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
   
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const getUsableUploadImage = (image) => {
 
  return {
    name: image.filename || Date.now() + getRandomId(),
    type: image.mime,
    uri: image.path,
  }
}
var numberarr = [];
for(let i=1;i<251;i++){
  numberarr.push({'label':i.toString(),'value':i.toString(),color: '#FF0000'});
}
var numberratearr = [];
numberratearr.push({'label':'$1 Hr','value':1,color: '#FF0000'});
for(let i=10;i<501;i=i+5){
  numberratearr.push({'label':'$'+i.toString()+' Hr','value':i.toString(),color: '#FF0000'});
}


export const inputtext = props => {
  const { meta, input } = props;
  return (
    <View>
      <View style={{ borderRadius:0, height: 100, paddingTop:10 }}>
        <TextInput
          style={{ borderWidth: 0, height: 100 }}
          multiline
          maxLength={300} 
          placeholderTextColor="#777"
          editable={true}
          onChangeText={(text) => calculate(text) }
          {...input} {...props}
        />
      </View>
      
      { meta.touched && meta.error && <Text style={{ color: 'red', textAlign:"left", paddingLeft:20 }}>{meta.error}</Text> }
    </View>
  );
};

export const inputRate = props => {
  const { meta, input } = props;
  return (
    <View>
      <Input {...input} {...props} />
      {meta.touched && meta.error && <Text style={{ color: 'red', textAlign:"right", paddingRight:10 }}>{meta.error}</Text>}
    </View>
  );
};

input.propTypes = {
  input: PropTypes.object,
  inputtext: PropTypes.object,
  inputRate: PropTypes.object,
  meta: PropTypes.object,
};

function mapStateToProps(state) {
 
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating,
  };
}
class Bio extends Component {
  constructor(props) {

    super(props);
   
    this.state = {
      submit: false,
      image: null,
      choosenIndexAge:this.props.userDetails.age,
      fname:this.props.userDetails.fname,
      lname:this.props.userDetails.lname,
      phoneNo:this.props.userDetails.contact,
      customfitnessgoal:'',
      hidecustomeroption:0,
      bio:this.props.userDetails.bio,
      showSpeacialityFlatlist: false,
      showCertFlatlist: false,
      showWeekFlatlist: false,
      showFitnessFlatlist:false,
      showGenderFlatlist: false,
      showYearFlatlist: false,
      selectedSpecialty: [],
      selectedCertification: [],
      selectedWeek: [],
      country:'United States',
      state:this.props.userDetails.state,
      zip:this.props.userDetails.zip,
      facebook:this.props.userDetails.facebook,
      instagram:this.props.userDetails.instagram,
      twitter:this.props.userDetails.twitter,
      individual:this.props.userDetails.individual,
      group2:this.props.userDetails.group2,
      countrylist:[],
      statelist:[],
      gender: this.props.userDetails.gender,
      height1:this.props.userDetails.height1,
      height:this.props.userDetails.height,
      weight1:this.props.userDetails.weight1,
      weight:this.props.userDetails.weight,
      gymlocation:this.props.userDetails.gymlocation,
      gymstarttime:this.props.userDetails.gymstarttime,
      gymendtime:this.props.userDetails.gymendtime,
      s3source:this.props.profileUrl,
      selectedExp: [],
      numbers:numberarr,
      ratenumbers:numberratearr,
      documentTypes: [
        {
          name: "Biomechanics and Functional",
          key: "Biomechanics and Functional",
          show: false
        },
        {
          name: "Strength and Conditioning",
          key: "Strength and Conditioning",
          show: false
        },
        {
          name: "Boxing/Martial Arts",
          key: "Boxing/Martial Arts",
          show: false
        },
        {
          name: "Rehabilitation/Physical Therapy",
          key: "Rehabilitation/Physical Therapy",
          show: false
        },
        {
          name: "Competition Prep",
          key: "Competition Prep",
          show: false
        },
        {
          name: "Body Building",
          key: "Body Building",
          show: false
        },
        {
          name: "Power Lifting",
          key: "Power Lifting",
          show: false
        },
        {
          name: "Crossfit",
          key: "Crossfit",
          show: false
        },
        {
          name: "HITT",
          key: "HITT",
          show: false
        },
        {
          name: "Bootcamp",
          key: "Bootcamp",
          show: false
        },
        {
          name: "Athletic Performance",
          key: "Athletic Performance",
          show: false
        },
        {
          name: "Senior Fitness",
          key: "Senior Fitness",
          show: false
        },
        {
          name: "Youth Fitness",
          key: "Youth Fitness",
          show: false
        },
        {
          name: "Yoga/Pilates",
          key: "Yoga/Pilates",
          show: false
        },
        {
          name: "Nutrition/Behavior Specialist",
          key: "Nutrition/Behavior Specialist",
          show: false
        },
        {
          name: "Dance/Zumba",
          key: "Dance/Zumba",
          show: false
        },
        {
          name: "Weight Loss",
          key: "Weight Loss",
          show: false
        }
      ],
      documentTypesCert: [
        {
          name: "ACE (American Council on Exercise)",
          key: "ACE (American Council on Exercise)",
          show: false
        },
        {
          name: "ACSM (American College of Sports Medicine)",
          key: "ACSM (American College of Sports Medicine)",
          show: false
        },
        {
          name: "ISSA (International Sports Sciences Association)",
          key: "ISSA (International Sports Sciences Association)",
          show: false
        },
        {
          name: "NASM (National Academy of Sports Medicine)",
          key: "NASM (National Academy of Sports Medicine)",
          show: false
        },
        {
          name: "NSCA (National Strength Conditioning Association)",
          key: "NSCA (National Strength Conditioning Association)",
          show: false
        },
        {
          name: "Other",
          key: "Other",
          show: false
        }
      ],
      documentTypesWeek: [
        { name: "Monday", key: "0", show: false },
        { name: "Tuesday", key: "1", show: false },
        { name: "Wednesday", key: "2", show: false },
        { name: "Thursday", key: "3", show: false },
        { name: "Friday", key: "4", show: false },
        { name: "Saturday", key: "5", show: false },
        { name: "Sunday", key: "6", show: false }
      ],
      documentTypesFitness:[
        {
          name: "Improve Health",
          key: "Improve Health",
          show: false
        },
        {
          name: "Weight Loss",
          key: "Weight Loss",
          show: false
        },
        {
          name: "Increase Strength",
          key: "Increase Strength",
          show: false
        },
        {
          name: "Increase Stamina",
          key: "Increase Stamina",
          show: false
        },
        {
          name: "Body Tone",
          key: "Body Tone",
          show: false
        },
        {
          name: "Increase Flexibility",
          key: "Increase Flexibility",
          show: false
        },
        {
          name: "Learn New Skills",
          key: "Learn New Skills",
          show: false
        },
        {
          name: "Other",
          key: "Other",
          show: false
        }
      ],
      documentTypesGender: [
        {
          name: "Male",
          key: "Male",
          show: false
        },
        {
          name: "Female",
          key: "Female",
          show: false
        },
        {
          name: "Other",
          key: "Other",
          show: false
        }
      ],
      documentTypesYear : [
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
   UNSAFE_componentWillReceiveProps () {
      
      if(this.state.phoneNo==undefined){
        var phone = '';
      }else {
        if (this.state.phoneNo.length < 1) { var phone = ''; }
        if (this.state.phoneNo.length == 1) { var phone =  '(' +this.state.phoneNo; }
        if (this.state.phoneNo.length == 2) { var phone =  '(' +this.state.phoneNo; }
        if (this.state.phoneNo.length == 3) { var phone =  '(' +this.state.phoneNo; }
        if (this.state.phoneNo.length == 4) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3); }
        if (this.state.phoneNo.length == 5) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3); }
        if (this.state.phoneNo.length == 6) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3); }
        if (this.state.phoneNo.length == 7) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
        if (this.state.phoneNo.length == 8) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
        if (this.state.phoneNo.length == 9) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
        if (this.state.phoneNo.length > 9) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
        
       
       
        this.props.initialize({ phoneNo: phone,fname: this.state.fname,lname: this.state.lname,age:this.state.choosenIndexAge,
        weight:this.state.weight,height:this.state.height,weight1:this.state.weight1,height1:this.state.height1,bio:this.state.bio,facebook:this.state.facebook,instagram:this.state.instagram
      ,twitter:this.state.twitter,individual:this.state.individual,group2:this.state.group2,certification:this.state.selectedCertification,speaciality:this.state.selectedSpecialty,
      gymweekday:this.state.selectedWeek, gymlocation:this.state.gymlocation, gymstarttime:this.state.gymstarttime, gymendtime:this.state.gymendtime,customfitnessgoal:this.state.customfitnessgoal   }); 


      }
     

  }
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
  };
  componentDidMount() {
      //this.countrylist();
      this.getstatelist();
  } 

  // componentWillReceiveProps(nextProps) {
  //   nextProps.dispatch(change("settings", "homeAddress", nextProps.initialValues.homeAddress));
  // }

  submit() {
   
    if(this.props.userDetails.userType=='trainer'){
      if(this.state.selectedWeek.length>0){
          this.props.userDetails.gymweekday = this.state.selectedWeek;
      }
      

        if(this.props.userDetails.gymweekday==null){
          alert('Training Schedule is required');
        }else if(this.state.gymstarttime==null){
          alert('Training start time is requried');
        }else if(this.state.gymendtime==null){
          alert('Training end time is requried');
        }else if(this.state.gymlocation=="" || this.state.gymlocation==null){
           alert('Gym business name is required');
        }else {
              var values = { fname:this.state.fname, lname:this.state.lname, phoneNo:this.state.phoneNo, age:this.state.choosenIndexAge, speaciality:this.state.selectedSpecialty
              , certification:this.state.selectedCertification, Experience:this.state.selectedExp,weight:this.state.weight,height:this.state.height,weight1:this.state.weight1,height1:this.state.height1,
              bio:this.state.bio,country:this.state.country,state:this.state.state,gender:this.state.gender,facebook:this.state.facebook,instagram:this.state.instagram
              ,twitter:this.state.twitter,individual:this.state.individual,group2:this.state.group2,
              gymweekday:this.state.selectedWeek,gymlocation:this.state.gymlocation,gymstarttime:this.state.gymstarttime,gymendtime:this.state.gymendtime
            }
            
            this.props.dispatch(updateUserProfileAsync({ ...values }));

        }
    }else {
       
        if(this.state.customfitnessgoal!="" && this.state.customfitnessgoal!=null){
            this.state.selectedCertification.push(this.state.customfitnessgoal);
        }
        
        var values = { fname:this.state.fname, lname:this.state.lname, phoneNo:this.state.phoneNo, age:this.state.choosenIndexAge, speaciality:this.state.selectedSpecialty
          , certification:this.state.selectedCertification, Experience:this.state.selectedExp,weight:this.state.weight,height:this.state.height,weight1:this.state.weight1,height1:this.state.height1,
          bio:this.state.bio,country:this.state.country,state:this.state.state,gender:this.state.gender,facebook:this.state.facebook,instagram:this.state.instagram
          ,twitter:this.state.twitter,individual:this.state.individual,group2:this.state.group2,
          gymweekday:this.state.selectedWeek,gymlocation:this.state.gymlocation,gymstarttime:this.state.gymstarttime,gymendtime:this.state.gymendtime,
          customfitnessgoal:this.state.customfitnessgoal
        }
        
        this.props.dispatch(updateUserProfileAsync({ ...values }));
    }   
  }


  pickImage(userDetails) {
    
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
        this.props.updateUserProfilePicAsync(userData, "profile");
      }
    });
  }

userImageViaCamera() {
    ImagePicker.showImagePicker(options, (image) => {
      
      
      if(image.uri){
          this.setState({
            s3source: image.uri,
            modalVisible: false
          })  
          Toast.show({ 
              text: "Profile photo has been saved",
              position: "bottom",
              duration: 1500
            });
      
          image.name = Date.now() + getRandomId();
          image.type = "image/jpeg";
          RNS3.put(image, imageUploadOptions).then(response => {
            if (response.status !== 201) {
             
              throw new Error("Failed to upload image to S3");
              this.setState({
                modalVisible: false
              })  
            } else {
             
              let data = { s3source: response.body.postResponse.location, s3sourceKey: response.body.postResponse.key, s3sourceETag: response.body.postResponse.etag };
             
              this.setState({
                s3source: data.s3source,
                s3sourceType: data.s3sourceType,
                modalVisible: false
              })  

              var values = { profileUrl:this.state.s3source }
             
              this.props.dispatch(updateUserProfilePicAsync({ ...values }));

            }                        
          });
      }
      
    });
  }


  renderCheck() {
    return (
      <Icon
        name="checkmark"
        style={{
          color: "#D41818",
          fontWeight: "bold",
          fontSize: 25,
          marginRight: 10,
          lineHeight:15,
          paddingTop:5,
        }} />
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
          //selectedSpecialty: this.state.documentTypes[i].key
          selectedSpecialty: [...this.state.selectedSpecialty, this.state.documentTypes[i].key]
        })
      } else if (this.state.documentTypes[i].key === value && this.state.documentTypes[i].show == true) {
        this.state.documentTypes[i].show = false
        this.forceUpdate()
        const index = this.state.selectedSpecialty.indexOf(this.state.documentTypes[i].key);
          if (index > -1) {
              this.state.selectedSpecialty.splice(index, 1);
          }
          this.setState({
            selectedSpecialty: this.state.selectedSpecialty
          })
      }
    }    
  }

  showHideCert = () =>{
    if(this.state.showCertFlatlist == true){
      this.setState({showCertFlatlist: false})
    }else{
      this.setState({showCertFlatlist: true})
    }
  }

  showHideWeek = () =>{
    if(this.state.showWeekFlatlist == true){
      this.setState({showWeekFlatlist: false})
    }else{
      this.setState({showWeekFlatlist: true})
    }
  }

  showHideFitness = () =>{
    if(this.state.showFitnessFlatlist == true){
      this.setState({showFitnessFlatlist: false})
    }else{
      this.setState({showFitnessFlatlist: true})
    }
  }

  showHideGender = () =>{
    if(this.state.showGenderFlatlist == true){
      this.setState({showGenderFlatlist: false})
    }else{
      this.setState({showGenderFlatlist: true})
    }
  }

  countrylist(){
      const userEmail = { email: 'test@gmail.com' };
      fetch(`${config.serverSideUrl}:${config.port}/api/users/countrylist`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail)
      })
        .then(response => response.json())
        .then(data => {
          this.setState({countrylist:data.data});
            //resolve(data)
         })
        .catch(error => {
          
        });
    }

  onPickerValueChange=(value)=>{
    this.setState( {"country": value });
    //alert(value);
    this.getstatelist();
  }
    getstatelist(){
        const userEmail = { country_id: 233 };
        
        fetch(`${config.serverSideUrl}:${config.port}/api/users/statelist`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail)
      })
        .then(response => response.json())
        .then(data => {
           
          this.setState({statelist:data.data});
            //resolve(data)
         })
        .catch(error => {
          
        });
    }


  callActionCert(value){
    for (var i = 0; i < this.state.documentTypesCert.length; i++) {
      if (this.state.documentTypesCert[i].key === value && this.state.documentTypesCert[i].show == false) {
        this.state.documentTypesCert[i].show = true
        this.forceUpdate()
        this.setState({
          //selectedCertification: this.state.documentTypesCert[i].key
          selectedCertification: [...this.state.selectedCertification, this.state.documentTypesCert[i].key]
        })
      } else if (this.state.documentTypesCert[i].key === value && this.state.documentTypesCert[i].show == true) {
          this.state.documentTypesCert[i].show = false
          this.forceUpdate()
          const index = this.state.selectedCertification.indexOf(this.state.documentTypesCert[i].key);
          if (index > -1) {
              this.state.selectedCertification.splice(index, 1);
          }
          this.setState({
            selectedCertification: this.state.selectedCertification
          })
      }
    }    
  }

  callActionWeek(value){
    for (var i = 0; i < this.state.documentTypesWeek.length; i++) {
      if (this.state.documentTypesWeek[i].key === value && this.state.documentTypesWeek[i].show == false) {
        this.state.documentTypesWeek[i].show = true
        this.forceUpdate()
        this.setState({
          selectedWeek: [...this.state.selectedWeek, this.state.documentTypesWeek[i].key]
        })
      } else if (this.state.documentTypesWeek[i].key === value && this.state.documentTypesWeek[i].show == true) {
          this.state.documentTypesWeek[i].show = false
          this.forceUpdate()
          const index = this.state.selectedWeek.indexOf(this.state.documentTypesWeek[i].key);
          if (index > -1) {
              this.state.selectedWeek.splice(index, 1);
          }
          this.setState({
            selectedWeek: this.state.selectedWeek
          })
      }
    }    
  }

  callActionFitness(value){

    for (var i = 0; i < this.state.documentTypesFitness.length; i++) {
      if (this.state.documentTypesFitness[i].key === value && this.state.documentTypesFitness[i].show == false) {
         if(value=='Other'){
            this.setState({hidecustomeroption:1 });
            this.state.documentTypesFitness[i].show = true
            this.forceUpdate()
         }else {
              this.state.documentTypesFitness[i].show = true
              this.forceUpdate()
              this.setState({
                selectedCertification: [...this.state.selectedCertification, this.state.documentTypesFitness[i].key]
              })
         }
        
      } else if (this.state.documentTypesFitness[i].key === value && this.state.documentTypesFitness[i].show == true) {
          if(value=='Other'){
            this.setState({customfitnessgoal:'',hidecustomeroption:0 });
            
            this.state.documentTypesFitness[i].show = false
            this.forceUpdate()
          }else {

              this.state.documentTypesFitness[i].show = false
              this.forceUpdate()
              const index = this.state.selectedCertification.indexOf(this.state.documentTypesFitness[i].key);
              if (index > -1) {
                  this.state.selectedCertification.splice(index, 1);
              }
              this.setState({
                selectedCertification: this.state.selectedCertification
              })
          }
      }
    }    
  }

  callActionGender(value){
    for (var i = 0; i < this.state.documentTypesGender.length; i++) {
      if (this.state.documentTypesGender[i].key === value) {
        this.state.documentTypesGender[i].show = true
        this.forceUpdate()
        this.setState({
          gender: this.state.documentTypesGender[i].key
        })
      } else {
        this.state.documentTypesGender[i].show = false
      }
    } 
  }

  renderRowCert = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.callActionCert(item.key)}
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

  renderRowWeek = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.callActionWeek(item.key)}
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

  renderRowFitness = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.callActionFitness(item.key)}
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

  renderRowGender = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.callActionGender(item.key)}
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

  showHideSpeaciality = () =>{
    if(this.state.showSpeacialityFlatlist == true){
      this.setState({showSpeacialityFlatlist: false})
    }else{
      this.setState({showSpeacialityFlatlist: true})
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

  showHideYear = () =>{
    if(this.state.showYearFlatlist == true){
      this.setState({showYearFlatlist: false})
    }else{
      this.setState({showYearFlatlist: true})
    }
  }

  callActionYear(value){
    for (var i = 0; i < this.state.documentTypesYear.length; i++) {
      if (this.state.documentTypesYear[i].key === value) {
        this.state.documentTypesYear[i].show = true
        this.forceUpdate()
        this.setState({
          selectedExp: this.state.documentTypesYear[i].key
        })
      } else {
        this.state.documentTypesYear[i].show = false
      }
    }    
  }

  renderRowYear = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.callActionYear(item.key)}
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

  render() {
    var userType = this.props.userDetails.userType;
    
    
    if(this.props.userDetails.age!=""){
        var birthday = this.props.userDetails.age;
        var convertdate = new Date(birthday);
      
        var ageDifMs = Date.now() - convertdate.getTime();
        var ageDate = new Date(ageDifMs); 
        var agedata =  Math.abs(ageDate.getUTCFullYear() - 1970);
        if(agedata==50){ var agedata = 0; }
    }else {
        var agedata = 0;
    }

    var heightshowdata = this.props.userDetails.height+this.props.userDetails.height1;
    if(this.props.userDetails.height1 == 'inch'){
          var inches = parseInt(this.props.userDetails.height);
          var feet = Math.floor(inches / 12);
          inches %= 12;
          var heightshowdata = feet+"' - "+inches+'"'
    }

    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
            </Button>
          </Left>
          <Body>
           
          </Body>
          <Right>
              <Text style={{ color: "#191919", fontSize: 20 }} 
              onPress={() => this.submit()}> SAVE </Text>            
          </Right>
        </Header>
        <Content>
           <View>

          
             
          <View style={{ width: deviceWidth,backgroundColor:'#ffffff',paddingBottom:15,marginTop:5 }}>
            <View style={{flexDirection:'row',width: deviceWidth}}>
              <View style={{ marginTop: 20, marginLeft:20,  width: 110, height: 120,  borderRadius: 20, backgroundColor: "#EFEFEF"}} >
                <TouchableOpacity onPress={() => this.userImageViaCamera()}>
                   <Thumbnail  source={{ uri: this.state.s3source }}  style={{  width: 110, height: 120,borderRadius: 20, borderWidth: 0,backgroundColor: "#EFEFEF"}} />
                </TouchableOpacity>
              </View>
              <Text style={{color: "#000000",marginTop:60, width:deviceWidth-150, marginLeft:20,fontSize: 28, fontWeight: "500", textTransform: "capitalize" }} >
                  {this.props.userDetails.fname} {this.props.userDetails.lname} 
              </Text>
          </View>
              <ActionSheet
                    ref={ref => (this.backgroundImage = ref)}
                    title={'Select Options'}
                    options={[
                      'Cancel',
                      'Camera',
                      'Gallery'
                    ]}
                    cancelButtonIndex={0}
                    onPress={(index) => {
                      if (index === 1) {
                        this.userImageViaCamera()
                      } else if (index === 2) {
                        this.userImageViaLibrary()
                      } 
                    }}
                  />

                  <View style={{ flexDirection:'row',width: deviceWidth,backgroundColor:'#ffffff',paddingBottom:15,marginTop:25 }}>
                      <View style={{width:deviceWidth/3,paddingLeft:30}}>
                        <Text style={{color:'000000',fontSize:20,textTransform:'uppercase',marginBottom:20}}>Age</Text>
                        <Text style={{color:'rgb(154,154,154)',fontSize:18}}>{agedata}</Text>
                      </View>
                     <View style={{width:deviceWidth/3,paddingLeft:20}}>
                        <Text style={{color:'000000',fontSize:20,textTransform:'uppercase',marginBottom:20}}>Height</Text>
                       
                        <Text style={{color:'rgb(154,154,154)',fontSize:18}}>{heightshowdata}</Text>
                        
                      </View>
                     <View style={{width:deviceWidth/3,paddingLeft:20}}>
                      <Text style={{color:'000000',fontSize:20,textTransform:'uppercase',marginBottom:20}}>Weight</Text>
                        <Text style={{color:'rgb(154,154,154)',fontSize:18}}>{this.props.userDetails.weight}{this.props.userDetails.weight1}</Text>
                      </View>

                  </View>
                      
                     

            </View>


          <View style={{marginTop:10,paddingLeft:10}}>
              {(userType=='trainer') && 
              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  About me
                </Label>
                <Field component={input} style={ [styles.itemStyleText,{height:180} ]} multiline name="bio" onChangeText={ value => this.setState({ bio: value })} />
              </Item>
            }
             {(userType=='customer') && 
              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  About Me
                </Label>
                <Field
                        component={input}
                        multiline
                        placeholder="Enter message..."
                        placeholderTextColor="#FF0000"
                        name="bio"
                        autoCapitalize="none"
                        onChangeText={ value => this.setState({ bio: value })}
                      />
              </Item>
              }

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  FIRST NAME
                </Label>
                <Field component={input} style={ styles.itemStyleText } name="fname" onChangeText={ value => this.setState({ fname: value })} />
              </Item>

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  LAST NAME
                </Label>
                <Field component={input} style={ styles.itemStyleText } name="lname" onChangeText={ value => this.setState({ lname: value })} />
              </Item>

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  Phone Number
                </Label>
                <Field
                  component={input}
                  name="phoneNo"
                  type="tel"
                  placeholder="(999) 999-9999"
                  onChangeText={ value => this.setState({ phoneNo: value.replace(/[^0-9]/g, '') })}
                  style={ styles.itemStyleText }
                />       
              </Item> 
              
              
              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  State 
                </Label>
                  
                   <View style={{marginTop:10}}>
                    <RNPickerSelect
                      placeholder={{label: 'Select State',value: null,color:'#FF0000'}}
                       useNativeAndroidPickerStyle={false}
                            style={pickerSelectStyles}
                      onValueChange={ (value) => ( this.setState({state:value}) ) }
                      value={this.state.state}
                      items={[...this.state.statelist]}
                  />
                  </View>
                 
              </Item>

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  Birthdate
                </Label>
                <DatePicker
                        style = {{ marginBottom:10,marginLeft:-15,paddingLeft:0}}
                        date={this.state.choosenIndexAge}
                        mode="date"
                        placeholder={<Text style={{color:'#FF0000'}}>&#128197; Birthdate</Text>}
                        minDate={moment().subtract(100, "years")}
                        maxDate={moment().subtract(18, "years")}
                        showIcon={false}
                        format="ll"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0,
                            paddingLeft:0,
                            marginLeft:0,
                            fontSize:16
                          },
                          dateText:{
                            color: "#FF0000", 
                            paddingLeft:0,
                            marginLeft:0,
                            fontSize:16
                          }
                        }}
                        onDateChange={time => {
                          this.setState({ choosenIndexAge: time });
                        }} />
                
              </Item>

              <Item stackedLabel style={styles.itemStyle} >
                 
                        <Label style={ styles.itemStyleLebel } note>
                          Gender  
                        </Label>
                      <View style={{paddingTop:10,flexDirection:'row'}}>
                        <RNPickerSelect
                          placeholder={{label: 'Select gender',value: null,color:'#FF0000'}}
                          onValueChange={ (value) => ( this.setState({gender: value}) ) }
                          value = {this.state.gender}
                           useNativeAndroidPickerStyle={false}
                            style={pickerSelectStyles}
                          items={[
                            { label: 'Male', value: 'Male',color:'#FF0000' },
                            { label: 'Female', value: 'Female',color:'#FF0000' },
                            { label: 'Other', value: 'Other',color:'#FF0000' },
                          ]}
                      />  
                    </View>                         
              </Item>

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  Weight
                </Label>
                  <View style={{paddingTop:10,flexDirection:'row'}}>
                    <View style={{width:120}}>
                        <RNPickerSelect
                            placeholder={{label:'Weight',value: null,color:'#FF0000'}}
                            onValueChange={ (value) => ( this.setState({weight: value}) ) }
                             useNativeAndroidPickerStyle={false}
                            style={pickerSelectStyles}
                            value={this.state.weight}
                            items={[...this.state.numbers]}
                      />
                      </View>
                      <View style={{marginLeft:-20}}>
                      <RNPickerSelect
                          placeholder={{label: 'Type',value: null,color:'#FF0000'}}
                          onValueChange={ (value) => ( this.setState({weight1: value}) ) }
                           useNativeAndroidPickerStyle={false}
                            style={pickerSelectStyles}
                          value={this.state.weight1}
                          items={[
                            { label: 'lbs', value: 'lbs',color:'#FF0000' },
                            { label: 'kg', value: 'kg',color:'#FF0000' },
                           
                        ]}
                      />
                      </View>
                    </View>
               
              </Item>

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  Height
                </Label>
                <View style={{paddingTop:10,flexDirection:'row'}}>
                   <View style={{width:120}}>
                        <RNPickerSelect
                            placeholder={{label:'Height',value: null,color:'#FF0000'}}
                            onValueChange={ (value) => ( this.setState({height: value}) ) }
                            value={this.state.height}
                            useNativeAndroidPickerStyle={false}
                            style={pickerSelectStyles}
                           
                            items={[...this.state.numbers]}
                      />
                      </View>
                       <View style={{marginLeft:-20}}>
                      <RNPickerSelect
                          placeholder={{label: 'Type',value: null,color:'#FF0000'}}
                          onValueChange={ (value) => ( this.setState({height1: value}) ) }
                          value={this.state.height1}
                          useNativeAndroidPickerStyle={false}
                          style={pickerSelectStyles}
                          items={[
                            {label: 'inch',value: 'inch',color:'#FF0000'},
                            { label: 'cm', value: 'cm',color:'#FF0000' },
                           
                        ]}
                      />
                      </View>
                    </View>
               
              </Item>

             

              {(userType=='trainer') && 
                <Item
                  stackedLabel
                  style={styles.itemStyle}
                >
                  <View style={{ flexDirection:'row' }}>
                  <Label style={ styles.itemStyleLebel } note onPress={() => this.showHideSpeaciality()}>
                    Specialties
                    <Text style={{fontSize:12,textTransform:'lowercase',width:deviceWidth,paddingLeft:5}}>{"\n"}(check all that applies)</Text>
                  </Label>
                  <View 
                  style={{ position:'absolute', right:0 }}
                  onPress={() => this.showHideSpeaciality()}
                  >
                    {
                    this.state.showSpeacialityFlatlist==true ?
                    <Icon
                      name="ios-arrow-forward"
                      
                      style={{
                        color: "#FF0000",
                        fontWeight: "bold",
                        fontSize: 20, 
                        paddingTop: 5,
                        paddingRight: 20                             
                      }}
                    />  :
                    <Icon
                      name="ios-arrow-down"
                      onPress={() => this.showHideSpeaciality()}
                      style={{
                        color: "#FF0000",
                        fontWeight: "bold",
                        fontSize: 20, 
                        paddingTop: 5,
                        paddingRight: 20                             
                      }}
                    />  
                  }
                  </View>                      
                  </View>                      
                  <Text style={ styles.itemStyleText }>{this.props.userDetails.Specialities}</Text>
                  
                  {
                    this.state.showSpeacialityFlatlist==true &&
                    <FlatList
                      data={this.state.documentTypes}
                      renderItem={this.renderRow}
                      style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>
                  }
                </Item>
                }


                {(userType=='trainer') && 
                <Item stackedLabel style={styles.itemStyle} >
                  <View style={{ flexDirection:'row' }}>
                    <Label style={ styles.itemStyleLebel } note onPress={() => this.showHideCert()}>
                      Certifications  
                      <Text style={{fontSize:12,textTransform:'lowercase',width:deviceWidth,paddingLeft:5}}>{"\n"}(check all that applies)</Text>
                    </Label>
                    <View style={{ position:'absolute', right:0 }} onPress={() => this.showHideCert()} >
                      { this.state.showCertFlatlist==true ?
                        <Icon name="ios-arrow-forward" style={{ color: "#FF0000",fontWeight: "bold",fontSize: 20, paddingTop: 5, paddingRight: 20}} />  :
                        <Icon name="ios-arrow-down" onPress={() => this.showHideCert()} style={{  color: "#FF0000", fontWeight: "bold", fontSize: 20, paddingTop: 5, paddingRight: 20 }} />  
                      }
                    </View>                      
                  </View>                      
                  <Text style={ styles.itemStyleText }>{this.props.userDetails.Certifications}</Text>
                    { this.state.showCertFlatlist==true &&
                      <FlatList
                        data={this.state.documentTypesCert}
                        renderItem={this.renderRowCert}
                        style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>
                    }
                </Item>
                }

                {(userType=='trainer') && 
                <Item stackedLabel style={styles.itemStyle} >
                  <View style={{ flexDirection:'row' }}>
                    <Label style={ styles.itemStyleLebel } note onPress={() => this.showHideWeek()}>
                      Training Schedule 
                      <Text style={{fontSize:12,textTransform:'lowercase',width:deviceWidth,paddingLeft:5}}>{"\n"}(check all that applies)</Text>
                    </Label>
                    <View style={{ position:'absolute', right:0 }} onPress={() => this.showHideWeek()} >
                      { this.state.showWeekFlatlist==true ?
                        <Icon name="ios-arrow-forward" style={{ color: "#FF0000",fontWeight: "bold",fontSize: 20, paddingTop: 5, paddingRight: 20}} />  :
                        <Icon name="ios-arrow-down" onPress={() => this.showHideWeek()} style={{  color: "#FF0000", fontWeight: "bold", fontSize: 20, paddingTop: 5, paddingRight: 20 }} />  
                      }
                    </View>                      
                  </View>                      
                  <Text style={ styles.itemStyleText }></Text>
                    { this.state.showWeekFlatlist==true &&
                      <FlatList
                        data={this.state.documentTypesWeek}
                        renderItem={this.renderRowWeek}
                        style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>
                    }
                </Item>
                }

            {(userType=='trainer') && 
                  <Item stackedLabel style={styles.itemStyle} >
                <Label style={ styles.itemStyleLebel } note>
                  Training Start Time
                </Label>
                <DatePicker
                        style = {{ marginBottom:10,marginLeft:-30,paddingLeft:0}}
                        date={this.state.gymstarttime}
                        mode="time"
                        format="h:mm A"
                        placeholder={<Text style={{color:'#FF0000'}}> Start Time</Text>}
                        showIcon={false}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: { borderWidth: 0,paddingLeft:0, marginLeft:0, fontSize:16 },
                          dateText:{ color: "#FF0000", paddingLeft:0, marginLeft:0,fontSize:16 }
                        }}
                        onDateChange={time => {
                          this.setState({ gymstarttime: time });
                        }} />
                
              </Item>
            }
            {(userType=='trainer') && 
               <Item stackedLabel style={styles.itemStyle}>
                <Label style={ styles.itemStyleLebel } note>
                  Training End Time
                </Label>
                <DatePicker
                        style = {{ marginBottom:10,marginLeft:-30,paddingLeft:0}}
                        date={this.state.gymendtime}
                        mode="time"
                        format="h:mm A"
                        placeholder={<Text style={{color:'#FF0000'}}> End Time</Text>}
                        showIcon={false}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: { borderWidth: 0,paddingLeft:0, marginLeft:0, fontSize:16 },
                          dateText:{ color: "#FF0000", paddingLeft:0, marginLeft:0,fontSize:16 }
                        }}
                        onDateChange={time => {
                          this.setState({ gymendtime: time });
                        }} />
                  </Item>
            }
            {(userType=='trainer') && 
              <Item stackedLabel style={styles.itemStyle} >
                <Label style={ styles.itemStyleLebel } note>
                  Gym Business Name
                </Label>
                <Field component={input} placeholder="Enter gym business name" style={ styles.itemStyleText } name="gymlocation" onChangeText={ value => this.setState({ gymlocation: value })} />
              </Item>
            }
                {(userType=='customer') && 
                <Item stackedLabel style={styles.itemStyle} >
                  <View style={{ flexDirection:'row' }}>
                    <Label style={ styles.itemStyleLebel } note onPress={() => this.showHideFitness()}>
                      Fitness Goals 
                        <Text style={{fontSize:12,textTransform:'lowercase',width:deviceWidth,paddingLeft:5}}>{"\n"}(check all that applies)</Text>
                    </Label>
                    
                    <View style={{ position:'absolute', right:0 }} onPress={() => this.showHideFitness()} >
                      { this.state.showFitnessFlatlist==true ?
                        <Icon name="ios-arrow-forward" style={{ color: "#FF0000",fontWeight: "bold",fontSize: 20, paddingTop: 5, paddingRight: 20}} />  :
                        <Icon name="ios-arrow-down" onPress={() => this.showHideFitness()} style={{  color: "#FF0000", fontWeight: "bold", fontSize: 20, paddingTop: 5, paddingRight: 20 }} />  
                      }
                    </View>                      
                  </View>                      
                  <Text style={ styles.itemStyleText }>{this.props.userDetails.Certifications}</Text>
                    { this.state.showFitnessFlatlist==true &&
                      <FlatList
                        data={this.state.documentTypesFitness}
                        renderItem={this.renderRowFitness}
                        style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>
                    }
                </Item>
                }
                {(this.state.hidecustomeroption==1) && 
                  <Item stackedLabel style={styles.itemStyle} >
                    <Field component={input} placeholder="Enter customer fitness goal" style={ styles.itemStyleText } name="customfitnessgoal" onChangeText={ value => this.setState({ customfitnessgoal: value })} />
                  </Item>
                }
                {(userType=='trainer') && 
                <Item
                  stackedLabel
                  style={styles.itemStyle}
                >
                  <View style={{ flexDirection:'row' }}>
                  <Label style={ styles.itemStyleLebel } note onPress={() => this.showHideYear()}>
                    Years of experience  
                  </Label>
                  <View 
                  style={{ position:'absolute', right:0 }}
                  onPress={() => this.showHideYear()}
                  >
                    {
                    this.state.showYearFlatlist==true ?
                    <Icon
                      name="ios-arrow-forward"
                      style={{
                        color: "#FF0000",
                        fontWeight: "bold",
                        fontSize: 20, 
                        paddingTop: 5,
                        paddingRight: 20                             
                      }}
                    />  :
                    <Icon
                      name="ios-arrow-down"
                      onPress={() => this.showHideYear()}
                      style={{
                        color: "#FF0000",
                        fontWeight: "bold",
                        fontSize: 20, 
                        paddingTop: 5,
                        paddingRight: 20                             
                      }}
                    />  
                  }
                  </View>                      
                  </View>                      
                  <Text style={ styles.itemStyleText }>{this.props.userDetails.experience}</Text>
                  
                  {
                    this.state.showYearFlatlist==true &&
                    <FlatList
                      data={this.state.documentTypesYear}
                      renderItem={this.renderRowYear}
                      style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>
                  }
                </Item>
                }
               



                

                {(userType=='trainer') && 
                <Item
                  stackedLabel
                  style={styles.itemStyle}
                >
                  <Label style={ styles.itemStyleLebel } note>
                    Hourly rate
                  </Label>
                  <View style={styles.addressContainer}>
                    <View style={{flex:1, flexDirection:"row", height:40}}>  
                      <Text style={styles.rowItemLeft}>Individual</Text>
                      <RNPickerSelect
                        placeholder={{label:'Choose rates',value: null,color:'#FF0000'}}
                        onValueChange={ (value) => ( this.setState({individual: value}) ) }
                        value={this.state.individual}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        items={[...this.state.ratenumbers]}
                      />
                      
                    </View>
                  </View>

                  <View style={styles.addressContainer}>
                    <View style={{flex:1, flexDirection:"row", height:40}}>  
                      <Text style={styles.rowItemLeft}>Group (2 or more)</Text>
                      <RNPickerSelect
                        placeholder={{label:'Choose rates',value: null,color:'#FF0000'}}
                        onValueChange={ (value) => ( this.setState({group2: value}) ) }
                        value={this.state.group2}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        items={[...this.state.ratenumbers]}
                      />
                    </View>
                  </View>
                </Item>
                }


              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  Facebook
                </Label>
                <Field component={input} placeholder="https://www.facebook.com/" style={ styles.itemStyleText } name="facebook" onChangeText={ value => this.setState({ facebook: value })} />
              </Item>

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  Instagram
                </Label>
                <Field component={input}  placeholder="https://www.instagram.com/" style={ styles.itemStyleText } name="instagram" onChangeText={ value => this.setState({ instagram: value })} />
              </Item>

              <Item
                stackedLabel
                style={styles.itemStyle}
              >
                <Label style={ styles.itemStyleLebel } note>
                  Twitter
                </Label>
                <Field component={input}  placeholder="http://twitter.com/" style={ styles.itemStyleText } name="twitter"  onChangeText={ value => this.setState({ twitter: value })} />
              </Item>

            
            
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    updateUserProfileAsync: userDetails => dispatch(updateUserProfileAsync(userDetails)),
    updateUserProfilePicAsync: userDetails => dispatch(updateUserProfilePicAsync(userDetails)),   

  };
}

Bio = reduxForm({
  form: "bioForm", // a unique name for this form
  validate
})(Bio);


Bio = connect(state => ({
  homeAddress: formValueSelector("settings")(state, "homeAddress"),
  initialValues: {
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    twitter: state.driver.user.twitter,
    facebook: state.driver.user.facebook,
    instagram: state.driver.user.instagram,
    weight: state.driver.user.weight,
    height: state.driver.user.height,
    weight1: state.driver.user.weight1,
    height1: state.driver.user.height1,
    age: state.driver.user.age,
    bio: state.driver.user.bio,
    city: state.driver.user.city,
    state: state.driver.user.state,
    contact: state.driver.user.contact,
    gender:state.driver.user.gender,
  }
}))(Bio);


Bio = connect(mapStateToProps, bindActions)(Bio);

export default Bio;


