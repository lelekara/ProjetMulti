import React, { useEffect, useState } from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput,Alert, Keyboard, View,Text, ImageBackground, FlatList} from 'react-native';
import Paho from "paho-mqtt";
import * as Progress from "react-native-progress";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";

const client = new Paho.Client(
  "192.168.0.103", // MQTT broker IP
  Number(9001),
  `mqtt-async-test-${String(Math.random() * 100)}`
);


const Historique = () => {
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [distance, setDistance] = useState(null);
  const [tank, setTank] = useState(null);

  const [history, setHistory] = useState([]);

  function onMessage(message: { payloadString: string }) {
    try {
      const sensorData = JSON.parse(message.payloadString);
      setTemperature(sensorData.temperature);
      setHumidity(sensorData.humidity);

      // Save data to the SQLite database
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO history (temperature, humidity, distance,tank, timestamp) VALUES (?, ?, ?, ?, datetime("now", "localtime"))',
          [sensorData.temperature, sensorData.humidity, sensorData.distance,sensorData.tank]
        );
      });

      // Update history state with the latest data
      updateHistory();
    } catch (error) {
      console.error("Error parsing MQTT message:", error);
    }
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, temperature REAL, humidity REAL, ppm REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)"
      );
    });

    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("Temperature");
        client.onMessageArrived = onMessage;
      },
      onFailure: (error) => {
        console.log("Failed to connect!", error);
      },
    });

    // Load initial history data
    updateHistory();
  }, []);

  const updateHistory = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM history ORDER BY timestamp DESC",
        [],
        (_, result) => {
          return setHistory(result.rows._array as never[]);
        }
      );
    });
  };

  const handleLogin = (status: boolean | ((prevState: boolean) => boolean)) => {
    setLoggedIn(status);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.title}>Admin View</Text>
          <Text style={styles.value}>Live Data:</Text>
          <Text style={styles.value}>
            Temperature:{" "}
            {temperature !== null ? `${temperature} °C` : "No data"}
          </Text>
          <Progress.Bar
            style={styles.temperatureProgress}
            progress={
              temperature !== null && temperature > 0 ? temperature / 100 : 0
            }
            width={200}
          />
          <Text style={styles.value}>
            Humidity: {humidity !== null ? `${humidity} %` : "No data"}
          </Text>
          {humidity !== null && (
            <Progress.Bar
              style={[
                styles.humidityProgress,
                {
                  backgroundColor:
                    humidity < 40 || humidity > 60 ? "red" : "green",
                },
              ]}
              progress={humidity / 100}
              width={200}
            />
          )}
          <Text style={styles.value}>
          </Text>
          <Text style={styles.value}>History:</Text>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.value}>
                  {item.timestamp} : {item.temperature} °C | Humidity:{item.humidity} % | Distance:{item.distance} cm | Tank:{item.tank} %
                </Text>
              </View>
            )}
          />
          <StatusBar style="auto" />
          <Button title="Log Out" onPress={handleLogout} />
        </>
        ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <Button title="Log In" onPress={() => handleLogin(true)} />
          <StatusBar style="auto" />
        </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  value: {
    fontSize: 18,
    marginBottom: 5,
  },
  temperatureProgress: {
    marginBottom: 15,
  },
  humidityProgress: {
    marginBottom: 15,
  },
});

export default Historique;