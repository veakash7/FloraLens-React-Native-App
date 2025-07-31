import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Import the provider and hook
import Colors from './constants/Colors'; // Import our color palettes

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import MyPlantsScreen from './screens/MyPlantsScreen';

const Stack = createStackNavigator();

// A new component that contains our navigation logic
// This is necessary so it can be a child of ThemeProvider and use the useTheme hook
function AppNavigator() {
  const { theme } = useTheme(); // Use the hook to get the current theme
  const currentTheme = theme === 'light' ? DefaultTheme : DarkTheme;
  const themeColors = Colors[theme];

  return (
    <NavigationContainer theme={{
        ...currentTheme,
        colors: {
          ...currentTheme.colors,
          background: themeColors.background,
          card: themeColors.card,
          text: themeColors.text,
          primary: themeColors.tint,
        },
      }}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Identify a Plant' }} 
        />
        <Stack.Screen 
          name="MyPlants" 
          component={MyPlantsScreen} 
          options={{ title: 'My Saved Plants' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// The main App component now just wraps everything with the ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
