import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => (
  <View style={tw`h-full bg-gray-50 flex items-center justify-center`}>
    <View style={tw`text-center bg-white p-8 rounded-2xl shadow-xl`}>
      <View style={tw`animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4`}></View>
      <Text style={tw`text-gray-600 font-medium`}>{message}</Text>
    </View>
  </View>
);

export default LoadingSpinner;