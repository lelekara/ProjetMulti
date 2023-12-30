// import Paho from 'paho-mqtt';

// const client = new Paho.Client(
//   '192.168.1.103',
//   Number(9001),
//   `mqtt-async-test-${parseInt(Math.random() * 100)}`
// );

// interface MqttCallbacks {
//   onSuccess: () => void;
//   onFailure: () => void;
// }


// function connectToMqtt(callbacks: MqttCallbacks) {
//   client.connect({
//     onSuccess: () => {
//       console.log('Connected to MQTT!');
//       callbacks.onSuccess();
//     },
//     onFailure: () => {
//       console.log('Failed to connect to MQTT!');
//       callbacks.onFailure();
//     },
//   });
// }

// function disconnectFromMqtt() {
//   if (client.isConnected()) {
//     client.disconnect();
//     console.log('Disconnected from MQTT!');
//   }
// }

// export { connectToMqtt, disconnectFromMqtt, };
