import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const VehicleScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const [formData, setFormData] = useState({
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: '2020',
    placa: 'ABC-1234',
    cor: 'Branco',
    renavam: '12345678901',
    tipo: 'Sedan',
    combustivel: 'Flex',
  });

  const handleSave = () => {
    Alert.alert('Sucesso', 'Informações do veículo atualizadas com sucesso!');
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

  const renderPicker = (label, value, key, options) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: themeColors.text }]}>{label}</Text>
      <View style={[styles.pickerContainer, { 
        backgroundColor: themeColors.surface, 
        borderColor: themeColors.border 
      }]}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => setFormData({ ...formData, [key]: itemValue })}
          style={[styles.picker, { color: themeColors.text }]}
        >
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
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
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Veículo</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Informações do Veículo</Text>
            
            {renderInput('Marca', formData.marca, 'marca', 'Ex: Toyota, Honda, Ford')}
            {renderInput('Modelo', formData.modelo, 'modelo', 'Ex: Corolla, Civic, Focus')}
            {renderInput('Ano', formData.ano, 'ano', '2020', 'numeric')}
            {renderInput('Placa', formData.placa, 'placa', 'ABC-1234')}
            {renderInput('Cor', formData.cor, 'cor', 'Ex: Branco, Preto, Prata')}
            {renderInput('RENAVAM', formData.renavam, 'renavam', '12345678901', 'numeric')}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Especificações</Text>
            
            {renderPicker('Tipo de Veículo', formData.tipo, 'tipo', [
              'Sedan', 'Hatchback', 'SUV', 'Pickup', 'Van', 'Moto'
            ])}
            {renderPicker('Tipo de Combustível', formData.combustivel, 'combustivel', [
              'Flex', 'Gasolina', 'Álcool', 'Diesel', 'Elétrico', 'Híbrido'
            ])}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Documentos</Text>
            <View style={[styles.documentCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.documentTitle, { color: themeColors.text }]}>CRLV (Certificado de Registro)</Text>
              <Text style={[styles.documentStatus, { color: themeColors.success }]}>✓ Válido até 15/12/2024</Text>
            </View>
            <View style={[styles.documentCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.documentTitle, { color: themeColors.text }]}>Seguro Obrigatório</Text>
              <Text style={[styles.documentStatus, { color: themeColors.success }]}>✓ Válido até 20/11/2024</Text>
            </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  documentCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  documentStatus: {
    fontSize: 14,
    fontWeight: '500',
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

export default VehicleScreen;

