import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const SettingsScreen = () => {
  const { isDarkMode, colors, toggleTheme } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const settingsItems = [
    {
      title: 'Modo Escuro',
      subtitle: 'Alternar entre tema claro e escuro',
      type: 'switch',
      value: isDarkMode,
      onPress: toggleTheme,
    },
    {
      title: 'Notificações',
      subtitle: 'Gerenciar notificações do app',
      type: 'navigate',
    },
    {
      title: 'Privacidade',
      subtitle: 'Configurações de privacidade',
      type: 'navigate',
    },
    {
      title: 'Sobre',
      subtitle: 'Informações sobre o app',
      type: 'navigate',
    },
  ];

  const renderSettingItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.settingItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
      onPress={item.type === 'navigate' ? item.onPress : undefined}
      disabled={item.type === 'switch'}
    >
      <View style={styles.settingContent}>
        <View>
          <Text style={[styles.settingTitle, { color: themeColors.text }]}>{item.title}</Text>
          <Text style={[styles.settingSubtitle, { color: themeColors.textSecondary }]}>{item.subtitle}</Text>
        </View>
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: themeColors.border, true: themeColors.primary }}
            thumbColor={item.value ? '#fff' : themeColors.textSecondary}
          />
        ) : (
          <Text style={[styles.arrow, { color: themeColors.textSecondary }]}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Configurações</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Aparência</Text>
            {renderSettingItem(settingsItems[0], 0)}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Geral</Text>
            {settingsItems.slice(1).map((item, index) => renderSettingItem(item, index + 1))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    opacity: 0.8,
  },
  settingItem: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

