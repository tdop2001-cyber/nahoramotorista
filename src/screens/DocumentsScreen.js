import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const DocumentsScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'CNH (Carteira Nacional de Habilitação)',
      status: 'valid',
      expiryDate: '15/08/2025',
      type: 'cnh',
      description: 'Categoria B - Carro'
    },
    {
      id: 2,
      name: 'CRLV (Certificado de Registro)',
      status: 'valid',
      expiryDate: '15/12/2024',
      type: 'crlv',
      description: 'Documento do veículo'
    },
    {
      id: 3,
      name: 'Seguro Obrigatório',
      status: 'valid',
      expiryDate: '20/11/2024',
      type: 'insurance',
      description: 'Seguro obrigatório do veículo'
    },
    {
      id: 4,
      name: 'Comprovante de Residência',
      status: 'pending',
      expiryDate: null,
      type: 'address',
      description: 'Comprovante de endereço atual'
    },
    {
      id: 5,
      name: 'Antecedentes Criminais',
      status: 'expired',
      expiryDate: '10/05/2024',
      type: 'background',
      description: 'Certidão de antecedentes criminais'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return themeColors.success || '#4CAF50';
      case 'pending': return themeColors.warning || '#FF9800';
      case 'expired': return themeColors.error || '#F44336';
      default: return themeColors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'valid': return 'Válido';
      case 'pending': return 'Pendente';
      case 'expired': return 'Vencido';
      default: return 'Desconhecido';
    }
  };

  const handleUploadDocument = (documentId) => {
    Alert.alert(
      'Upload de Documento',
      'Funcionalidade de upload será implementada em breve.',
      [{ text: 'OK' }]
    );
  };

  const handleViewDocument = (document) => {
    Alert.alert(
      'Visualizar Documento',
      `Visualizando: ${document.name}`,
      [{ text: 'OK' }]
    );
  };

  const renderDocumentCard = (document) => (
    <View 
      key={document.id}
      style={[styles.documentCard, { 
        backgroundColor: themeColors.surface, 
        borderColor: themeColors.border 
      }]}
    >
      <View style={styles.documentHeader}>
        <View style={styles.documentInfo}>
          <Text style={[styles.documentName, { color: themeColors.text }]}>
            {document.name}
          </Text>
          <Text style={[styles.documentDescription, { color: themeColors.textSecondary }]}>
            {document.description}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(document.status) }]}>
          <Text style={styles.statusText}>{getStatusText(document.status)}</Text>
        </View>
      </View>

      {document.expiryDate && (
        <Text style={[styles.expiryDate, { color: themeColors.textSecondary }]}>
          Válido até: {document.expiryDate}
        </Text>
      )}

      <View style={styles.documentActions}>
        {document.status === 'valid' ? (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: themeColors.primary }]}
            onPress={() => handleViewDocument(document)}
          >
            <Text style={styles.actionButtonText}>Visualizar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: themeColors.primary }]}
            onPress={() => handleUploadDocument(document.id)}
          >
            <Text style={styles.actionButtonText}>
              {document.status === 'expired' ? 'Renovar' : 'Enviar'}
            </Text>
          </TouchableOpacity>
        )}
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
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Documentos</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Documentos Necessários
            </Text>
            <Text style={[styles.sectionSubtitle, { color: themeColors.textSecondary }]}>
              Mantenha seus documentos sempre atualizados para continuar trabalhando
            </Text>
          </View>

          <View style={styles.documentsList}>
            {documents.map(renderDocumentCard)}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Dicas Importantes
            </Text>
            <View style={[styles.tipCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.tipText, { color: themeColors.text }]}>
                • Sempre mantenha seus documentos atualizados{'\n'}
                • Renove os documentos com pelo menos 30 dias de antecedência{'\n'}
                • Guarde fotos dos documentos em local seguro{'\n'}
                • Em caso de perda, comunique imediatamente
              </Text>
            </View>
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
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  documentsList: {
    marginTop: 10,
  },
  documentCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  documentInfo: {
    flex: 1,
    marginRight: 10,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  expiryDate: {
    fontSize: 14,
    marginBottom: 15,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tipCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default DocumentsScreen;

