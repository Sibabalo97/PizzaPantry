import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';
import { User } from '../types/User';

interface SettingsScreenProps {
  user: User;
  onSignOut: () => void;
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onSignOut, onBack }) => {
  const [notifications, setNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);

  return (
    <View style={tw`h-full bg-gray-50 flex flex-col max-w-md mx-auto`}>
      {/* Header */}
      <View style={tw`bg-white border-b shadow-lg p-4 flex items-center justify-start`}>
        <TouchableOpacity
          onPress={onBack}
          style={tw`p-2 -ml-2`}
        >
          <ArrowLeft size={24} color="#DC2626" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold flex-1 text-center pr-10`}>Settings</Text>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        {/* User Profile */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4`}>
          <View style={tw`flex-row items-center gap-4 mb-4`}>
            <View style={tw`w-16 h-16 bg-red-600 rounded-full items-center justify-center`}>
              <Text style={tw`text-white text-2xl font-bold`}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-xl font-bold text-gray-900`}>{user.name}</Text>
              <Text style={tw`text-gray-600`}>{user.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl items-center`}>
            <Text style={tw`text-gray-700 font-bold`}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Preferences</Text>
          <View style={tw`gap-4`}>
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-gray-700 font-medium`}>Push Notifications</Text>
              <TouchableOpacity
                onPress={() => setNotifications(!notifications)}
                style={tw`w-12 h-6 rounded-full ${
                  notifications ? 'bg-red-600' : 'bg-gray-300'
                } justify-center`}
              >
                <View style={tw`w-4 h-4 bg-white rounded-full ml-1`} 
                  style={notifications ? tw`ml-7` : tw`ml-1`}
                />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-gray-700 font-medium`}>Low Stock Alerts</Text>
              <TouchableOpacity
                onPress={() => setLowStockAlerts(!lowStockAlerts)}
                style={tw`w-12 h-6 rounded-full ${
                  lowStockAlerts ? 'bg-red-600' : 'bg-gray-300'
                } justify-center`}
              >
                <View style={tw`w-4 h-4 bg-white rounded-full ml-1`} 
                  style={lowStockAlerts ? tw`ml-7` : tw`ml-1`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>App Information</Text>
          <View style={tw`gap-3`}>
            <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
              <Text style={tw`text-gray-600`}>Version</Text>
              <Text style={tw`text-gray-900 font-medium`}>1.0.0</Text>
            </View>
            <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
              <Text style={tw`text-gray-600`}>Build</Text>
              <Text style={tw`text-gray-900 font-medium`}>2024.01.1</Text>
            </View>
            <View style={tw`flex-row justify-between py-2`}>
              <Text style={tw`text-gray-600`}>Last Updated</Text>
              <Text style={tw`text-gray-900 font-medium`}>2 days ago</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={tw`gap-3`}>
          <TouchableOpacity style={tw`bg-amber-500 py-4 rounded-xl items-center`}>
            <Text style={tw`text-white font-bold text-lg`}>Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-red-600 py-4 rounded-xl items-center`}>
            <Text style={tw`text-white font-bold text-lg`}>Clear Cache</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onSignOut}
            style={tw`border border-red-600 py-4 rounded-xl items-center`}
          >
            <Text style={tw`text-red-600 font-bold text-lg`}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;