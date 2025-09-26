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
import SVGIcon from '../components/SVGIcon';

const DeliveryDetailScreen = ({ navigation, route }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  
  const { delivery } = route.params || {};
  
  const [deliveryData, setDeliveryData] = useState(delivery || {
    id: '47321',
    restaurant: 'Pizzaria Bella Vista',
    customer: 'Maria Silva',
    customerPhone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Jardim Primavera',
    status: 'available',
    time: '10 min atrás',
    value: 'R$ 25,50',
    deliveryFee: 'R$ 3,50',
    subtotal: 'R$ 22,00',
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 'R$ 18,00' },
      { name: 'Refrigerante Coca-Cola 350ml', quantity: 1, price: 'R$ 4,00' }
    ],
    notes: 'Entregar no portão da frente. Cliente prefere não tocar a campainha.',
    restaurantInfo: {
      name: 'Pizzaria Bella Vista',
      phone: '(11) 3333-4444',
      address: 'Av. Paulista, 1000 - Bela Vista',
      rating: 4.5
    },
    history: [
      { status: 'pending', time: '10 min atrás', description: 'Pedido recebido' },
      { status: 'available', time: '8 min atrás', description: 'Pedido disponível para coleta' },
      { status: 'picked_up', time: '5 min atrás', description: 'Pedido coletado' },
    ]
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { backgroundColor: 'rgba(255, 127, 80, 0.2)', borderColor: '#ff7f50' };
      case 'available':
        return { backgroundColor: 'rgba(0, 123, 255, 0.2)', borderColor: '#007BFF' };
      case 'picked_up':
        return { backgroundColor: 'rgba(255, 140, 0, 0.2)', borderColor: '#FF8C00' };
      case 'delivered':
        return { backgroundColor: 'rgba(30, 203, 79, 0.2)', borderColor: '#1ecb4f' };
      default:
        return { backgroundColor: 'rgba(102, 102, 102, 0.2)', borderColor: '#666666' };
    }
  };

  const getStatusTextStyle = (status) => {
    switch (status) {
      case 'pending':
        return { color: '#ff7f50' };
      case 'available':
        return { color: '#007BFF' };
      case 'picked_up':
        return { color: '#FF8C00' };
      case 'delivered':
        return { color: '#1ecb4f' };
      default:
        return { color: '#666666' };
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

  return (
    <SafeAreaWrapper>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={{ marginBottom: 16 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.textPrimary, { color: themeColors.primary }]}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Detalhes da Entrega</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Pedido #{deliveryData.id}
          </Text>
        </View>

        {/* Status da Entrega */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <View style={styles.listItemHeader}>
            <View style={styles.row}>
              <Text style={[styles.listItemTitle, { marginRight: 8, color: themeColors.text }]}>
                {getStatusEmoji(deliveryData.status)}
              </Text>
              <Text style={[styles.listItemTitle, { color: themeColors.text }]}>#{deliveryData.id}</Text>
            </View>
            <View style={[styles.statusBadge, getStatusStyle(deliveryData.status)]}>
              <Text style={[styles.statusText, getStatusTextStyle(deliveryData.status)]}>
                {getStatusLabel(deliveryData.status)}
              </Text>
            </View>
          </View>
          <Text style={[styles.textSecondary, { marginTop: 8, color: themeColors.textSecondary }]}>
            <SVGIcon name="clock" size={16} color={themeColors.textSecondary} /> {deliveryData.time}
          </Text>
        </View>

        {/* Informações do Restaurante */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Informações do Restaurante</Text>
          <View style={{ marginTop: 12 }}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80, color: themeColors.text }]}>Nome:</Text>
              <Text style={[styles.text, { color: themeColors.text }]}>{deliveryData.restaurantInfo?.name || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80, color: themeColors.text }]}>Telefone:</Text>
              <Text style={[styles.text, { color: themeColors.text }]}>{deliveryData.restaurantInfo?.phone || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80, color: themeColors.text }]}>Endereço:</Text>
              <Text style={[styles.text, { flex: 1, color: themeColors.text }]}>{deliveryData.restaurantInfo?.address || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80, color: themeColors.text }]}>Avaliação:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SVGIcon name="estrela" size={16} color={themeColors.text} />
                <Text style={[styles.text, { color: themeColors.text }]}> {deliveryData.restaurantInfo?.rating || 'N/A'}/5.0</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { marginTop: 12, backgroundColor: themeColors.primary, borderColor: themeColors.primary }]}
            onPress={handleCallRestaurant}
          >
            <Text style={[styles.buttonText, { color: '#ffffff' }]}>📞 Ligar para Restaurante</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary, { marginTop: 8, borderColor: themeColors.primary }]}
            onPress={handleNavigateToRestaurant}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SVGIcon name="navegacao" size={16} color={themeColors.primary} />
              <Text style={[styles.buttonSecondaryText, { color: themeColors.primary }]}> Navegar para Restaurante</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Informações do Cliente */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Informações do Cliente</Text>
          <View style={{ marginTop: 12 }}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80, color: themeColors.text }]}>Nome:</Text>
              <Text style={[styles.text, { color: themeColors.text }]}>{deliveryData.customer || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80, color: themeColors.text }]}>Telefone:</Text>
              <Text style={[styles.text, { color: themeColors.text }]}>{deliveryData.customerPhone || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80, color: themeColors.text }]}>Endereço:</Text>
              <Text style={[styles.text, { flex: 1, color: themeColors.text }]}>{deliveryData.address || 'Não informado'}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { marginTop: 12, backgroundColor: themeColors.primary, borderColor: themeColors.primary }]}
            onPress={handleCallCustomer}
          >
            <Text style={[styles.buttonText, { color: '#ffffff' }]}>📞 Ligar para Cliente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary, { marginTop: 8, borderColor: themeColors.primary }]}
            onPress={handleNavigateToCustomer}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SVGIcon name="navegacao" size={16} color={themeColors.primary} />
              <Text style={[styles.buttonSecondaryText, { color: themeColors.primary }]}> Navegar para Cliente</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Itens do Pedido */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Itens do Pedido</Text>
          <View style={{ marginTop: 12 }}>
            {(deliveryData.items || []).map((item, index) => (
              <View key={index} style={[styles.row, styles.spaceBetween, { marginBottom: 8, paddingVertical: 4 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.text, { color: themeColors.text }]}>{item.quantity || 1}x {item.name || 'Item'}</Text>
                </View>
                <Text style={[styles.textPrimary, { fontWeight: '600', color: themeColors.primary }]}>{item.price || 'R$ 0,00'}</Text>
              </View>
            ))}
          </View>
          
          <View style={{ borderTopWidth: 1, borderTopColor: themeColors.border, marginTop: 12, paddingTop: 12 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 4 }]}>
              <Text style={[styles.textSecondary, { color: themeColors.textSecondary }]}>Subtotal:</Text>
              <Text style={[styles.text, { color: themeColors.text }]}>{deliveryData.subtotal || 'R$ 0,00'}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 4 }]}>
              <Text style={[styles.textSecondary, { color: themeColors.textSecondary }]}>Taxa de Entrega:</Text>
              <Text style={[styles.text, { color: themeColors.text }]}>{deliveryData.deliveryFee || 'R$ 0,00'}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: themeColors.border }]}>
              <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16, color: themeColors.text }]}>Total:</Text>
              <Text style={[styles.textPrimary, { fontWeight: 'bold', fontSize: 18, color: themeColors.primary }]}>{deliveryData.value || 'R$ 0,00'}</Text>
            </View>
          </View>
        </View>

        {/* Observações */}
        {deliveryData.notes && (
          <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>Observações</Text>
            <Text style={[styles.text, { marginTop: 12, lineHeight: 20, color: themeColors.text }]}>
              {deliveryData.notes}
            </Text>
          </View>
        )}

        {/* Histórico da Entrega */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Histórico da Entrega</Text>
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
                  <Text style={[styles.text, { color: themeColors.text }]}>{item.description || 'Status atualizado'}</Text>
                  <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 2, color: themeColors.textSecondary }]}>
                    {item.time || 'Agora'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ações Rápidas de Status */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Ações Rápidas</Text>
          <View style={{ marginTop: 12 }}>
            {deliveryData.status === 'available' && (
              <TouchableOpacity 
                style={[styles.button, { marginBottom: 12, backgroundColor: '#FF8C00', borderColor: '#FF8C00' }]}
                onPress={() => updateDeliveryStatus('picked_up', 'Coletado')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SVGIcon name="box" size={16} color="#ffffff" />
                  <Text style={[styles.buttonText, { color: '#ffffff' }]}> Coletar Pedido</Text>
                </View>
              </TouchableOpacity>
            )}
            
            {deliveryData.status === 'picked_up' && (
              <TouchableOpacity 
                style={[styles.button, { marginBottom: 12, backgroundColor: '#1ecb4f', borderColor: '#1ecb4f' }]}
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
                <Text style={[styles.textSecondary, { textAlign: 'center', marginTop: 4, color: themeColors.textSecondary }]}>
                  Esta entrega foi concluída com sucesso
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Ações Gerais */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Ações Gerais</Text>
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary, { marginBottom: 12, borderColor: themeColors.primary }]}
              onPress={handleUpdateStatus}
            >
              <Text style={[styles.buttonSecondaryText, { color: themeColors.primary }]}>🔄 Alterar Status Manualmente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = {
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
  },
  textPrimary: {
    fontSize: 14,
    fontWeight: '600',
  },
  textSecondary: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FF7300',
    borderColor: '#FF7300',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondaryText: {
    color: '#FF7300',
    fontSize: 16,
    fontWeight: '600',
  },
};

export default DeliveryDetailScreen;