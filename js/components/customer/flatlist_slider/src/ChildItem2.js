import React from 'react';
import {TouchableOpacity, Image, StyleSheet,Text,View,Linking} from 'react-native';


const  uri= 'https://wesmart.in/backend/public/files/homework/'

export default (ChildItem2 = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,homeworkid
}) => {
 
  return (
    <View>
    
      
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(uri+item.homeworkid+'/'+item[imageKey])}
      >
       <Image
        style={[styles.image, style, {height: height}]}
        source={local ? item[imageKey] : {uri: uri+item.homeworkid+'/'+item[imageKey]}}
      />
    </TouchableOpacity>
   
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
   
    resizeMode: 'cover',
  },
  desc:{
    color:'#ffffff',
    marginTop:10
  },
  title:{
    color:'#ffffff',
    marginTop:10
  }
});
