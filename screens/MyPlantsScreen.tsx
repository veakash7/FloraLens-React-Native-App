import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Colors from '../constants/Colors';

type Plant = {
  id: string;
  imageUri: string;
  plant_name: string;
};

export default function MyPlantsScreen() {
  const { theme } = useTheme();
  const themeColors = Colors[theme];
  const styles = createStyles(themeColors);

  const [plants, setPlants] = useState<Plant[]>([]);
  const isFocused = useIsFocused();

  const loadPlants = async () => {
    try {
      const savedPlants = await AsyncStorage.getItem('my-plants');
      if (savedPlants !== null) {
        setPlants(JSON.parse(savedPlants));
      }
    } catch (error) {
      console.error("Error loading plants:", error);
    }
  };
  
  useEffect(() => {
    if (isFocused) {
      loadPlants();
    }
  }, [isFocused]);

  const deletePlant = async (plantId: string) => {
    try {
      const updatedPlants = plants.filter(plant => plant.id !== plantId);
      await AsyncStorage.setItem('my-plants', JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const confirmDelete = (plant: Plant) => {
    Alert.alert(
      "Delete Plant",
      `Are you sure you want to delete ${plant.plant_name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deletePlant(plant.id), style: "destructive" },
      ]
    );
  };
  
  const renamePlant = async (plantId: string, newName: string) => {
    try {
      const updatedPlants = plants.map(plant => 
        plant.id === plantId ? { ...plant, plant_name: newName } : plant
      );
      await AsyncStorage.setItem('my-plants', JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
    } catch (error) {
      console.error("Error renaming plant:", error);
    }
  };

  const showRenamePrompt = (plant: Plant) => {
    Alert.prompt(
      "Rename Plant",
      "Enter a new name:",
      (newName) => {
        if (newName && newName.trim() !== "") {
          renamePlant(plant.id, newName.trim());
        }
      },
      'plain-text',
      plant.plant_name
    );
  };

  if (plants.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>You haven't saved any plants yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.plantCard}>
            <Image source={{ uri: item.imageUri }} style={styles.plantImage} />
            <Text style={styles.plantName}>{item.plant_name}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => showRenamePrompt(item)} style={styles.iconButton}>
                <FontAwesome name="pencil" size={20} color={themeColors.tint} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item)} style={styles.iconButton}>
                <FontAwesome name="trash" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const createStyles = (themeColors: any) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: themeColors.background, 
    padding: 10 
  },
  infoText: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 50, 
    color: themeColors.text 
  },
  plantCard: {
    backgroundColor: themeColors.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  plantImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  plantName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    flex: 1, 
    color: themeColors.text 
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
});
