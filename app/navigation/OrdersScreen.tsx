import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Plus, Truck } from 'lucide-react-native';
import tw from 'twrnc';
import { Order } from '../types/Orders';
import { mockOrders } from '../data/mockOrders';

interface OrdersScreenProps {
  onBack: () => void;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ onBack }) => {
  const [orders] = useState<Order[]>(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        <Text style={tw`text-lg font-bold flex-1 text-center pr-10`}>Orders</Text>
        <TouchableOpacity style={tw`p-2`}>
          <Plus size={20} color="#DC2626" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`gap-4`}>
          {orders.map(order => (
            <View key={order.id} style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
              <View style={tw`flex-row justify-between items-start mb-3`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-gray-900`}>Order #{order.id}</Text>
                  <Text style={tw`text-gray-600 text-sm`}>{order.supplier}</Text>
                </View>
                <View style={tw`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  <Text style={tw`text-xs font-bold capitalize`}>{order.status}</Text>
                </View>
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 text-sm font-medium mb-2`}>Items:</Text>
                {order.items.map((item, index) => (
                  <Text key={index} style={tw`text-gray-600 text-sm`}>• {item}</Text>
                ))}
              </View>
              
              <View style={tw`flex-row justify-between items-center pt-3 border-t border-gray-100`}>
                <Text style={tw`text-gray-500 text-xs`}>
                  Ordered: {new Date(order.date).toLocaleDateString()}
                </Text>
                <TouchableOpacity style={tw`bg-red-600 px-4 py-2 rounded-lg`}>
                  <Text style={tw`text-white text-sm font-bold`}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg mt-4`}>
          <Text style={tw`text-lg font-bold mb-4`}>Quick Actions</Text>
          <View style={tw`flex-row gap-3`}>
            <TouchableOpacity style={tw`flex-1 bg-red-600 py-3 rounded-xl items-center`}>
              <Plus size={20} color="white" />
              <Text style={tw`text-white font-bold mt-1 text-sm`}>New Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-1 bg-amber-500 py-3 rounded-xl items-center`}>
              <Truck size={20} color="white" />
              <Text style={tw`text-white font-bold mt-1 text-sm`}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;