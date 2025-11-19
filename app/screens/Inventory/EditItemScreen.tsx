import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Save } from 'lucide-react-native';
import tw from 'twrnc';
import { Item } from '../../types/Item';

interface AddEditItemScreenProps {
  item?: Item;
  onBack: () => void;
  onSave: (itemData: Omit<Item, 'id' | 'lastUpdated'>) => void;
}

const AddEditItemScreen: React.FC<AddEditItemScreenProps> = ({ item, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || 'ingredient' as Item['category'],
    quantity: item?.quantity.toString() || '0',
    unit: item?.unit || '',
    reorderPoint: item?.reorderPoint.toString() || '0',
    supplier: item?.supplier || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    const qty = parseFloat(formData.quantity);
    if (isNaN(qty) || qty < 0) {
      newErrors.quantity = 'Quantity must be 0 or greater';
    }
    const reorder = parseFloat(formData.reorderPoint);
    if (isNaN(reorder) || reorder < 0) {
      newErrors.reorderPoint = 'Reorder point must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      onSave({
        name: formData.name,
        category: formData.category,
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        reorderPoint: parseFloat(formData.reorderPoint),
        supplier: formData.supplier || undefined,
      });
      setLoading(false);
    }, 800);
  };

  return (
    <View style={tw`h-full bg-gray-50 flex flex-col max-w-md mx-auto`}>
      <View style={tw`bg-white border-b shadow-lg p-4 flex items-center justify-start`}>
        <TouchableOpacity
          onPress={onBack}
          style={tw`p-2 -ml-2`}
        >
          <ArrowLeft size={24} color="#DC2626" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold flex-1 text-center pr-10`}>
          {item ? 'Edit Item' : 'Add New Item'}
        </Text>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-xl mb-4 gap-4`}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>Item Details</Text>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>Item Name</Text>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none`}
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              placeholder="e.g., Mozzarella Cheese"
            />
            {errors.name ? <Text style={tw`text-red-500 text-sm mt-1`}>{errors.name}</Text> : null}
          </View>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>Category</Text>
            <View style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl bg-white`}>
              <Text style={tw`text-gray-900`}>{formData.category}</Text>
            </View>
          </View>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>
              {item ? 'Current Quantity' : 'Initial Quantity'}
            </Text>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none`}
              value={formData.quantity}
              onChangeText={(value) => handleChange('quantity', value)}
              keyboardType="numeric"
              placeholder="0"
            />
            {errors.quantity ? <Text style={tw`text-red-500 text-sm mt-1`}>{errors.quantity}</Text> : null}
          </View>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>Unit of Measure</Text>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none`}
              value={formData.unit}
              onChangeText={(value) => handleChange('unit', value)}
              placeholder="e.g., lbs, units, gallons"
            />
            {errors.unit ? <Text style={tw`text-red-500 text-sm mt-1`}>{errors.unit}</Text> : null}
          </View>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>Reorder Point</Text>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none`}
              value={formData.reorderPoint}
              onChangeText={(value) => handleChange('reorderPoint', value)}
              keyboardType="numeric"
              placeholder="0"
            />
            {errors.reorderPoint ? <Text style={tw`text-red-500 text-sm mt-1`}>{errors.reorderPoint}</Text> : null}
          </View>

          <View>
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>Supplier (Optional)</Text>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none`}
              value={formData.supplier}
              onChangeText={(value) => handleChange('supplier', value)}
              placeholder="e.g., Dairy Fresh Co."
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={tw`w-full bg-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2`}
        >
          {loading ? (
            <View style={tw`animate-spin rounded-full h-5 w-5 border-b-2 border-white`}></View>
          ) : (
            <>
              <Save size={20} color="white" />
              <Text style={tw`text-white font-bold text-lg`}>
                {item ? 'Save Changes' : 'Create Item'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddEditItemScreen;