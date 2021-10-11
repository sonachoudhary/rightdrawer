import React from 'react';
import {TouchableOpacity, Image, StyleSheet,Text,View,Linking} from 'react-native';


const  uri= 'http://wesmart.in/backend/public/files/broadcast/'

export default (ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height
}) => {
  return (
    <View>
    
      
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(uri+item[imageKey])}
      >

       <Image
        style={[styles.image, style, {height: height}]}
        source={local ? item[imageKey] : {uri: uri+item[imageKey]}}
      />
      
      
    </TouchableOpacity>
   
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    
    resizeMode: 'contain',
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
