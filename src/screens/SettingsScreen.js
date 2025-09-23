import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, colors, toggleTheme } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const settingsItems = [
    {
      title: 'Dados Pessoais',
      subtitle: 'Nome, telefone, endereço',
      type: 'navigate',
      onPress: () => navigation.navigate('PersonalData'),
      icon: '👤',
    },
    {
      title: 'Veículo',
      subtitle: 'Informações do seu veículo',
      type: 'navigate',
      onPress: () => navigation.navigate('Vehicle'),
      icon: '🚗',
    },
    {
      title: 'Documentos',
      subtitle: 'CNH, documentos do veículo',
      type: 'navigate',
      onPress: () => navigation.navigate('Documents'),
      icon: '📄',
    },
    {
      title: 'Configurações',
      subtitle: 'Notificações, preferências',
      type: 'navigate',
      onPress: () => navigation.navigate('AppSettings'),
      icon: '⚙️',
    },
    {
      title: 'Ajuda e Suporte',
      subtitle: 'Central de ajuda, contato',
      type: 'navigate',
      onPress: () => navigation.navigate('HelpSupport'),
      icon: '❓',
    },
    {
      title: 'Sair',
      subtitle: 'Fazer logout da conta',
      type: 'navigate',
      onPress: () => navigation.navigate('Logout'),
      icon: '🚪',
    },
  ];

  const renderSettingItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.settingItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
      onPress={item.onPress}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingLeft}>
          <Text style={styles.settingIcon}>{item.icon}</Text>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: themeColors.text }]}>{item.title}</Text>
            <Text style={[styles.settingSubtitle, { color: themeColors.textSecondary }]}>{item.subtitle}</Text>
          </View>
        </View>
        <Text style={[styles.arrow, { color: themeColors.textSecondary }]}>›</Text>
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
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Gerencie sua conta e configurações
            </Text>
            {settingsItems.map((item, index) => renderSettingItem(item, index))}
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingText: {
    flex: 1,
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


