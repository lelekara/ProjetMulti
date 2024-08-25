import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';
import Paho from 'paho-mqtt';

const client = new Paho.Client(
  '192.168.1.128',
  Number(9001),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export default function CardWaterButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [water, setWater] = useState(0);

  function onMessage(message: Paho.Message) {
    if (message.destinationName === 'Water') {
      setWater(parseInt(message.payloadString || '0', 10));
    }
  }

  function subscribeToWater() {
    client.subscribe('Water');
    client.onMessageArrived = onMessage;
  }

  function publishToWaterOn() {
    const water =1; // Inverse la valeur actuelle entre 0 et 1
    const topic = 'Water';

    if (client.isConnected()) {
      const mqttMessage = new Paho.Message(water.toString());
      mqttMessage.destinationName = topic;
      client.send(mqttMessage);
      console.log(`Message sent to topic ${topic}: ${water}`);
      setWater(water); // Met à jour la valeur localement
    } else {
      console.log('Not connected to MQTT. Cannot send message.');
    }
  }

  function publishToWaterOff() {
    const  water = 0 // Inverse la valeur actuelle entre 0 et 1
    const topic = 'Water';

    if (client.isConnected()) {
      const mqttMessage = new Paho.Message(water.toString());
      mqttMessage.destinationName = topic;
      client.send(mqttMessage);
      console.log(`Message sent to topic ${topic}: ${water}`);
      setWater(water); // Met à jour la valeur localement
    } else {
      console.log('Not connected to MQTT. Cannot send message.');
    }
  }

  useEffect(() => {
    function connectToMqtt() {
      if (!isConnected) {
        client.connect({
          onSuccess: () => {
            console.log('Connected to MQTT!');
            setIsConnected(true);
            subscribeToWater();
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
    <>
      <ScrollView>
        <View style={styles.container}>
        <Text>Activate the pump</Text>
          <View style={styles.button}>
            <Button title="ON" onPress={publishToWaterOn} />
            <Button title="OFF" onPress={publishToWaterOff} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

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
