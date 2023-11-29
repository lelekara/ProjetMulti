import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CardReserve() {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Capacity Tank</Text>
        <Progress.Bar style={styles.progress} progress={0.2} width={320} />
        <Text style={styles.title}>20%</Text>
      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  borderWidth: 1,
  borderRadius: 4,
  height: '100%',
  marginLeft: '4%',
  width: '92%',
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
