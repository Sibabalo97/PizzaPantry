import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Save, PlusCircle, MinusCircle } from 'lucide-react-native';
import tw from 'twrnc';
import { Item } from '../../types/Item';
import { User } from '../../types/User';

interface AdjustQuantityScreenProps {
  item: Item;
  user: User;
  onBack: () => void;
  onSave: (type: 'add' | 'remove', amount: number, reason: string) => void;
}

const AdjustQuantityScreen: React.FC<AdjustQuantityScreenProps> = ({ 
  item, user, onBack, onSave 
}) => {
  const [type, setType] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (type === 'remove' && amt > item.quantity) {
      newErrors.amount = 'Cannot remove more than available quantity';
    }

    if (!reason.trim() || reason.length < 5) {
      newErrors.reason = 'Reason must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      onSave(type, parseFloat(amount), reason);
      setLoading(false);
    }, 800);
  };

  const newQuantity = type === 'add' 
    ? item.quantity + (parseFloat(amount) || 0)
    : item.quantity - (parseFloat(amount) || 0);

  return (
    <View style={tw`h-full bg-gray-50 flex flex-col max-w-md mx-auto`}>
      <View style={tw`bg-white border-b shadow-lg p-4 flex items-center justify-start`}>
        <TouchableOpacity
          onPress={onBack}
          style={tw`p-2 -ml-2`}
        >
          <ArrowLeft size={24} color="#DC2626" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold flex-1 text-center pr-10`}>Adjust Stock</Text>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-1`}>{item.name}</Text>
          <Text style={tw`text-sm text-gray-500 mb-4`}>Current Stock</Text>
          <View style={tw`flex items-end gap-2 mb-2`}>
            <Text style={tw`text-4xl font-extrabold text-gray-900`}>{item.quantity}</Text>
            <Text style={tw`text-xl text-gray-500 font-medium pb-1`}>{item.unit}</Text>
          </View>
          <Text style={tw`text-xs text-gray-400`}>Reorder Point: {item.reorderPoint} {item.unit}</Text>
        </View>

        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4 gap-6`}>
          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-3`}>Adjustment Type</Text>
            <View style={tw`flex gap-3`}>
              <TouchableOpacity
                onPress={() => setType('add')}
                style={tw`flex-1 py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 ${
                  type === 'add' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <PlusCircle size={20} color={type === 'add' ? 'white' : '#374151'} />
                <Text style={tw`font-bold ${type === 'add' ? 'text-white' : 'text-gray-700'}`}>
                  Add Stock
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType('remove')}
                style={tw`flex-1 py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 ${
                  type === 'remove' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MinusCircle size={20} color={type === 'remove' ? 'white' : '#374151'} />
                <Text style={tw`font-bold ${type === 'remove' ? 'text-white' : 'text-gray-700'}`}>
                  Remove Stock
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>
              Amount ({item.unit})
            </Text>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none`}
              value={amount}
              onChangeText={(value) => {
                setAmount(value);
                setErrors(prev => ({ ...prev, amount: '' }));
              }}
              keyboardType="numeric"
              placeholder="Enter amount"
            />
            {errors.amount ? <Text style={tw`text-red-500 text-sm mt-1`}>{errors.amount}</Text> : null}
            
            {amount && !isNaN(parseFloat(amount)) && (
              <View style={tw`mt-3 p-3 bg-gray-50 rounded-lg`}>
                <Text style={tw`text-sm text-gray-600`}>New quantity will be:</Text>
                <Text style={tw`text-2xl font-bold ${
                  newQuantity <= item.reorderPoint ? 'text-red-600' : 'text-green-600'
                }`}>
                  {newQuantity} {item.unit}
                </Text>
              </View>
            )}
          </View>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>Reason for Adjustment</Text>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none`}
              value={reason}
              onChangeText={(value) => {
                setReason(value);
                setErrors(prev => ({ ...prev, reason: '' }));
              }}
              multiline
              numberOfLines={3}
              placeholder={type === 'add' 
                ? 'e.g., New delivery received from supplier' 
                : 'e.g., Used in large catering order'
              }
            />
            {errors.reason ? <Text style={tw`text-red-500 text-sm mt-1`}>{errors.reason}</Text> : null}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={tw`w-full text-white py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 ${
            loading ? 'bg-gray-400' : 
            type === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? (
            <View style={tw`animate-spin rounded-full h-5 w-5 border-b-2 border-white`}></View>
          ) : (
            <>
              <Save size={20} color="white" />
              <Text style={tw`text-white font-bold text-lg`}>
                Confirm {type === 'add' ? 'Addition' : 'Removal'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AdjustQuantityScreen;