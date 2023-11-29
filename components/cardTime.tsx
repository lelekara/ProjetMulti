import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CardTime() {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Day / Night Indicator</Text>

      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  borderWidth: 1,
  borderRadius: 4,
  height: '200%',
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
});
