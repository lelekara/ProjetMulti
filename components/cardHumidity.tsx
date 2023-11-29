import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import * as Progress from 'react-native-progress';

const CardHumidity = () => {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Humidity</Text>
        <Progress.Bar style={styles.progress} progress={0.3} width={150} />
        <Text style={styles.title}>30%</Text>
      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  borderWidth: 1,
  borderRadius: 4,
  height: 'auto',
  width: 'auto',
  marginLeft: '5%',
  borderColor: 'black',
  backgroundColor: '#fff',
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 20,
},
progress: {
  marginTop: 10,
  marginLeft: 10,
  color: 'black',
},
});

export default CardHumidity;