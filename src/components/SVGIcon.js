import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';

const SVGIcon = ({ name, size = 24, color = '#FF7300', focused = false }) => {
  const iconColor = focused ? color : '#666666';

  const renderIcon = () => {
    switch (name) {
      // Ícones de navegação principal
      case 'home':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d="M3 10.5 L12 4 L21 10.5 V20 A1 1 0 0 1 20 21 H4 A1 1 0 0 1 3 20 Z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <Rect
              x="10"
              y="13"
              width="4"
              height="6"
              rx="0.6"
              fill={iconColor}
            />
          </Svg>
        );
      
      case 'deliveries':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d="M3 7.5 L12 3 L21 7.5 V16.5 L12 21 L3 16.5 Z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <Path
              d="M3 7.5 L12 12 L21 7.5"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Svg>
        );
      
      case 'earnings':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Line
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <Path
              d="M15 8c0-2-1.5-3.5-3.5-3.5s-3.5 1.2-3.5 2.8c0 2.5 3 3 5 3.5 2 .5 3.5 1.2 3.5 3s-1.8 3.2-4 3.2-4-1.2-4-3"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'profile':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle
              cx="12"
              cy="8"
              r="4"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
            />
            <Path
              d="M4 20c0-4 4-6 8-6s8 2 8 6"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </Svg>
        );

      // Novos ícones baseados nos SVGs adicionados
      case 'aceito':
      case 'accepted':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M7 12.5 L10 15.5 L17 8.5"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'ajuda':
      case 'help':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
            />
            <Circle
              cx="12"
              cy="17"
              r="1.2"
              fill={iconColor}
            />
            <Path
              d="M12 7 C13.2 7 14 7.8 14 9 C14 10 12 10.5 12 12"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'clock':
      case 'tempo':
      case 'time':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle
              cx="12"
              cy="12"
              r="8.2"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line x1="12" y1="3.5" x2="12" y2="5.2" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="12" y1="18.8" x2="12" y2="20.5" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="3.5" y1="12" x2="5.2" y2="12" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="18.8" y1="12" x2="20.5" y2="12" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="12" y1="12" x2="12" y2="8.2" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
            <Line x1="12" y1="12" x2="15.3" y2="12" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
          </Svg>
        );

      case 'estrela':
      case 'star':
      case 'rating':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d="M12 2.5 L14.8 9 H22 L16.6 13.5 L18.8 20.5 L12 16.5 L5.2 20.5 L7.4 13.5 L2 9 H9.2 L12 2.5 Z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Svg>
        );

      case 'documentos':
      case 'documents':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect
              x="6"
              y="3"
              width="12"
              height="18"
              rx="2"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
            />
            <Line x1="8" y1="7" x2="16" y2="7" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="8" y1="11" x2="16" y2="11" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="8" y1="15" x2="14" y2="15" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
          </Svg>
        );

      case 'settings':
      case 'configuracoes':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d="M19.4 13.5c.04-.5.1-1 .1-1.5s-.06-1-.1-1.5l2-1.5a.5.5 0 0 0 .1-.7l-1.9-3.3a.5.5 0 0 0-.6-.2l-2.3 1a6.5 6.5 0 0 0-2.6-1.5l-.3-2.4a.5.5 0 0 0-.5-.4h-3.8a.5.5 0 0 0-.5.4l-.3 2.4a6.5 6.5 0 0 0-2.6 1.5l-2.3-1a.5.5 0 0 0-.6.2L2.4 8.3a.5.5 0 0 0 .1.7l2 1.5c-.04.5-.1 1-.1 1.5s.06 1 .1 1.5l-2 1.5a.5.5 0 0 0-.1.7l1.9 3.3c.14.2.4.3.6.2l2.3-1a6.5 6.5 0 0 0 2.6 1.5l.3 2.4c.03.2.24.4.5.4h3.8c.26 0 .47-.2.5-.4l.3-2.4a6.5 6.5 0 0 0 2.6-1.5l2.3 1c.2.1.5 0 .6-.2l1.9-3.3a.5.5 0 0 0-.1-.7l-2-1.5zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'sair':
      case 'logout':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect
              x="4"
              y="3"
              width="12"
              height="18"
              rx="1.5"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <Circle
              cx="14"
              cy="12"
              r="0.8"
              fill={iconColor}
            />
            <Path
              d="M20 12 L16 8 M20 12 L16 16 M16 12 H10"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'box':
      case 'caixa':
      case 'delivery':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d="M3 7.5 L12 3 L21 7.5 V16.5 L12 21 L3 16.5 Z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <Path
              d="M3 7.5 L12 12 L21 7.5"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Svg>
        );

      case 'cifrao':
      case 'money':
      case 'dinheiro':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Line
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <Path
              d="M15 8c0-2-1.5-3.5-3.5-3.5s-3.5 1.2-3.5 2.8c0 2.5 3 3 5 3.5 2 .5 3.5 1.2 3.5 3s-1.8 3.2-4 3.2-4-1.2-4-3"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'coletado':
      case 'picked':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M7 12.5 L10 15.5 L17 8.5"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'concluido':
      case 'completed':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M7 12.5 L10 15.5 L17 8.5"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'moto':
      case 'motorcycle':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d="M5 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M19 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M5 16h14"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <Path
              d="M12 4v8l4-2"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="12"
              cy="6"
              r="1"
              fill={iconColor}
            />
          </Svg>
        );

      case 'navegacao':
      case 'navigation':
      case 'location':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <Circle
              cx="12"
              cy="10"
              r="3"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
            />
          </Svg>
        );

      case 'relatorios':
      case 'reports':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect
              x="6"
              y="3"
              width="12"
              height="18"
              rx="2"
              fill="none"
              stroke={iconColor}
              strokeWidth="1.6"
            />
            <Line x1="8" y1="7" x2="16" y2="7" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="8" y1="11" x2="16" y2="11" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
            <Line x1="8" y1="15" x2="14" y2="15" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
          </Svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {renderIcon()}
    </View>
  );
};

export default SVGIcon;
