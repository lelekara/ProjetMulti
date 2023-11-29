import React from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput,Alert, Keyboard, View,Text, ImageBackground} from 'react-native';


const Historique = () => {

  return (
    <ImageBackground source={require('../assets/Wallpaper.jpeg')} style={{width: '100%', height: '100%'}}>
    <View style={styles.container}>
      <Text style={styles.text}>History</Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    justifyContent:'center',
    textAlign:'center',
    color: 'white',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default Historique;