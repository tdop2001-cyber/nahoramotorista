/**
 * VaiJá Motorista App
 * Aplicativo para motoristas de entrega
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importar contexto de tema
import { ThemeProvider } from './src/contexts/ThemeContext';

// Importar telas
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DeliveryDetailScreen from './src/screens/DeliveryDetailScreen';
import AcceptOrderScreen from './src/screens/AcceptOrderScreen';
import PersonalDataScreen from './src/screens/PersonalDataScreen';
import VehicleScreen from './src/screens/VehicleScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import AppSettingsScreen from './src/screens/AppSettingsScreen';
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import LogoutScreen from './src/screens/LogoutScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor="#000"
        />
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          >
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DeliveryDetail"
              component={DeliveryDetailScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AcceptOrder"
              component={AcceptOrderScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PersonalData"
              component={PersonalDataScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Vehicle" 
              component={VehicleScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Documents" 
              component={DocumentsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="AppSettings" 
              component={AppSettingsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="HelpSupport" 
              component={HelpSupportScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Logout" 
              component={LogoutScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
