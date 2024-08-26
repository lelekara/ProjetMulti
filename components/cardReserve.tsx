import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Paho from 'paho-mqtt';
import * as Progress from 'react-native-progress';

const client = new Paho.Client(
  'mqtt.lelekara.me',
  Number(9001),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

const CardReserve = () => {
  const [tankCapacity, setTankCapacity] = useState(20);
  const [isConnected, setIsConnected] = useState(false);

  function onMessage(message: Paho.Message) {
    if (message.destinationName === 'Distance') {
      setTankCapacity(parseInt(message.payloadString || '0', 10));
    }
  }

  function subscribeToTankCapacity() {
    client.subscribe('Distance');
    client.onMessageArrived = onMessage;
  }

  useEffect(() => {
    function connectToMqtt() {
      if (!isConnected) {
        client.connect({
          onSuccess: () => {
            console.log('Connected to MQTT!');
            setIsConnected(true);
            subscribeToTankCapacity();
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
        <Text style={styles.title}>Capacity Tank</Text>
        <Progress.Bar style={styles.progress} 
        width={360}
        height={20}
        progress={tankCapacity / 100}/>
        <Text style={styles.title}>{tankCapacity}%</Text>
      </View>
    </ScrollView>
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

export default CardReserve;
