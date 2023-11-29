import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Button } from 'react-native';

export default function CardWaterButton () {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.button}>
          <Button title="Give Water" onPress={() => {console.log('Giving Water')}} />
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
    borderColor: 'black',
    paddingTop: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 'auto',
    backgroundColor: '#fff',
  },
button: {
  borderWidth: 1,
  borderRadius: 4,
  marginBottom: '15%',
  marginLeft: '5%',
  marginRight: '5%',
  color: 'black',
},
});