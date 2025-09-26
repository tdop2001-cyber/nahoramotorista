import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const PersonalDataScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const [formData, setFormData] = useState({
    nome: 'João Silva',
    telefone: '(11) 99999-9999',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    endereco: 'Rua das Flores, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    cep: '01234-567',
  });

  const handleSave = () => {
    Alert.alert('Sucesso', 'Dados pessoais atualizados com sucesso!');
  };

  const renderInput = (label, value, key, placeholder, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: themeColors.text }]}>{label}</Text>
      <TextInput
        style={[styles.input, { 
          backgroundColor: themeColors.surface, 
          borderColor: themeColors.border,
          color: themeColors.text 
        }]}
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        keyboardType={keyboardType}
      />
    </View>
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
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Dados Pessoais</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Informações Básicas</Text>
            
            {renderInput('Nome Completo', formData.nome, 'nome', 'Digite seu nome completo')}
            {renderInput('Telefone', formData.telefone, 'telefone', '(11) 99999-9999', 'phone-pad')}
            {renderInput('E-mail', formData.email, 'email', 'seu@email.com', 'email-address')}
            {renderInput('CPF', formData.cpf, 'cpf', '000.000.000-00', 'numeric')}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Endereço</Text>
            
            {renderInput('Endereço', formData.endereco, 'endereco', 'Rua, número')}
            {renderInput('Bairro', formData.bairro, 'bairro', 'Nome do bairro')}
            {renderInput('Cidade', formData.cidade, 'cidade', 'Nome da cidade')}
            {renderInput('CEP', formData.cep, 'cep', '00000-000', 'numeric')}
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: themeColors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
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
    paddingBottom: 150, // Espaço para o CustomDock
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PersonalDataScreen;

