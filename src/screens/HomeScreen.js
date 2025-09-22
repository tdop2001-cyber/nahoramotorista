import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import StatusCard from '../components/StatusCard';
import CustomDock from '../components/CustomDock';
import DeliveryDetailScreen from './DeliveryDetailScreen';
import SettingsScreen from './SettingsScreen';


// Tela Principal do Motorista
const DriverHomeScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [driverStatus, setDriverStatus] = useState('available');

  const toggleStatus = () => {
    const newStatus = driverStatus === 'available' ? 'busy' : 'available';
    setDriverStatus(newStatus);
    Alert.alert(
      'Status Alterado',
      `Você está agora ${newStatus === 'available' ? 'disponível' : 'ocupado'} para entregas`
    );
  };

  const stats = [
    { title: 'Entregas Hoje', value: '12', status: 'available', icon: '📦' },
    { title: 'Ganhos Hoje', value: 'R$ 89,50', status: 'available', icon: '💰' },
    { title: 'Avaliação', value: '4.8', status: 'available', icon: '⭐' },
    { title: 'Tempo Online', value: '6h 30m', status: 'available', icon: '⏰' },
  ];

  // Função para obter a cor da faixa lateral baseada no status
  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'available':
        return '#007BFF'; // Azul para disponível
      case 'picked_up':
        return '#FF8C00'; // Laranja para coletado
      case 'delivered':
        return '#1ecb4f'; // Verde para entregue
      case 'pending':
        return '#FFD700'; // Dourado para pendente
      case 'busy':
        return '#FF4500'; // Vermelho para ocupado
      default:
        return '#FF7300'; // Laranja padrão
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Olá, João! 👋
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Pronto para suas entregas?
          </Text>
        </View>

        {/* Status do Motorista */}
        <View style={styles.statusSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Seu Status
          </Text>
          <TouchableOpacity 
            style={[
              styles.statusButton, 
              { 
                backgroundColor: driverStatus === 'available' ? themeColors.success : themeColors.error,
                borderColor: themeColors.border 
              }
            ]}
            onPress={toggleStatus}
          >
            <Text style={styles.statusButtonText}>
              {driverStatus === 'available' ? '🟢 Disponível' : '🔴 Ocupado'}
            </Text>
          </TouchableOpacity>
        </View>

            {/* Estatísticas */}
            <View style={styles.statsSection}>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Resumo de Hoje
              </Text>
              <View style={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <StatusCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    status={stat.status}
                    icon={<Text style={{ fontSize: 16 }}>{stat.icon}</Text>}
                  />
                ))}
              </View>
            </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Ações Rápidas
          </Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>📦</Text>
              <Text style={[styles.actionText, { color: themeColors.text }]}>Ver Entregas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>💰</Text>
              <Text style={[styles.actionText, { color: themeColors.text }]}>Ganhos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>📍</Text>
              <Text style={[styles.actionText, { color: themeColors.text }]}>Localização</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>⚙️</Text>
              <Text style={[styles.actionText, { color: themeColors.text }]}>Configurações</Text>
            </TouchableOpacity>
          </View>
        </View>

            {/* Entregas Recentes */}
            <View style={styles.recentSection}>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Entregas Recentes
              </Text>
              <TouchableOpacity 
                style={[styles.recentCard, {
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                  flexDirection: 'row',
                  paddingLeft: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  borderRadius: 12
                }]}
                onPress={() => {
                  const recentDelivery = {
                    id: 1,
                    restaurant: 'Pizzaria Bella Vista',
                    customer: 'Maria Silva',
                    customerPhone: '(11) 99999-9999',
                    address: 'Rua das Flores, 123 - Jardim Primavera',
                    status: 'delivered',
                    time: '2 horas atrás',
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
                      { status: 'pending', time: '2 horas atrás', description: 'Pedido recebido' },
                      { status: 'available', time: '1h 45min atrás', description: 'Pedido disponível para coleta' },
                      { status: 'picked_up', time: '1h 30min atrás', description: 'Pedido coletado' },
                      { status: 'delivered', time: '2 horas atrás', description: 'Pedido entregue' },
                    ]
                  };
                  navigation.navigate('DeliveryDetail', { delivery: recentDelivery });
                }}
              >
                {/* Faixa lateral colorida baseada no status */}
                <View style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 12,
                  backgroundColor: getStatusBorderColor('delivered'),
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }} />

                {/* Conteúdo do card */}
                <View style={{ flex: 1, paddingLeft: 20 }}>
                  <View style={styles.recentHeader}>
                    <Text style={[styles.recentTitle, { color: themeColors.text }]}>Pizza Margherita</Text>
                    <View style={[styles.statusBadge, { backgroundColor: 'rgba(30, 203, 79, 0.2)' }]}>
                      <Text style={[styles.statusText, { color: '#1ecb4f' }]}>Entregue</Text>
                    </View>
                  </View>
                  <Text style={[styles.recentSubtitle, { color: themeColors.textSecondary }]}>
                    Rua das Flores, 123 - 14:30
                  </Text>
                  <Text style={[styles.recentValue, { color: themeColors.primary }]}>
                    R$ 25,90
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

