import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Historique = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('Temperature'); // Valeur par défaut sélectionnée

  useEffect(() => {
    fetch('http://192.168.1.121:3000/data')
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.error('Error fetching history:', error));
  }, []);

  const formatDate = (dateString: string) => {
    return dateString.split('.')[0].replace('T', ' ');
  };

 // Filtrer et trier les données
 const filteredHistory = history
 .filter(item => item.source === selectedValue)
 .sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());

  return (
    <ImageBackground source={require('../assets/Wallpaper.jpeg')} style={styles.background}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Historique</Text>
      
      {/* Menu déroulant pour choisir la valeur à afficher */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Temperature" value="Temperature" />
          <Picker.Item label="Humidity" value="Humidity" />
          <Picker.Item label="Tank" value="Distance" />
          <Picker.Item label="Water Pump" value="Water" />
        </Picker>
      </View>
      
      <FlatList
          data={filteredHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {formatDate(item.date_time)}: {item.source} : {item.value}
            </Text>
          )}
        />
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '35%',
    marginTop: 100,
  },
  pickerContainer: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 10, // Priorité d'affichage du picker
  },
  picker: {
    height: 5,
    width: '100%',
    borderColor: 'white',
    marginBottom: 150,
  },
  item: {
    fontSize: 16,
    width: '50%',
    color: 'white',
    marginLeft: 100,
    marginBottom: 10,
  },
  background:{ 
    flex: 1,
    resizeMode: "cover",
  },
});

export default Historique;