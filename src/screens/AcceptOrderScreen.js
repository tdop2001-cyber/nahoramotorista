import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import SVGIcon from '../components/SVGIcon';

const AcceptOrderScreen = ({ navigation, route }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 segundos para aceitar
  const [pulseAnim] = useState(new Animated.Value(1));

  // Pedido recebido (pode vir de route.params ou ser mock)
  const order = route?.params?.order || {
    id: 1234,
    restaurant: 'Pizzaria Bella Vista',
    restaurantPhone: '(11) 3333-4444',
    restaurantAddress: 'Av. Paulista, 1000 - Bela Vista',
    customer: 'Maria Silva',
    customerPhone: '(11) 99999-9999',
    pickupAddress: 'Av. Paulista, 1000 - Bela Vista',
    deliveryAddress: 'Rua das Flores, 123 - Jardim Primavera',
    distance: '3.5 km',
    estimatedTime: '15-20 min',
    deliveryFee: 'R$ 8,50',
    subtotal: 'R$ 45,90',
    total: 'R$ 54,40',
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 'R$ 25,90', emoji: '🍕' },
      { name: 'Pizza Calabresa', quantity: 1, price: 'R$ 28,90', emoji: '🍕' },
      { name: 'Refrigerante Coca-Cola 2L', quantity: 1, price: 'R$ 8,50', emoji: '🥤' },
    ],
    notes: 'Entregar no portão da frente. Cliente prefere não tocar a campainha.',
    paymentMethod: 'Cartão de Crédito',
    orderType: 'Entrega Expressa',
  };

  // Animação de pulso
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  // Timer de contagem regressiva
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleAutoReject();
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleAutoReject = () => {
    Alert.alert(
      '⏰ Tempo Esgotado',
      'O pedido foi automaticamente recusado por falta de resposta.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleAccept = () => {
    Alert.alert(
      '✅ Pedido Aceito!',
      `Você aceitou o pedido #${order.id}.\n\nDirija-se ao restaurante para coletar o pedido.`,
      [
        {
          text: 'Ver Detalhes',
          onPress: () => {
            navigation.replace('DeliveryDetail', {
              delivery: {
                ...order,
                status: 'picked_up',
                history: [
                  { status: 'pending', time: 'Agora', description: 'Pedido recebido' },
                  { status: 'available', time: 'Agora', description: 'Motorista a caminho' },
                ]
              }
            });
          },
        },
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      '❌ Recusar Pedido',
      'Tem certeza que deseja recusar este pedido? Você poderá receber penalizações por recusas excessivas.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Recusar',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Pedido Recusado',
              'O pedido foi recusado e será oferecido a outro motorista.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const getTimerColor = () => {
    if (timeRemaining > 20) return themeColors.success;
    if (timeRemaining > 10) return '#FFD700';
    return themeColors.error;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        {/* Header com Timer */}
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.headerTitle, { color: themeColors.text }]}>
                🔔 Novo Pedido!
              </Text>
              <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
                Pedido #{order.id}
              </Text>
            </View>
            <Animated.View
              style={[
                styles.timerContainer,
                {
                  backgroundColor: getTimerColor(),
                  transform: [{ scale: pulseAnim }],
                }
              ]}
            >
              <Text style={styles.timerText}>
                {formatTime(timeRemaining)}
              </Text>
            </Animated.View>
          </View>
          <View style={[styles.warningBanner, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
            <Text style={[styles.warningText, { color: '#FFD700' }]}>
              ⚠️ Aceite em até {formatTime(timeRemaining)} ou o pedido será recusado automaticamente
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Resumo da Entrega */}
          <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>
              📦 Resumo da Entrega
            </Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <SVGIcon name="box" size={20} color={themeColors.primary} />
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>
                    Distância
                  </Text>
                  <Text style={[styles.infoValue, { color: themeColors.text }]}>
                    {order.distance}
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <SVGIcon name="clock" size={20} color={themeColors.primary} />
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>
                    Tempo Estimado
                  </Text>
                  <Text style={[styles.infoValue, { color: themeColors.text }]}>
                    {order.estimatedTime}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <SVGIcon name="cifrao" size={20} color={themeColors.primary} />
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>
                    Ganho da Entrega
                  </Text>
                  <Text style={[styles.infoValue, { color: themeColors.success, fontSize: 18, fontWeight: 'bold' }]}>
                    {order.deliveryFee}
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <SVGIcon name="box" size={20} color={themeColors.primary} />
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>
                    Tipo de Entrega
                  </Text>
                  <Text style={[styles.infoValue, { color: themeColors.text }]}>
                    {order.orderType}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Informações do Restaurante */}
          <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>
              🍽️ Restaurante (Retirada)
            </Text>

            <View style={styles.locationInfo}>
              <Text style={[styles.locationName, { color: themeColors.text }]}>
                {order.restaurant}
              </Text>
              <Text style={[styles.locationAddress, { color: themeColors.textSecondary }]}>
                📍 {order.pickupAddress}
              </Text>
              <Text style={[styles.locationPhone, { color: themeColors.primary }]}>
                📞 {order.restaurantPhone}
              </Text>
            </View>
          </View>

          {/* Informações do Cliente */}
          <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>
              👤 Cliente (Entrega)
            </Text>

            <View style={styles.locationInfo}>
              <Text style={[styles.locationName, { color: themeColors.text }]}>
                {order.customer}
              </Text>
              <Text style={[styles.locationAddress, { color: themeColors.textSecondary }]}>
                📍 {order.deliveryAddress}
              </Text>
              <Text style={[styles.locationPhone, { color: themeColors.primary }]}>
                📞 {order.customerPhone}
              </Text>
            </View>

            {order.notes && (
              <View style={[styles.notesContainer, { backgroundColor: 'rgba(255, 215, 0, 0.1)', borderColor: 'rgba(255, 215, 0, 0.3)' }]}>
                <Text style={[styles.notesLabel, { color: '#FFD700' }]}>
                  📝 Observações:
                </Text>
                <Text style={[styles.notesText, { color: themeColors.text }]}>
                  {order.notes}
                </Text>
              </View>
            )}
          </View>

          {/* Itens do Pedido */}
          <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>
              🛒 Itens do Pedido ({order.items.length})
            </Text>

            {order.items.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.itemRow,
                  { borderBottomColor: themeColors.border },
                  index === order.items.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <Text style={styles.itemEmoji}>{item.emoji}</Text>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: themeColors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemQuantity, { color: themeColors.textSecondary }]}>
                    Qtd: {item.quantity}
                  </Text>
                </View>
                <Text style={[styles.itemPrice, { color: themeColors.text }]}>
                  {item.price}
                </Text>
              </View>
            ))}

            <View style={[styles.totalContainer, { borderTopColor: themeColors.border }]}>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: themeColors.textSecondary }]}>
                  Subtotal:
                </Text>
                <Text style={[styles.totalValue, { color: themeColors.text }]}>
                  {order.subtotal}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: themeColors.textSecondary }]}>
                  Taxa de Entrega:
                </Text>
                <Text style={[styles.totalValue, { color: themeColors.text }]}>
                  {order.deliveryFee}
                </Text>
              </View>
              <View style={[styles.totalRow, styles.totalFinal, { borderTopColor: themeColors.border }]}>
                <Text style={[styles.totalLabelFinal, { color: themeColors.text }]}>
                  Total:
                </Text>
                <Text style={[styles.totalValueFinal, { color: themeColors.primary }]}>
                  {order.total}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.paymentMethod, { color: themeColors.textSecondary }]}>
                  💳 Forma de Pagamento: {order.paymentMethod}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Botões de Ação Fixos */}
        <View style={[styles.actionButtons, { backgroundColor: themeColors.background, borderTopColor: themeColors.border }]}>
          <TouchableOpacity
            style={[styles.rejectButton, { backgroundColor: themeColors.error, borderColor: themeColors.error }]}
            onPress={handleReject}
          >
            <Text style={styles.buttonText}>❌ Recusar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.acceptButton, { backgroundColor: themeColors.success, borderColor: themeColors.success }]}
            onPress={handleAccept}
          >
            <Text style={styles.buttonText}>✅ Aceitar</Text>
          </TouchableOpacity>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  timerContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  timerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  warningBanner: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  warningText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  infoTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationInfo: {
    marginBottom: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationAddress: {
    fontSize: 14,
    marginBottom: 6,
  },
  locationPhone: {
    fontSize: 14,
    fontWeight: '600',
  },
  notesContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalFinal: {
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
  },
  totalLabelFinal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValueFinal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethod: {
    fontSize: 12,
    marginTop: 8,
    fontStyle: 'italic',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AcceptOrderScreen;
