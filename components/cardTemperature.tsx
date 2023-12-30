import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Paho from 'paho-mqtt';

const client = new Paho.Client(
  '192.168.1.103',
  Number(9001),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

const CardTemperature = () => {
  const [temperature, setTemperature] = useState(15);
  const [isConnected, setIsConnected] = useState(false);

  function onMessage(message: Paho.Message) {
    if (message.destinationName === 'Temperature') {
      setTemperature(parseInt(message.payloadString || '15', 10));
    }
  }

  function subscribeToTemperature() {
    client.subscribe('Temperature');
    client.onMessageArrived = onMessage;
  }

  useEffect(() => {
    function connectToMqtt() {
      if (!isConnected) {
        client.connect({
          onSuccess: () => {
            console.log('Connected to MQTT!');
            setIsConnected(true);
            subscribeToTemperature();
          },
          onFailure: () => {
            console.log('Failed to connect to MQTT!');
          },
        });
      }
    }

    connectToMqtt();

    // Clean up function for disconnecting when the component unmounts
    return () => {
      if (isConnected) {
        client.disconnect();
        setIsConnected(false);
      }
    };
  }, [isConnected]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Temperature</Text>
        <View style={styles.Text}>
          <Text style={styles.title}>{temperature}°</Text>
        </View>
      </View>
    </ScrollView>
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

export default CardTemperature;
