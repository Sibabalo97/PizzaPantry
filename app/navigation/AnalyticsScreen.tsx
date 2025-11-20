import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';
import {  AdjustmentLog } from '../types/AdjustmentLog';
import { Item} from '../types/Item';

interface AnalyticsScreenProps {
  items: Item[];
  logs: AdjustmentLog[];
  onBack: () => void;
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ items, logs, onBack }) => {
  const lowStockCount = items.filter(item => item.quantity <= item.reorderPoint).length;
  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const categoryStats = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
        <Text style={tw`text-lg font-bold flex-1 text-center pr-10`}>Analytics</Text>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        {/* Overview Cards */}
        <View style={tw`flex-row gap-3 mb-6`}>
          <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-lg`}>
            <Text style={tw`text-2xl font-bold text-blue-600`}>{totalItems}</Text>
            <Text style={tw`text-blue-800 font-medium text-sm`}>Total Items</Text>
          </View>
          <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-lg`}>
            <Text style={tw`text-2xl font-bold text-red-600`}>{lowStockCount}</Text>
            <Text style={tw`text-red-800 font-medium text-sm`}>Low Stock</Text>
          </View>
          <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-lg`}>
            <Text style={tw`text-2xl font-bold text-green-600`}>{totalValue}</Text>
            <Text style={tw`text-green-800 font-medium text-sm`}>Total Units</Text>
          </View>
        </View>

        {/* Category Distribution */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Category Distribution</Text>
          <View style={tw`gap-3`}>
            {Object.entries(categoryStats).map(([category, count]) => (
              <View key={category} style={tw`flex-row justify-between items-center py-2`}>
                <Text style={tw`text-gray-700 font-medium capitalize`}>{category}</Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <View style={tw`w-24 bg-gray-200 rounded-full h-2`}>
                    <View 
                      style={[
                        tw`bg-red-500 rounded-full h-2`,
                        { width: `${(count / totalItems) * 100}%` }
                      ]}
                    />
                  </View>
                  <Text style={tw`text-gray-600 text-sm font-bold`}>{count}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Low Stock Items */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Low Stock Alerts</Text>
          {lowStockCount === 0 ? (
            <Text style={tw`text-green-600 text-center py-4 font-medium`}>
              All items are well stocked! 🎉
            </Text>
          ) : (
            <View style={tw`gap-3`}>
              {items
                .filter(item => item.quantity <= item.reorderPoint)
                .map(item => (
                  <View key={item.id} style={tw`bg-red-50 border border-red-200 rounded-xl p-3`}>
                    <Text style={tw`font-bold text-red-800`}>{item.name}</Text>
                    <Text style={tw`text-red-700 text-sm`}>
                      {item.quantity} {item.unit} left (Reorder at {item.reorderPoint})
                    </Text>
                  </View>
                ))
              }
            </View>
          )}
        </View>

        {/* Recent Activity */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl`}>
          <Text style={tw`text-xl font-bold mb-4`}>Recent Activity</Text>
          <View style={tw`gap-3`}>
            {logs.slice(0, 5).map(log => {
              const item = items.find(i => i.id === log.itemId);
              return (
                <View key={log.id} style={tw`flex-row items-center gap-3 py-2`}>
                  <View style={tw`w-2 h-2 rounded-full ${
                    log.type === 'add' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <Text style={tw`flex-1 text-gray-700 text-sm`}>
                    <Text style={tw`font-bold`}>{log.user}</Text> {log.type === 'add' ? 'added' : 'removed'} {log.amount} {item?.unit} of {item?.name}
                  </Text>
                  <Text style={tw`text-gray-400 text-xs`}>
                    {new Date(log.timestamp).toLocaleDateString()}
                  </Text>
                </View>
              );
            })}
            {logs.length === 0 && (
              <Text style={tw`text-gray-500 text-center py-4 italic`}>
                No recent activity
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AnalyticsScreen;