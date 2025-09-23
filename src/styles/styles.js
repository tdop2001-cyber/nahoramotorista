import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  
  // Cores principais
  colors: {
    primary: '#FF7300',
    secondary: '#1a1a1a',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#999999',
    border: '#333333',
    success: '#1ecb4f',
    warning: '#FFD700',
    error: '#FF4500',
  },

  // Headers
  header: {
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginTop: 10,
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#999999',
  },

  // Cards
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  
  cardSubtitle: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },

  // Botões
  button: {
    backgroundColor: '#FF7300',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF7300',
  },
  
  buttonSecondaryText: {
    color: '#FF7300',
  },

  // Estatísticas
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 16,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  
  statCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7300',
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 12,
    color: '#999999',
  },

  // Listas
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  listItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  
  listItemSubtitle: {
    fontSize: 14,
    color: '#999999',
  },

  // Status badges específicos para motorista
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
  
  statusAvailable: {
    backgroundColor: 'rgba(30, 203, 79, 0.2)',
  },
  
  statusAvailableText: {
    color: '#1ecb4f',
  },
  
  statusBusy: {
    backgroundColor: 'rgba(255, 69, 0, 0.2)',
  },
  
  statusBusyText: {
    color: '#FF4500',
  },
  
  statusOffline: {
    backgroundColor: 'rgba(153, 153, 153, 0.2)',
  },
  
  statusOfflineText: {
    color: '#999999',
  },
  
  statusPickedUp: {
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
  },
  
  statusPickedUpText: {
    color: '#FF8C00',
  },
  
  statusDelivered: {
    backgroundColor: 'rgba(30, 203, 79, 0.2)',
  },
  
  statusDeliveredText: {
    color: '#1ecb4f',
  },

  // Textos
  text: {
    color: '#ffffff',
  },
  
  textSecondary: {
    color: '#999999',
  },
  
  textPrimary: {
    color: '#FF7300',
  },

  // Espaçamentos
  marginHorizontal: {
    marginHorizontal: 16,
  },
  
  marginVertical: {
    marginVertical: 16,
  },
  
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  
  paddingVertical: {
    paddingVertical: 16,
  },

  // Layout
  row: {
    flexDirection: 'row',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  flex1: {
    flex: 1,
  },

  // Dimensões
  screenWidth: width,
  screenHeight: height,
});



