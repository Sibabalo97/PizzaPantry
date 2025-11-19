import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { ArrowLeft, Edit2, Trash2, PlusCircle, MinusCircle, AlertCircle, Truck, Zap } from 'lucide-react-native';
import tw from 'twrnc';
import { Item} from '../../types/Item';
import { AdjustmentLog } from '../../types/AdjustmentLog';


interface ItemDetailScreenProps {
  item: Item;
  logs: AdjustmentLog[];
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAdjust: () => void;
}

const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({ 
  item, logs, onBack, onEdit, onDelete, onAdjust 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isLowStock = item.quantity <= item.reorderPoint;

  return (
    <View style={tw`h-full bg-gray-50 flex flex-col max-w-md mx-auto`}>
      {/* Header */}
      <View style={tw`bg-white border-b shadow-lg p-4 flex items-center justify-between`}>
        <TouchableOpacity
          onPress={onBack}
          style={tw`p-2 -ml-2`}
        >
          <ArrowLeft size={24} color="#DC2626" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Item Details</Text>
        <View style={tw`flex gap-1`}>
          <TouchableOpacity
            onPress={onEdit}
            style={tw`p-2`}
          >
            <Edit2 size={20} color="#F59E0B" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            style={tw`p-2`}
          >
            <Trash2 size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4 border-t-8 ${
          isLowStock ? 'border-red-500' : 'border-amber-500'
        }`}>
          <Text style={tw`text-3xl font-extrabold text-gray-900 mb-2`}>{item.name}</Text>
          <View style={tw`px-3 py-1 rounded-full text-xs font-bold capitalize ${
            item.category === 'ingredient' ? 'bg-green-100' :
            item.category === 'packaging' ? 'bg-blue-100' :
            item.category === 'beverage' ? 'bg-indigo-100' :
            'bg-gray-200'
          }`}>
            <Text style={tw`text-xs font-bold ${
              item.category === 'ingredient' ? 'text-green-800' :
              item.category === 'packaging' ? 'text-blue-800' :
              item.category === 'beverage' ? 'text-indigo-800' :
              'text-gray-700'
            }`}>
              {item.category}
            </Text>
          </View>
          
          <View style={tw`flex items-center justify-between mt-6 pt-4 border-t`}>
            <View>
              <Text style={tw`text-5xl font-extrabold`}>{item.quantity}</Text>
              <Text style={tw`text-xl text-gray-500 font-medium`}>{item.unit} in stock</Text>
            </View>
            {isLowStock && (
              <View style={tw`text-red-600 bg-red-100 px-3 py-2 rounded-lg flex-row items-center`}>
                <Zap size={16} color="#DC2626" />
                <Text style={tw`text-red-600 text-sm font-bold ml-1`}>LOW</Text>
              </View>
            )}
          </View>

          <TouchableOpacity 
            onPress={onAdjust}
            style={tw`w-full bg-red-600 text-white py-4 rounded-xl font-bold mt-6 flex items-center justify-center gap-2 hover:bg-red-700 shadow-lg`}
          >
            <PlusCircle size={20} color="white" />
            <MinusCircle size={20} color="white" />
            <Text style={tw`text-white font-bold`}>Adjust Quantity</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Properties</Text>
          <View style={tw`gap-3`}>
            <View style={tw`flex justify-between py-3 border-b`}>
              <View style={tw`flex-row items-center gap-2`}>
                <AlertCircle size={18} color="#F59E0B" />
                <Text style={tw`text-gray-500 font-medium`}>Reorder Point</Text>
              </View>
              <Text style={tw`font-semibold`}>{item.reorderPoint} {item.unit}</Text>
            </View>
            <View style={tw`flex justify-between py-3 border-b`}>
              <View style={tw`flex-row items-center gap-2`}>
                <Truck size={18} color="#3B82F6" />
                <Text style={tw`text-gray-500 font-medium`}>Supplier</Text>
              </View>
              <Text style={tw`font-semibold`}>{item.supplier || 'N/A'}</Text>
            </View>
            <View style={tw`flex justify-between py-3`}>
              <Text style={tw`text-gray-500 font-medium`}>Last Updated</Text>
              <Text style={tw`font-semibold text-sm`}>
                {new Date(item.lastUpdated).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`bg-white rounded-2xl p-6 shadow-xl`}>
          <Text style={tw`text-xl font-bold mb-4`}>Recent Adjustments</Text>
          {logs.length === 0 ? (
            <Text style={tw`text-gray-500 text-center py-4 italic`}>No adjustments yet</Text>
          ) : (
            <View style={tw`gap-3`}>
              {logs.map(log => (
                <View key={log.id} style={tw`p-3 rounded-xl border ${
                  log.type === 'add' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <View style={tw`flex justify-between items-start`}>
                    <View style={tw`flex-1`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        {log.type === 'add' ? <PlusCircle size={16} color="#16A34A" /> : <MinusCircle size={16} color="#DC2626" />}
                        <Text style={tw`font-bold capitalize ${
                          log.type === 'add' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {log.type} {log.amount} {item.unit}
                        </Text>
                      </View>
                      <Text style={tw`text-gray-600 text-sm mt-1`}>{log.reason}</Text>
                      <Text style={tw`text-gray-500 text-xs mt-1`}>By {log.user}</Text>
                    </View>
                    <Text style={tw`text-xs text-gray-400 ml-2`}>
                      {new Date(log.timestamp).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Delete Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 items-center justify-center p-4`}>
          <View style={tw`bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl`}>
            <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>Delete Item?</Text>
            <Text style={tw`text-gray-600 mb-6`}>
              Are you sure you want to delete "{item.name}"? This action cannot be undone.
            </Text>
            <View style={tw`flex gap-3`}>
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                style={tw`flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300`}
              >
                <Text style={tw`text-gray-800 font-semibold text-center`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onDelete();
                  setShowDeleteModal(false);
                }}
                style={tw`flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 shadow-lg`}
              >
                <Text style={tw`text-white font-semibold text-center`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemDetailScreen;