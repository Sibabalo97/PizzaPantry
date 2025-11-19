import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Search, Plus, LogOut, RefreshCw, X, AlertCircle, Package, ChevronRight, Zap } from 'lucide-react-native';
import tw from 'twrnc';
import { Item } from '../../types/Item';
import {  User } from '../../types/User';
import PizzaIcon from '../../../components/icons/PizzaIcon';

interface InventoryListScreenProps {
  user: User;
  items: Item[];
  onSelectItem: (item: Item) => void;
  onAddItem: () => void;
  onSignOut: () => void;
  onRefresh: () => void;
}

const InventoryListScreen: React.FC<InventoryListScreenProps> = ({ 
  user, items, onSelectItem, onAddItem, onSignOut, onRefresh 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = items.filter(item => item.quantity <= item.reorderPoint).length;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      onRefresh();
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-white border-b shadow-lg p-4 pt-6`}>
        <View style={tw`flex justify-between items-center mb-4`}>
          <View style={tw`flex items-center gap-2`}>
            <View style={tw`p-1 rounded-full bg-red-600`}>
              <PizzaIcon />
            </View>
            <View>
              <Text style={tw`text-2xl font-extrabold text-red-600`}>PieStock</Text>
              <Text style={tw`text-xs text-gray-500`}>Hi, {user.name.split(' ')[0]}!</Text>
            </View>
          </View>
          <View style={tw`flex gap-2`}>
            <TouchableOpacity 
              onPress={handleRefresh}
              style={tw`p-3 bg-gray-100 rounded-full hover:bg-gray-200`}
            >
              <RefreshCw size={18} color="#4B5563" style={refreshing ? tw`animate-spin` : null} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onSignOut}
              style={tw`p-3 bg-gray-100 rounded-full hover:bg-gray-200`}
            >
              <LogOut size={18} color="#DC2626" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onAddItem}
              style={tw`bg-amber-500 text-white rounded-full p-3 hover:bg-amber-600 shadow-lg`}
            >
              <Plus size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={tw`relative mb-4`}>
          <Search size={18} color="#9CA3AF" style={tw`absolute left-4 top-1/2 -translate-y-1/2`} />
          <TextInput
            style={tw`w-full pl-12 pr-10 py-3 bg-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search inventory..."
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={tw`absolute right-3 top-1/2 -translate-y-1/2`}
            >
              <X size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row gap-2 pb-2`}>
          {['all', 'ingredient', 'packaging', 'beverage', 'other'].map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategoryFilter(cat)}
              style={tw`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold ${
                categoryFilter === cat
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Text style={tw`text-sm font-semibold ${
                categoryFilter === cat ? 'text-white' : 'text-gray-700'
              }`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats */}
        <View style={tw`flex gap-2 text-sm mt-4`}>
          <View style={tw`flex-1 bg-blue-50 rounded-lg p-3`}>
            <Text style={tw`text-blue-600 font-bold text-2xl`}>{items.length}</Text>
            <Text style={tw`text-blue-800 font-medium`}>Total Items</Text>
          </View>
          <View style={tw`flex-1 bg-red-50 rounded-lg p-3`}>
            <Text style={tw`text-red-600 font-bold text-2xl`}>{lowStockCount}</Text>
            <Text style={tw`text-red-800 font-medium`}>Low Stock</Text>
          </View>
        </View>
      </View>

      {/* Items List */}
      <ScrollView style={tw`flex-1 p-4`}>
        {lowStockCount > 0 && (
          <View style={tw`mb-4 bg-red-100 border-l-4 border-red-600 p-4 rounded-xl`}>
            <View style={tw`flex items-start gap-2`}>
              <AlertCircle size={20} color="#DC2626" style={tw`flex-shrink-0`} />
              <View>
                <Text style={tw`text-red-900 font-bold`}>Low Stock Alert</Text>
                <Text style={tw`text-red-800 text-sm`}>{lowStockCount} item(s) need reordering</Text>
              </View>
            </View>
          </View>
        )}

        {filteredItems.length === 0 ? (
          <View style={tw`text-center py-20 bg-white rounded-2xl shadow-lg`}>
            <Package size={80} color="#D1D5DB" style={tw`mx-auto mb-4`} />
            <Text style={tw`text-gray-600 text-xl font-semibold mb-4`}>No Items Found</Text>
            <Text style={tw`text-gray-500 mb-6`}>Adjust filters or add a new item</Text>
            <TouchableOpacity
              onPress={onAddItem}
              style={tw`px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700`}
            >
              <View style={tw`flex-row items-center`}>
                <Plus size={18} color="white" />
                <Text style={tw`text-white font-bold ml-2`}>Add Item</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`gap-3`}>
            {filteredItems.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelectItem(item)}
                style={tw`w-full bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl border-l-4 ${
                  item.quantity <= item.reorderPoint ? 'border-red-600' : 'border-amber-500'
                }`}
              >
                <View style={tw`flex justify-between items-start mb-3`}>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>{item.name}</Text>
                    <Text style={tw`text-sm text-gray-500 capitalize`}>{item.category}</Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" style={tw`flex-shrink-0`} />
                </View>
                
                <View style={tw`flex justify-between items-end`}>
                  <View>
                    <Text style={tw`text-3xl font-extrabold text-gray-900`}>{item.quantity}</Text>
                    <Text style={tw`text-gray-500 ml-2 font-medium`}>{item.unit}</Text>
                  </View>
                  {item.quantity <= item.reorderPoint && (
                    <View style={tw`bg-red-100 text-red-800 px-2 py-1 rounded-full flex-row items-center gap-1`}>
                      <Zap size={12} color="#DC2626" />
                      <Text style={tw`text-red-800 text-xs font-bold`}>LOW</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default InventoryListScreen;