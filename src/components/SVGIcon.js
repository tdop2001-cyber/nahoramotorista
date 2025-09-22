import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';

const SVGIcon = ({ name, size = 24, color = '#FF7300', focused = false }) => {
  const iconColor = focused ? color : '#666666';

  const renderIcon = () => {
    switch (name) {
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
