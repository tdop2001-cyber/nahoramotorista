import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const LogoutScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair da sua conta?',
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => {
            // Aqui você implementaria a lógica de logout
            // Por exemplo: limpar dados do usuário, token, etc.
            Alert.alert(
              'Logout Realizado',
              'Você foi desconectado com sucesso.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    // Navegar para a tela de login/splash
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Splash' }],
                    });
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

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
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Sair</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.logoutContainer}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={[styles.logoutTitle, { color: themeColors.text }]}>
              Desconectar da Conta
            </Text>
            <Text style={[styles.logoutSubtitle, { color: themeColors.textSecondary }]}>
              Você será desconectado do aplicativo e precisará fazer login novamente para acessar suas informações.
            </Text>

            <View style={styles.userInfo}>
              <Text style={[styles.userInfoTitle, { color: themeColors.text }]}>
                Informações da Conta
              </Text>
              <View style={[styles.userInfoCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                <Text style={[styles.userInfoText, { color: themeColors.text }]}>
                  Nome: João Silva
                </Text>
                <Text style={[styles.userInfoText, { color: themeColors.text }]}>
                  E-mail: joao.silva@email.com
                </Text>
                <Text style={[styles.userInfoText, { color: themeColors.text }]}>
                  Último acesso: Hoje às 14:30
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.logoutButton, { backgroundColor: themeColors.error || '#F44336' }]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Confirmar Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.cancelButton, { borderColor: themeColors.border }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.cancelButtonText, { color: themeColors.text }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: 'center',
  },
  logoutContainer: {
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  logoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  logoutSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  userInfo: {
    width: '100%',
    marginBottom: 30,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  userInfoCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  userInfoText: {
    fontSize: 14,
    marginBottom: 8,
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LogoutScreen;

