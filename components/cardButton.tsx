import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Button } from 'react-native';
import Historique from './Historique';

const Stack = createStackNavigator();

const CardButton = ({navigation}) => {
return (
  <>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.button}>
          <Stack.Screen name="Hisotrique" component={Historique} />
          <Button title="History" onPress={() => {navigation.navigate('Historique')}} />
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
    width: '100%',
    paddingTop: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    borderColor: 'black',
    backgroundColor: '#fff',
  },
button: {
  borderWidth: 1,
  borderRadius: 4,
  marginBottom: '15%',
  marginLeft: '5%',
  marginRight: '10%',
  color: 'black',
},
});

export default CardButton;