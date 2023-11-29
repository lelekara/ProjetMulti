import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CardTemperature () {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Temperature</Text>
        <View style={styles.Text}>
        <Text style={styles.title}>15°</Text>
        </View>
      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  borderWidth: 1,
  borderRadius: 4,
  height: '135%',
  marginLeft: '5%',
  marginRight: '5%',
  width: 'auto',
  borderColor: 'black',
  backgroundColor: '#fff',
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '5%',
  marginBottom: '5%',
},
Text: {
  alignContent: 'center',
  justifyContent: 'center',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '5%',
  borderRadius: 4,
  height: '50%',
  borderWidth: 3,
},
});