import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, ImageBackground, StyleSheet, TextInput, View } from 'react-native';
import CardHumidity from './cardHumidity';
import CardTemperature from './cardTemperature';
import CardReserve from './cardReserve';
import CardButton from './cardButton';
import CardWaterButton from './cardWaterButton';
import CardTime from './cardTime';
import Historique from './Historique';



export default function Menu({ navigation }) {

  return (
    <ImageBackground source={require('../assets/Wallpaper.jpeg')} style={styles.background}>
    <View style={styles.container}>
      <View style={styles.firstColumn}>
      <CardHumidity />
      <CardTemperature />
      </View>
      <View style={styles.secondColumn}>
        <CardReserve />
      </View>
    <View style={styles.thirdColumn}>
      <CardButton navigation={navigation} />
      <CardWaterButton />
    </View>
    <View style={styles.fourthColumn}>
      <CardTime />

    </View>
      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    flex: 1,
  },
  firstColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  secondColumn: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: '5%',
  },
  thirdColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  fourthColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  background:{ 
    flex: 1,
    resizeMode: "cover",
  },
});
