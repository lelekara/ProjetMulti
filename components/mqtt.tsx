// mqttService.ts

import Paho from 'paho-mqtt';

const client = new Paho.Client(
  '192.168.1.103',
  Number(9001),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

interface MqttCallbacks {
  onSuccess: () => void;
  onFailure: () => void;
}

function onMessage(message: Paho.Message, callback: (humidity: number) => void) {
  if (message.destinationName === 'Moisure') {
    callback(parseInt(message.payloadString || '0', 10));
  }
}

function subscribeToMoisure(callback: (humidity: number) => void) {
  client.subscribe('Moisure');
  client.onMessageArrived = (message) => onMessage(message, callback);
}

function subscribeToTemperature(callback: (temperature: number) => void) {
  client.subscribe('Temperature');
  client.onMessageArrived = (message) => onMessage(message, callback);
}

function connectToMqtt(callbacks: MqttCallbacks) {
  client.connect({
    onSuccess: () => {
      console.log('Connected to MQTT!');
      callbacks.onSuccess();
    },
    onFailure: () => {
      console.log('Failed to connect to MQTT!');
      callbacks.onFailure();
    },
  });
}

function disconnectFromMqtt() {
  if (client.isConnected()) {
    client.disconnect();
    console.log('Disconnected from MQTT!');
  }
}

export { connectToMqtt, disconnectFromMqtt, subscribeToMoisure, subscribeToTemperature};
