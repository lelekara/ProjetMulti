import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface SensorData {
  source: string;
  value: number;
  date_time: string;
}

const Historique = () => {
  const [groupedData, setGroupedData] = useState<{ [key: string]: SensorData[] }>({});

  const formatDate = (dateString: string) => {
    return dateString.split('.')[0].replace('T', ' ');
  };

  useEffect(() => {
    fetch('http://192.168.1.128:3000/data')
      .then((response) => response.json())
      .then((data: SensorData[]) => {
        // Regrouper les données par catégorie (source)
        const grouped: { [key: string]: SensorData[] } = data.reduce((acc, item) => {
          if (!acc[item.source]) {
            acc[item.source] = [];
          }
          acc[item.source].push(item);
          return acc;
        }, {} as { [key: string]: SensorData[] });

        setGroupedData(grouped);
      })
      .catch((error) => console.error('Error fetching history:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique</Text>

      {/* Affichage des données regroupées */}
      {Object.keys(groupedData).map((key) => (
        <View key={key} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{key}</Text>
          <FlatList
            data={groupedData[key]}
            keyExtractor={(item, index) => `${item.date_time}-${index}`}
            renderItem={({ item }) => (
              <Text style={styles.item}>
                {item.date_time}: {item.value}
                {key === 'Temperature' ? ' °C' : key === 'Humidity' ? ' %' : key === 'Distance' ? ' cm' : ' % (niveau d\'eau)'}
              </Text>
            )}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 80,
    marginTop: 50,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Historique;
