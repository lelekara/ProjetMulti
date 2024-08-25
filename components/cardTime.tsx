import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CardTime() {
  // Obtention de l'heure actuelle
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const elapsedTime = hour * 60 + minute;
   // Détermine la progression du jour en pourcentage (de 0 à 1)
  const dayProgress = elapsedTime / (24 * 60);

  // Détermine si c'est le jour ou la nuit
  const isDay = hour >= 6 && hour < 20;

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: isDay ? '#fff' : '#333' }]}>
        <Text style={[styles.title, { color: isDay ? '#000' : '#fff' }]}>
          Day / Night Indicator
        </Text>
        <Progress.Bar
          progress={dayProgress}
          width={300}
          height={20}
          color={isDay ? '#FFDD00' : '#0033FF'}
          unfilledColor={isDay ? '#E0E0E0' : '#666'}
          borderColor={isDay ? '#000' : '#fff'}
          borderRadius={5}
        />
        <Text style={[styles.progressText, { color: isDay ? '#000' : '#fff' }]}>
          {Math.round(dayProgress * 100)}% of the day passed
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: '4%',
    width: '92%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    marginTop: 10,
  },
});
