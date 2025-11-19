import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

const PizzaIcon = () => (
  <View style={tw`w-8 h-8`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 0 0-9.8 11.8l7.6 7.6c.4.4 1 .4 1.4 0l7.6-7.6A10 10 0 0 0 12 2z"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  </View>
);

export default PizzaIcon;