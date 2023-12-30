import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import Paho from 'paho-mqtt';

const client = new Paho.Client(
  '192.168.1.103',
  Number(9001),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

const CardHumidity = () => {
  const [humidity, setHumidity] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  function onMessage(message: Paho.Message) {
    if (message.destinationName === 'Moisure') {
      setHumidity(parseInt(message.payloadString || '0', 10));
    }
  }

  function subscribeToMoisure() {
    client.subscribe('Moisure');
    client.onMessageArrived = onMessage;
  }

  useEffect(() => {
    function connectToMqtt() {
      if (!isConnected) {
        client.connect({
          onSuccess: () => {
            console.log('Connected!');
            setIsConnected(true);
            subscribeToMoisure();
          },
          onFailure: () => {
            console.log('Failed to connect!');
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
        <Text style={styles.title}>Humidity</Text>
        <Progress.Bar style={styles.progress} progress={humidity / 100} width={150} />
        <Text style={styles.title}>Current Humidity: {humidity}%</Text>
      </View>
    </ScrollView>
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
