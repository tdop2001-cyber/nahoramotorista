import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const HelpSupportScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const [contactMessage, setContactMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const faqItems = [
    {
      id: 1,
      question: 'Como aceito um pedido de entrega?',
      answer: 'Quando um pedido estiver disponível, você receberá uma notificação. Toque em "Aceitar" para confirmar a entrega.'
    },
    {
      id: 2,
      question: 'Como funciona o pagamento?',
      answer: 'O pagamento é feito semanalmente via PIX ou transferência bancária. Você pode acompanhar seus ganhos na tela inicial.'
    },
    {
      id: 3,
      question: 'O que fazer se o cliente não estiver no endereço?',
      answer: 'Tente entrar em contato com o cliente pelo telefone. Se não conseguir, marque como "Cliente não encontrado" no app.'
    },
    {
      id: 4,
      question: 'Como cancelar uma entrega?',
      answer: 'Você pode cancelar uma entrega antes de confirmar a coleta. Após confirmar, entre em contato com o suporte.'
    },
    {
      id: 5,
      question: 'Como atualizar meus documentos?',
      answer: 'Vá em "Documentos" no menu e toque em "Enviar" ou "Renovar" ao lado do documento que precisa ser atualizado.'
    }
  ];

  const contactCategories = [
    'Problema técnico',
    'Dúvida sobre pagamento',
    'Problema com entrega',
    'Atualização de documentos',
    'Outros'
  ];

  const handleCallSupport = () => {
    Linking.openURL('tel:+551140028922');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:suporte@vaija.com?subject=Suporte VaiJá Motorista');
  };

  const handleWhatsAppSupport = () => {
    Linking.openURL('https://wa.me/551140028922?text=Olá, preciso de ajuda com o app VaiJá Motorista');
  };

  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua mensagem.');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }
    
    Alert.alert(
      'Mensagem Enviada',
      'Sua mensagem foi enviada com sucesso! Entraremos em contato em até 24 horas.',
      [{ text: 'OK' }]
    );
    setContactMessage('');
    setSelectedCategory('');
  };

  const renderFAQItem = (item) => (
    <View 
      key={item.id}
      style={[styles.faqItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
    >
      <Text style={[styles.faqQuestion, { color: themeColors.text }]}>
        {item.question}
      </Text>
      <Text style={[styles.faqAnswer, { color: themeColors.textSecondary }]}>
        {item.answer}
      </Text>
    </View>
  );

  const renderContactOption = (title, subtitle, onPress, icon) => (
    <TouchableOpacity 
      style={[styles.contactOption, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
      onPress={onPress}
    >
      <View style={styles.contactContent}>
        <Text style={styles.contactIcon}>{icon}</Text>
        <View style={styles.contactText}>
          <Text style={[styles.contactTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.contactSubtitle, { color: themeColors.textSecondary }]}>{subtitle}</Text>
        </View>
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
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Ajuda e Suporte</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Perguntas Frequentes
            </Text>
            {faqItems.map(renderFAQItem)}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Entre em Contato
            </Text>
            
            {renderContactOption(
              'Telefone',
              'Ligue para (11) 4002-8922',
              handleCallSupport,
              '📞'
            )}
            
            {renderContactOption(
              'E-mail',
              'suporte@vaija.com',
              handleEmailSupport,
              '📧'
            )}
            
            {renderContactOption(
              'WhatsApp',
              'Chat direto com nossa equipe',
              handleWhatsAppSupport,
              '💬'
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Envie uma Mensagem
            </Text>
            
            <View style={[styles.messageForm, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.formLabel, { color: themeColors.text }]}>Categoria</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {contactCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      { 
                        backgroundColor: selectedCategory === category ? themeColors.primary : themeColors.background,
                        borderColor: themeColors.border
                      }
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      { color: selectedCategory === category ? '#fff' : themeColors.text }
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={[styles.formLabel, { color: themeColors.text }]}>Sua Mensagem</Text>
              <TextInput
                style={[styles.messageInput, { 
                  backgroundColor: themeColors.background, 
                  borderColor: themeColors.border,
                  color: themeColors.text 
                }]}
                value={contactMessage}
                onChangeText={setContactMessage}
                placeholder="Descreva sua dúvida ou problema..."
                placeholderTextColor={themeColors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity 
                style={[styles.sendButton, { backgroundColor: themeColors.primary }]}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>Enviar Mensagem</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Horário de Atendimento
            </Text>
            <View style={[styles.scheduleCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.scheduleText, { color: themeColors.text }]}>
                Segunda a Sexta: 8h às 18h{'\n'}
                Sábado: 8h às 12h{'\n'}
                Domingo: Fechado
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
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  faqItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactOption: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
  },
  messageForm: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 10,
  },
  categoryScroll: {
    marginBottom: 15,
  },
  categoryButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 15,
  },
  sendButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  scheduleText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default HelpSupportScreen;

