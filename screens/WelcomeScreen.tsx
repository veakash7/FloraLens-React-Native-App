import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Colors from '../constants/Colors';

type WelcomeScreenProps = {
  navigation: any;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const themeColors = Colors[theme];
  const styles = createStyles(themeColors);

  return (
    <LinearGradient
      colors={themeColors.gradient}
      style={styles.container}
    >
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <FontAwesome name="leaf" size={60} color={themeColors.tint} />
          <Text style={styles.title}>FloraLens</Text>
          <Text style={styles.subtitle}>Identify and manage your plants with a single snap.</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* Button 1: Identify New Plant */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Home')}
          >
            <FontAwesome name="camera" size={20} color={themeColors.welcomeButtonText} style={styles.icon} />
            <Text style={styles.buttonText}>Identify New Plant</Text>
          </TouchableOpacity>
          
          {/* Button 2: View My Collection - NOW USES THE SAME STYLES */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('MyPlants')}
          >
             <FontAwesome name="list-alt" size={20} color={themeColors.welcomeButtonText} style={styles.icon} />
            <Text style={styles.buttonText}>View My Collection</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
          <FontAwesome name={theme === 'light' ? 'moon-o' : 'sun-o'} size={24} color={themeColors.text} />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const createStyles = (themeColors: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: themeColors.text,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: themeColors.text,
    opacity: 0.7,
    marginTop: 15,
    textAlign: 'center',
    maxWidth: '80%',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  // This is now the single style for both buttons
  button: {
    backgroundColor: themeColors.welcomeButton,
    paddingVertical: 18,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // This is now the single text style for both buttons
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.welcomeButtonText,
  },
  icon: {
    marginRight: 12,
  },
  themeToggleButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  }
});
