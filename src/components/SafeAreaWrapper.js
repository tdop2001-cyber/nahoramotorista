import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

const SafeAreaWrapper = ({ children, style }) => {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView 
      style={[{ flex: 1, backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5' }, style]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? '#0a0a0a' : '#f5f5f5'}
        translucent={false}
      />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
