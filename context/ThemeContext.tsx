import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define the shape of the context state
interface ThemeContextData {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

// Create a provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get the device's default color scheme (light or dark)
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(deviceTheme || 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook to use the theme context easily
export const useTheme = () => useContext(ThemeContext);
