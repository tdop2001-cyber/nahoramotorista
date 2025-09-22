import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import SVGIcon from './SVGIcon';

const { width: screenWidth } = Dimensions.get('window');

const CustomDock = ({ navigation, currentRoute }) => {
  const { isDarkMode, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const tabs = [
    { name: 'home', label: 'Início', icon: 'home' },
    { name: 'deliveries', label: 'Entregas', icon: 'deliveries' },
    { name: 'earnings', label: 'Ganhos', icon: 'earnings' },
    { name: 'profile', label: 'Perfil', icon: 'profile' },
  ];

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  return (
    <View style={[
      styles.dock, 
      { 
        backgroundColor: themeColors.tabBarBackground,
        paddingBottom: insets.bottom + 8,
        height: 60 + insets.bottom
      }
    ]}>
      {tabs.map((tab, index) => {
        const isActive = currentRoute === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <SVGIcon 
                name={tab.icon} 
                size={28} 
                color={themeColors.tabBarActive}
                focused={isActive}
              />
            </View>
            <Text style={[
              styles.label,
              { color: isActive ? themeColors.tabBarActive : themeColors.tabBarInactive }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    minWidth: 0,
    position: 'relative',
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CustomDock;
