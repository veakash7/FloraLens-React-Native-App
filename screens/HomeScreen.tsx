import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Button, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import Colors from '../constants/Colors';

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();
  const themeColors = Colors[theme];
  const styles = createStyles(themeColors);

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [plantData, setPlantData] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();
  
  const PLANT_ID_API_KEY = process.env.EXPO_PUBLIC_PLANT_ID_API_KEY;

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      if (data && data.uri) {
        setImage(data.uri);
        identifyPlant(data.base64);
      }
    }
  };

  const identifyPlant = async (imageBase64: string | undefined) => {
    if (!imageBase64) return;
    setLoading(true);
    setPlantData(null);
    const payload = { images: [imageBase64] };
    try {
      const response = await axios.post('https://api.plant.id/v2/identify', payload, {
        headers: { 'Content-Type': 'application/json', 'Api-Key': PLANT_ID_API_KEY },
      });
      if (response.data?.suggestions?.length > 0) {
        setPlantData(response.data.suggestions[0]);
      } else {
        Alert.alert("Identification Failed", "Could not identify the plant.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("API Error", "An error occurred during identification.");
    } finally {
      setLoading(false);
    }
  };

  const savePlant = async () => {
    if (!plantData || !image) return;
    setLoading(true);
    try {
      const newPlant = { id: Date.now().toString(), ...plantData, imageUri: image };
      const existingPlantsRaw = await AsyncStorage.getItem('my-plants');
      const existingPlants = existingPlantsRaw ? JSON.parse(existingPlantsRaw) : [];
      const updatedPlants = [...existingPlants, newPlant];
      await AsyncStorage.setItem('my-plants', JSON.stringify(updatedPlants));
      Alert.alert("Plant Saved!", `${newPlant.plant_name} has been saved successfully.`);
      resetState();
    } catch (error) {
      console.error("Error saving plant:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const resetState = () => {
    setImage(null);
    setPlantData(null);
    setLoading(false);
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (image) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: image }} style={styles.previewImage} />
        {loading && <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />}
        {plantData && !loading && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Plant Identified!</Text>
            <Text style={styles.resultText}>{plantData.plant_name}</Text>
            <TouchableOpacity onPress={savePlant} style={[styles.button, {backgroundColor: '#34C759'}]}>
              <Text style={styles.buttonText}>Save Plant</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={resetState} style={[styles.button, { marginTop: 0 }]}>
          <Text style={styles.buttonText}>Take Another Picture</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && <CameraView ref={cameraRef} style={styles.camera} facing={'back'} />}
      <View style={styles.topButtonContainer}>
        <Button title="View My Plants" onPress={() => navigation.navigate('MyPlants')} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton} />
      </View>
    </View>
  );
}

const createStyles = (themeColors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColors.background,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#ccc',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: themeColors.tint,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'center',
    color: themeColors.text,
    fontSize: 16,
    margin: 20,
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignSelf: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
  },
  resultText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingBottom: 10,
  },
  topButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
