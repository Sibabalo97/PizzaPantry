import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, BarChart3, ClipboardList, Settings } from 'lucide-react-native';
import tw from 'twrnc';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'inventory', label: 'Inventory', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <View style={tw`bg-white border-t border-gray-200 flex-row justify-around items-center py-3 px-2`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={tw`flex items-center justify-center py-2 px-4 rounded-xl ${
              isActive ? 'bg-red-50' : ''
            }`}
          >
            <Icon
              size={20}
              color={isActive ? '#DC2626' : '#6B7280'}
            />
            <Text
              style={tw`text-xs mt-1 font-medium ${
                isActive ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;