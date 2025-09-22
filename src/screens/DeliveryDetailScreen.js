import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const DeliveryDetailScreen = ({ navigation, route }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  
  const { delivery } = route.params || {};
  
  const [deliveryData, setDeliveryData] = useState(delivery || {
    id: 1,
    restaurant: 'Pizzaria Bella Vista',
    customer: 'Maria Silva',
    customerPhone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Jardim Primavera',
    status: 'available',
    time: '15 min',
    value: 'R$ 25,90',
    deliveryFee: 'R$ 3,50',
    subtotal: 'R$ 22,40',
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 'R$ 18,00' },
      { name: 'Refrigerante Coca-Cola 350ml', quantity: 1, price: 'R$ 4,40' }
    ],
    notes: 'Entregar no portão da frente. Cliente prefere não tocar a campainha.',
    restaurantInfo: {
      name: 'Pizzaria Bella Vista',
      phone: '(11) 3333-4444',
      address: 'Av. Paulista, 1000 - Bela Vista',
      rating: 4.5
    },
    history: [
      { status: 'pending', time: '15 min atrás', description: 'Pedido recebido' },
      { status: 'available', time: '10 min atrás', description: 'Pedido disponível para coleta' },
    ]
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700' };
      case 'available':
        return { backgroundColor: 'rgba(30, 203, 79, 0.2)', color: '#1ecb4f' };
      case 'picked_up':
        return { backgroundColor: 'rgba(255, 140, 0, 0.2)', color: '#FF8C00' };
      case 'delivered':
        return { backgroundColor: 'rgba(30, 203, 79, 0.2)', color: '#1ecb4f' };
      case 'busy':
        return { backgroundColor: 'rgba(255, 69, 0, 0.2)', color: '#FF4500' };
      default:
        return { backgroundColor: 'rgba(255, 115, 0, 0.2)', color: '#FF7300' };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'available':
        return 'Disponível';
      case 'picked_up':
        return 'Coletado';
      case 'delivered':
        return 'Entregue';
      case 'busy':
        return 'Ocupado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'available':
        return '✅';
      case 'picked_up':
        return '📦';
      case 'delivered':
        return '🎉';
      case 'busy':
        return '🔴';
      default:
        return '❓';
    }
  };

  const handleCallCustomer = () => {
    if (deliveryData.customerPhone) {
      Linking.openURL(`tel:${deliveryData.customerPhone}`);
    } else {
      Alert.alert('Erro', 'Telefone do cliente não disponível');
    }
  };

  const handleCallRestaurant = () => {
    if (deliveryData.restaurantInfo?.phone) {
      Linking.openURL(`tel:${deliveryData.restaurantInfo.phone}`);
    } else {
      Alert.alert('Erro', 'Telefone do restaurante não disponível');
    }
  };

  const handleNavigateToRestaurant = () => {
    Alert.alert('Navegação', 'Funcionalidade de navegação será implementada em breve!');
  };

  const handleNavigateToCustomer = () => {
    Alert.alert('Navegação', 'Funcionalidade de navegação será implementada em breve!');
  };

  const handleUpdateStatus = () => {
    const statusOptions = [
      { key: 'available', label: 'Disponível', emoji: '✅' },
      { key: 'picked_up', label: 'Coletado', emoji: '📦' },
      { key: 'delivered', label: 'Entregue', emoji: '🎉' },
    ];

    Alert.alert(
      'Atualizar Status',
      'Selecione o novo status da entrega:',
      [
        ...statusOptions.map(status => ({
          text: `${status.emoji} ${status.label}`,
          onPress: () => updateDeliveryStatus(status.key, status.label)
        })),
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const updateDeliveryStatus = (newStatus, statusLabel) => {
    const now = new Date();
    const timeFormatted = 'Agora';
    
    const newHistoryEntry = {
      status: newStatus,
      time: timeFormatted,
      description: `Status alterado para: ${statusLabel}`
    };

    setDeliveryData(prevData => ({
      ...prevData,
      status: newStatus,
      history: [newHistoryEntry, ...prevData.history]
    }));

    Alert.alert(
      '✅ Status Atualizado!',
      `Status da entrega #${deliveryData.id} foi alterado para: ${statusLabel}`,
      [{ text: 'OK' }]
    );
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    header: {
      backgroundColor: themeColors.surface,
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: themeColors.textSecondary,
    },
    card: {
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 12,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    row: {
      flexDirection: 'row',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    text: {
      color: themeColors.text,
    },
    textSecondary: {
      color: themeColors.textSecondary,
    },
    textPrimary: {
      color: themeColors.primary,
    },
    button: {
      backgroundColor: themeColors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: themeColors.primary,
    },
    buttonSecondaryText: {
      color: themeColors.primary,
    },
  };

  return (
    <SafeAreaWrapper>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={{ marginBottom: 16 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textPrimary}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da Entrega</Text>
          <Text style={styles.headerSubtitle}>
            Pedido #{deliveryData.id}
          </Text>
        </View>

        {/* Status da Entrega */}
        <View style={styles.card}>
          <View style={[styles.row, styles.spaceBetween, { alignItems: 'center', marginBottom: 8 }]}>
            <View style={styles.row}>
              <Text style={[styles.text, { marginRight: 8, fontSize: 20 }]}>
                {getStatusEmoji(deliveryData.status)}
              </Text>
              <Text style={[styles.text, { fontSize: 18, fontWeight: '600' }]}>#{deliveryData.id}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusStyle(deliveryData.status).backgroundColor }]}>
              <Text style={[styles.statusText, { color: getStatusStyle(deliveryData.status).color }]}>
                {getStatusLabel(deliveryData.status)}
              </Text>
            </View>
          </View>
          <Text style={[styles.textSecondary, { marginTop: 8 }]}>
            ⏰ {deliveryData.time}
          </Text>
        </View>

        {/* Informações do Restaurante */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do Restaurante</Text>
          <View style={{ marginTop: 12 }}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Nome:</Text>
              <Text style={styles.text}>{deliveryData.restaurantInfo?.name || deliveryData.restaurant || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Telefone:</Text>
              <Text style={styles.text}>{deliveryData.restaurantInfo?.phone || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Endereço:</Text>
              <Text style={[styles.text, { flex: 1 }]}>{deliveryData.restaurantInfo?.address || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Avaliação:</Text>
              <Text style={styles.text}>⭐ {deliveryData.restaurantInfo?.rating || 'N/A'}/5.0</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { marginTop: 12 }]}
            onPress={handleCallRestaurant}
          >
            <Text style={styles.buttonText}>📞 Ligar para Restaurante</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleNavigateToRestaurant}
          >
            <Text style={styles.buttonSecondaryText}>📍 Navegar para Restaurante</Text>
          </TouchableOpacity>
        </View>

        {/* Informações do Cliente */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do Cliente</Text>
          <View style={{ marginTop: 12 }}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Nome:</Text>
              <Text style={styles.text}>{deliveryData.customer || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Telefone:</Text>
              <Text style={styles.text}>{deliveryData.customerPhone || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Endereço:</Text>
              <Text style={[styles.text, { flex: 1 }]}>{deliveryData.address || 'Não informado'}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { marginTop: 12 }]}
            onPress={handleCallCustomer}
          >
            <Text style={styles.buttonText}>📞 Ligar para Cliente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleNavigateToCustomer}
          >
            <Text style={styles.buttonSecondaryText}>📍 Navegar para Cliente</Text>
          </TouchableOpacity>
        </View>

        {/* Itens do Pedido */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Itens do Pedido</Text>
          <View style={{ marginTop: 12 }}>
            {(deliveryData.items || []).map((item, index) => (
              <View key={index} style={[styles.row, styles.spaceBetween, { marginBottom: 8, paddingVertical: 4 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{item.quantity || 1}x {item.name || 'Item'}</Text>
                </View>
                <Text style={[styles.textPrimary, { fontWeight: '600' }]}>{item.price || 'R$ 0,00'}</Text>
              </View>
            ))}
          </View>
          
          <View style={{ borderTopWidth: 1, borderTopColor: themeColors.border, marginTop: 12, paddingTop: 12 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 4 }]}>
              <Text style={styles.textSecondary}>Subtotal:</Text>
              <Text style={styles.text}>{deliveryData.subtotal || 'R$ 0,00'}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 4 }]}>
              <Text style={styles.textSecondary}>Taxa de Entrega:</Text>
              <Text style={styles.text}>{deliveryData.deliveryFee || 'R$ 0,00'}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: themeColors.border }]}>
              <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>Total:</Text>
              <Text style={[styles.textPrimary, { fontWeight: 'bold', fontSize: 18 }]}>{deliveryData.value || 'R$ 0,00'}</Text>
            </View>
          </View>
        </View>

        {/* Observações */}
        {deliveryData.notes && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Observações</Text>
            <Text style={[styles.text, { marginTop: 12, lineHeight: 20 }]}>
              {deliveryData.notes}
            </Text>
          </View>
        )}

        {/* Histórico da Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Histórico da Entrega</Text>
          <View style={{ marginTop: 12 }}>
            {(deliveryData.history || []).map((item, index) => (
              <View key={index} style={[styles.row, { marginBottom: 12, alignItems: 'flex-start' }]}>
                <View style={{ marginRight: 12, marginTop: 2 }}>
                  <View style={[
                    { 
                      width: 12, 
                      height: 12, 
                      borderRadius: 6, 
                      backgroundColor: index === 0 ? themeColors.primary : themeColors.border 
                    }
                  ]} />
                  {index < (deliveryData.history || []).length - 1 && (
                    <View style={{ 
                      width: 2, 
                      height: 20, 
                      backgroundColor: themeColors.border, 
                      marginLeft: 5, 
                      marginTop: 2 
                    }} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{item.description || 'Status atualizado'}</Text>
                  <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 2 }]}>
                    {item.time || 'Agora'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ações Rápidas de Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ações Rápidas</Text>
          <View style={{ marginTop: 12 }}>
            {deliveryData.status === 'available' && (
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#FF8C00', borderColor: '#FF8C00' }]}
                onPress={() => updateDeliveryStatus('picked_up', 'Coletado')}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>📦 Coletar Pedido</Text>
              </TouchableOpacity>
            )}
            
            {deliveryData.status === 'picked_up' && (
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#1ecb4f', borderColor: '#1ecb4f' }]}
                onPress={() => updateDeliveryStatus('delivered', 'Entregue')}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>🎉 Marcar como Entregue</Text>
              </TouchableOpacity>
            )}
            
            {deliveryData.status === 'delivered' && (
              <View style={[styles.card, { backgroundColor: 'rgba(30, 203, 79, 0.1)', borderColor: '#1ecb4f', marginBottom: 12 }]}>
                <Text style={[styles.text, { color: '#1ecb4f', textAlign: 'center', fontWeight: '600' }]}>
                  🎉 Entrega Finalizada!
                </Text>
                <Text style={[styles.textSecondary, { textAlign: 'center', marginTop: 4 }]}>
                  Esta entrega foi concluída com sucesso
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Ações Gerais */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ações Gerais</Text>
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary, { marginBottom: 12 }]}
              onPress={handleUpdateStatus}
            >
              <Text style={styles.buttonSecondaryText}>🔄 Alterar Status Manualmente</Text>
            </TouchableOpacity>
            
            {deliveryData.status !== 'delivered' && (
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#FF4500', borderColor: '#FF4500', borderWidth: 1 }]}
                onPress={() => Alert.alert('Cancelar', 'Funcionalidade de cancelamento será implementada em breve!')}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>❌ Cancelar Entrega</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default DeliveryDetailScreen;