// Tela de Entregas
const DeliveriesScreen = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('todos');

  const deliveries = [
    {
      id: 1,
      restaurant: 'Pizzaria Bella Vista',
      customer: 'Maria Silva',
      customerPhone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - Jardim Primavera',
      value: 'R$ 25,90',
      deliveryFee: 'R$ 3,50',
      subtotal: 'R$ 22,40',
      status: 'picked_up',
      time: '15 min',
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
        { status: 'pending', time: '20 min atrás', description: 'Pedido recebido' },
        { status: 'available', time: '18 min atrás', description: 'Pedido disponível para coleta' },
        { status: 'picked_up', time: '15 min atrás', description: 'Pedido coletado' },
      ]
    },
    {
      id: 2,
      restaurant: 'Burger King',
      customer: 'João Santos',
      customerPhone: '(11) 88888-8888',
      address: 'Av. Paulista, 1000 - Centro',
      value: 'R$ 18,50',
      deliveryFee: 'R$ 2,50',
      subtotal: 'R$ 16,00',
      status: 'available',
      time: '8 min',
      items: [
        { name: 'Whopper', quantity: 1, price: 'R$ 12,00' },
        { name: 'Batata Frita Grande', quantity: 1, price: 'R$ 4,00' }
      ],
      notes: 'Cliente está no trabalho, entregar na recepção.',
      restaurantInfo: {
        name: 'Burger King',
        phone: '(11) 2222-3333',
        address: 'Av. Paulista, 1000 - Centro',
        rating: 4.2
      },
      history: [
        { status: 'pending', time: '10 min atrás', description: 'Pedido recebido' },
        { status: 'available', time: '8 min atrás', description: 'Pedido disponível para coleta' },
      ]
    },
    {
      id: 3,
      restaurant: 'McDonald\'s',
      customer: 'Ana Costa',
      customerPhone: '(11) 77777-7777',
      address: 'Rua Augusta, 456 - Consolação',
      value: 'R$ 22,00',
      deliveryFee: 'R$ 3,00',
      subtotal: 'R$ 19,00',
      status: 'delivered',
      time: '2 horas atrás',
      items: [
        { name: 'Big Mac', quantity: 1, price: 'R$ 15,00' },
        { name: 'McFlurry Oreo', quantity: 1, price: 'R$ 4,00' }
      ],
      notes: 'Entregar no apartamento 45, tocar a campainha.',
      restaurantInfo: {
        name: 'McDonald\'s',
        phone: '(11) 1111-2222',
        address: 'Rua Augusta, 456 - Consolação',
        rating: 4.0
      },
      history: [
        { status: 'pending', time: '2h 30min atrás', description: 'Pedido recebido' },
        { status: 'available', time: '2h 15min atrás', description: 'Pedido disponível para coleta' },
        { status: 'picked_up', time: '2h 10min atrás', description: 'Pedido coletado' },
        { status: 'delivered', time: '2 horas atrás', description: 'Pedido entregue' },
      ]
    },
    {
      id: 4,
      restaurant: 'Subway',
      customer: 'Carlos Oliveira',
      customerPhone: '(11) 66666-6666',
      address: 'Av. Ibirapuera, 789 - Moema',
      value: 'R$ 15,80',
      deliveryFee: 'R$ 2,80',
      subtotal: 'R$ 13,00',
      status: 'pending',
      time: '5 min',
      items: [
        { name: 'Sub Italiano 15cm', quantity: 1, price: 'R$ 13,00' }
      ],
      notes: 'Cliente é vegetariano, verificar ingredientes.',
      restaurantInfo: {
        name: 'Subway',
        phone: '(11) 4444-5555',
        address: 'Av. Ibirapuera, 789 - Moema',
        rating: 4.3
      },
      history: [
        { status: 'pending', time: '5 min atrás', description: 'Pedido recebido' },
      ]
    },
    {
      id: 5,
      restaurant: 'KFC',
      customer: 'Fernanda Lima',
      customerPhone: '(11) 55555-5555',
      address: 'Rua Oscar Freire, 321 - Jardins',
      value: 'R$ 28,50',
      deliveryFee: 'R$ 4,50',
      subtotal: 'R$ 24,00',
      status: 'available',
      time: '12 min',
      items: [
        { name: 'Balde de Frango (8 peças)', quantity: 1, price: 'R$ 24,00' }
      ],
      notes: 'Entregar na portaria do prédio.',
      restaurantInfo: {
        name: 'KFC',
        phone: '(11) 3333-4444',
        address: 'Rua Oscar Freire, 321 - Jardins',
        rating: 4.1
      },
      history: [
        { status: 'pending', time: '15 min atrás', description: 'Pedido recebido' },
        { status: 'available', time: '12 min atrás', description: 'Pedido disponível para coleta' },
      ]
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'available':
        return { text: 'Disponível', color: '#007BFF', bg: 'rgba(0, 123, 255, 0.2)' };
      case 'picked_up':
        return { text: 'Coletado', color: '#FF8C00', bg: 'rgba(255, 140, 0, 0.2)' };
      case 'delivered':
        return { text: 'Entregue', color: '#1ecb4f', bg: 'rgba(30, 203, 79, 0.2)' };
      case 'pending':
        return { text: 'Pendente', color: '#FFD700', bg: 'rgba(255, 215, 0, 0.2)' };
      default:
        return { text: 'Pendente', color: '#FF7300', bg: 'rgba(255, 115, 0, 0.2)' };
    }
  };

  // Função para obter a cor da faixa lateral baseada no status
  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'available':
        return '#007BFF'; // Azul para disponível
      case 'picked_up':
        return '#FF8C00'; // Laranja para coletado
      case 'delivered':
        return '#1ecb4f'; // Verde para entregue
      case 'pending':
        return '#FFD700'; // Dourado para pendente
      case 'busy':
        return '#FF4500'; // Vermelho para ocupado
      default:
        return '#FF7300'; // Laranja padrão
    }
  };

  // Função para filtrar entregas por status e busca
  const getFilteredDeliveries = () => {
    let filtered = deliveries;

    // Filtrar por status
    if (selectedStatus !== 'todos') {
      filtered = filtered.filter(delivery => delivery.status === selectedStatus);
    }

    // Filtrar por busca
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(delivery => 
        delivery.restaurant.toLowerCase().includes(searchLower) ||
        delivery.customer.toLowerCase().includes(searchLower) ||
        delivery.address.toLowerCase().includes(searchLower) ||
        delivery.id.toString().includes(searchLower)
      );
    }

    return filtered;
  };

  // Função para navegar para detalhes da entrega
  const handleDeliveryPress = (delivery) => {
    navigation.navigate('DeliveryDetail', { delivery });
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Entregas
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Suas entregas pendentes e concluídas
          </Text>
        </View>

        {/* Busca */}
        <View style={[styles.searchCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <TextInput
            style={[styles.searchInput, { 
              backgroundColor: themeColors.secondary, 
              color: themeColors.text 
            }]}
            placeholder="Buscar por restaurante, cliente, endereço ou ID..."
            placeholderTextColor={themeColors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filtros por Status */}
        <View style={[styles.filtersCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.filtersTitle, { color: themeColors.text }]}>
            Filtrar por Status
          </Text>
          <View style={styles.filtersContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedStatus === 'todos' ? styles.filterButtonActive : styles.filterButtonInactive,
                { borderColor: themeColors.primary }
              ]}
              onPress={() => setSelectedStatus('todos')}
            >
              <Text style={[
                styles.filterButtonText,
                { color: selectedStatus === 'todos' ? '#ffffff' : themeColors.primary }
              ]}>
                Todos
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedStatus === 'pending' ? { backgroundColor: '#FFD700' } : { backgroundColor: 'transparent' },
                { borderColor: '#FFD700' }
              ]}
              onPress={() => setSelectedStatus('pending')}
            >
              <Text style={[
                styles.filterButtonText,
                { color: selectedStatus === 'pending' ? '#000000' : '#FFD700' }
              ]}>
                Pendente
              </Text>
            </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedStatus === 'available' ? { backgroundColor: '#007BFF' } : { backgroundColor: 'transparent' },
                    { borderColor: '#007BFF' }
                  ]}
                  onPress={() => setSelectedStatus('available')}
                >
                  <Text style={[
                    styles.filterButtonText,
                    { color: selectedStatus === 'available' ? '#ffffff' : '#007BFF' }
                  ]}>
                    Disponível
                  </Text>
                </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedStatus === 'picked_up' ? { backgroundColor: '#FF8C00' } : { backgroundColor: 'transparent' },
                { borderColor: '#FF8C00' }
              ]}
              onPress={() => setSelectedStatus('picked_up')}
            >
              <Text style={[
                styles.filterButtonText,
                { color: selectedStatus === 'picked_up' ? '#ffffff' : '#FF8C00' }
              ]}>
                Coletado
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedStatus === 'delivered' ? { backgroundColor: '#1ecb4f' } : { backgroundColor: 'transparent' },
                { borderColor: '#1ecb4f' }
              ]}
              onPress={() => setSelectedStatus('delivered')}
            >
              <Text style={[
                styles.filterButtonText,
                { color: selectedStatus === 'delivered' ? '#ffffff' : '#1ecb4f' }
              ]}>
                Entregue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
            <ScrollView style={styles.listContainer}>
              {getFilteredDeliveries().map((delivery) => {
                const statusInfo = getStatusInfo(delivery.status);
                return (
                  <TouchableOpacity
                    key={delivery.id}
                    style={[styles.deliveryCard, {
                      backgroundColor: themeColors.surface,
                      borderColor: themeColors.border,
                      flexDirection: 'row',
                      paddingLeft: 0,
                      overflow: 'hidden',
                      position: 'relative',
                      borderRadius: 12
                    }]}
                    onPress={() => handleDeliveryPress(delivery)}
                  >
                {/* Faixa lateral colorida baseada no status */}
                <View style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 12,
                  backgroundColor: getStatusBorderColor(delivery.status),
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }} />
                
                {/* Conteúdo do card */}
                <View style={{ flex: 1, paddingLeft: 20 }}>
                  <View style={styles.deliveryHeader}>
                    <Text style={[styles.deliveryTitle, { color: themeColors.text }]}>
                      {delivery.restaurant}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>
                        {statusInfo.text}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.deliveryCustomer, { color: themeColors.textSecondary }]}>
                    Cliente: {delivery.customer}
                  </Text>
                  <Text style={[styles.deliveryAddress, { color: themeColors.textSecondary }]}>
                    📍 {delivery.address}
                  </Text>
                  <View style={styles.deliveryFooter}>
                    <Text style={[styles.deliveryValue, { color: themeColors.primary }]}>
                      {delivery.value}
                    </Text>
                    <Text style={[styles.deliveryTime, { color: themeColors.textSecondary }]}>
                      ⏱️ {delivery.time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

// Tela de Ganhos
const EarningsScreen = () => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const earnings = [
    { period: 'Hoje', amount: 'R$ 89,50', deliveries: 12 },
    { period: 'Esta Semana', amount: 'R$ 456,30', deliveries: 58 },
    { period: 'Este Mês', amount: 'R$ 1.234,80', deliveries: 156 },
  ];

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Ganhos
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Acompanhe seus ganhos e pagamentos
          </Text>
        </View>
        
        <ScrollView style={styles.listContainer}>
          {earnings.map((earning, index) => (
            <View 
              key={index}
              style={[styles.earningCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
            >
              <View style={styles.earningHeader}>
                <Text style={[styles.earningPeriod, { color: themeColors.text }]}>
                  {earning.period}
                </Text>
                <Text style={[styles.earningAmount, { color: themeColors.primary }]}>
                  {earning.amount}
                </Text>
              </View>
              <Text style={[styles.earningDeliveries, { color: themeColors.textSecondary }]}>
                {earning.deliveries} entregas
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

// Tela de Perfil
const ProfileScreen = () => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const profileOptions = [
    { 
      title: 'Dados Pessoais', 
      subtitle: 'Nome, telefone, endereço',
      icon: '👤', 
      action: 'personal' 
    },
    { 
      title: 'Veículo', 
      subtitle: 'Informações do seu veículo',
      icon: '🚗', 
      action: 'vehicle' 
    },
    { 
      title: 'Documentos', 
      subtitle: 'CNH, documentos do veículo',
      icon: '📄', 
      action: 'documents' 
    },
    { 
      title: 'Configurações', 
      subtitle: 'Notificações, preferências',
      icon: '⚙️', 
      action: 'settings' 
    },
    { 
      title: 'Ajuda e Suporte', 
      subtitle: 'Central de ajuda, contato',
      icon: '❓', 
      action: 'help' 
    },
    { 
      title: 'Sair', 
      subtitle: 'Fazer logout da conta',
      icon: '🚪', 
      action: 'logout' 
    },
  ];

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Perfil
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Gerencie sua conta e configurações
          </Text>
        </View>
        
        <ScrollView style={styles.listContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.profileOption, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => Alert.alert('Ação', `Abrir ${option.title}`)}
            >
              <View style={styles.profileOptionContent}>
                <Text style={styles.profileIcon}>{option.icon}</Text>
                <View style={styles.profileTextContainer}>
                  <Text style={[styles.profileTitle, { color: themeColors.text }]}>
                    {option.title}
                  </Text>
                  <Text style={[styles.profileSubtitle, { color: themeColors.textSecondary }]}>
                    {option.subtitle}
                  </Text>
                </View>
              </View>
              <Text style={[styles.profileArrow, { color: themeColors.textSecondary }]}>
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

// Componente principal com navegação customizada
const HomeScreen = () => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [currentRoute, setCurrentRoute] = useState('home');

  const renderCurrentScreen = () => {
    switch (currentRoute) {
      case 'home':
        return <DriverHomeScreen navigation={{ navigate: setCurrentRoute }} />;
      case 'deliveries':
        return <DeliveriesScreen navigation={{ navigate: setCurrentRoute }} />;
      case 'earnings':
        return <EarningsScreen navigation={{ navigate: setCurrentRoute }} />;
      case 'profile':
        return <ProfileScreen navigation={{ navigate: setCurrentRoute }} />;
      default:
        return <DriverHomeScreen navigation={{ navigate: setCurrentRoute }} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
      <CustomDock 
        navigation={{ navigate: setCurrentRoute }} 
        currentRoute={currentRoute}
      />
    </View>
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
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  statusSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statusButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  actionsSection: {
    padding: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentSection: {
    padding: 20,
  },
  recentCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  recentSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  recentValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchInput: {
    backgroundColor: '#333333',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    minHeight: 36,
  },
  filtersCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  filtersTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    minHeight: 28,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FF7300',
  },
  filterButtonInactive: {
    backgroundColor: 'transparent',
  },
  filterButtonText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  deliveryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  deliveryCustomer: {
    fontSize: 14,
    marginBottom: 4,
  },
  deliveryAddress: {
    fontSize: 14,
    marginBottom: 8,
  },
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 14,
  },
  earningCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  earningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningPeriod: {
    fontSize: 16,
    fontWeight: '600',
  },
  earningAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  earningDeliveries: {
    fontSize: 14,
  },
  profileOption: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  profileArrow: {
    fontSize: 20,
    fontWeight: 'bold',
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
