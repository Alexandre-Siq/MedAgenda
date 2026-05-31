import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initDatabase } from './src/database/database';
import HomeScreen from './src/screens/HomeScreen';
import TradeScreen from './src/screens/TradeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [databaseReady, setDatabaseReady] = useState(false);
  const [startupError, setStartupError] = useState('');

  useEffect(() => {
    async function prepareDatabase() {
      try {
        await initDatabase();
        setDatabaseReady(true);
      } catch (error) {
        setStartupError('Nao foi possivel iniciar o banco local.');
      }
    }

    prepareDatabase();
  }, []);

  if (!databaseReady) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <StatusBar style="light" />
          {startupError ? (
            <Text style={styles.errorText}>{startupError}</Text>
          ) : (
            <>
              <ActivityIndicator color="#8FB3FF" size="large" />
              <Text style={styles.loadingText}>Preparando sua carteira...</Text>
            </>
          )}
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#8FB3FF',
            tabBarInactiveTintColor: '#8A8F98',
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        >
          <Tab.Screen name="Carteira" component={HomeScreen} />
          <Tab.Screen name="Comprar/Vender" component={TradeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    color: '#E8EAED',
    fontSize: 16,
    marginTop: 16,
  },
  errorText: {
    color: '#FF9A9A',
    fontSize: 16,
    textAlign: 'center',
  },
  tabBar: {
    backgroundColor: '#181A20',
    borderTopColor: '#2A2D35',
    height: 64,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
