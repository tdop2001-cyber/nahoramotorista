import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const AppSettingsScreen = ({ navigation }) => {
  const { isDarkMode, colors, toggleTheme } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const [settings, setSettings] = useState({
    notifications: true,
    soundNotifications: true,
    vibration: true,
    locationTracking: true,
    autoAcceptOrders: false,
    offlineMode: false,
    dataSaver: false,
  });

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Redefinir Configurações',
      'Tem certeza que deseja redefinir todas as configurações para os valores padrão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Redefinir', 
          style: 'destructive',
          onPress: () => {
            setSettings({
              notifications: true,
              soundNotifications: true,
              vibration: true,
              locationTracking: true,
              autoAcceptOrders: false,
              offlineMode: false,
              dataSaver: false,
            });
            Alert.alert('Sucesso', 'Configurações redefinidas com sucesso!');
          }
        }
      ]
    );
  };

  const renderSettingItem = (title, subtitle, key, value, onPress) => (
    <View style={[styles.settingItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
      <View style={styles.settingContent}>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.settingSubtitle, { color: themeColors.textSecondary }]}>{subtitle}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: themeColors.border, true: themeColors.primary }}
          thumbColor={value ? '#fff' : themeColors.textSecondary}
        />
      </View>
    </View>
  );

  const renderNavigationItem = (title, subtitle, onPress) => (
    <TouchableOpacity 
      style={[styles.settingItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
      onPress={onPress}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.settingSubtitle, { color: themeColors.textSecondary }]}>{subtitle}</Text>
        </View>
        <Text style={[styles.arrow, { color: themeColors.textSecondary }]}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backButtonText, { color: themeColors.primary }]}>‹ Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Configurações</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Aparência</Text>
            {renderSettingItem(
              'Modo Escuro',
              'Alternar entre tema claro e escuro',
              'darkMode',
              isDarkMode,
              toggleTheme
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Notificações</Text>
            {renderSettingItem(
              'Notificações Push',
              'Receber notificações de novos pedidos',
              'notifications',
              settings.notifications,
              (value) => handleSettingChange('notifications', value)
            )}
            {renderSettingItem(
              'Som das Notificações',
              'Reproduzir som ao receber notificações',
              'soundNotifications',
              settings.soundNotifications,
              (value) => handleSettingChange('soundNotifications', value)
            )}
            {renderSettingItem(
              'Vibração',
              'Vibrar ao receber notificações',
              'vibration',
              settings.vibration,
              (value) => handleSettingChange('vibration', value)
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Localização</Text>
            {renderSettingItem(
              'Rastreamento de Localização',
              'Permitir rastreamento para entregas',
              'locationTracking',
              settings.locationTracking,
              (value) => handleSettingChange('locationTracking', value)
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Pedidos</Text>
            {renderSettingItem(
              'Aceitar Pedidos Automaticamente',
              'Aceitar pedidos sem confirmação manual',
              'autoAcceptOrders',
              settings.autoAcceptOrders,
              (value) => handleSettingChange('autoAcceptOrders', value)
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Economia de Dados</Text>
            {renderSettingItem(
              'Modo Offline',
              'Funcionar sem conexão com internet',
              'offlineMode',
              settings.offlineMode,
              (value) => handleSettingChange('offlineMode', value)
            )}
            {renderSettingItem(
              'Economia de Dados',
              'Reduzir uso de dados móveis',
              'dataSaver',
              settings.dataSaver,
              (value) => handleSettingChange('dataSaver', value)
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Privacidade</Text>
            {renderNavigationItem(
              'Política de Privacidade',
              'Como protegemos seus dados',
              () => Alert.alert('Política de Privacidade', 'Abrindo política de privacidade...')
            )}
            {renderNavigationItem(
              'Termos de Uso',
              'Termos e condições do aplicativo',
              () => Alert.alert('Termos de Uso', 'Abrindo termos de uso...')
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Sobre</Text>
            {renderNavigationItem(
              'Versão do App',
              'VaiJá Motorista v1.0.0',
              () => Alert.alert('Versão', 'VaiJá Motorista v1.0.0\nBuild 2024.1')
            )}
            {renderNavigationItem(
              'Suporte',
              'Entre em contato conosco',
              () => Alert.alert('Suporte', 'Email: suporte@vaija.com\nTelefone: (11) 4002-8922')
            )}
          </View>

          <TouchableOpacity 
            style={[styles.resetButton, { borderColor: themeColors.error || '#F44336' }]}
            onPress={handleResetSettings}
          >
            <Text style={[styles.resetButtonText, { color: themeColors.error || '#F44336' }]}>
              Redefinir Configurações
            </Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  settingItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginRight: 15,
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
  resetButton: {
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppSettingsScreen;

