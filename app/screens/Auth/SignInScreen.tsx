import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { CheckCircle, UserPlus } from 'lucide-react-native';
import tw from 'twrnc';
import PizzaIcon from '../../../components/icons/PizzaIcon';

interface SignInScreenProps {
  onSignIn: (email: string, password: string) => void;
  onNavigateToSignUp: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('manager@pizzashop.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError('');
    setLoading(true);

    setTimeout(() => {
      // This would normally be an API call
      if (email && password) {
        onSignIn(email, password);
      } else {
        setError('Please enter both email and password');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <View style={tw`h-full bg-gradient-to-br from-amber-100 via-amber-400 to-red-500 flex items-center justify-center p-4`}>
      <View style={tw`bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm`}>
        <View style={tw`text-center mb-8`}>
          <View style={tw`mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4`}>
            <PizzaIcon />
          </View>
          <Text style={tw`text-3xl font-extrabold text-gray-900`}>Welcome Back</Text>
          <Text style={tw`text-gray-500 mt-2`}>Manage your pie ingredients</Text>
        </View>

        <View style={tw`space-y-4`}>
          <View>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
          </View>

          {error ? (
            <View style={tw`bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg`}>
              <Text style={tw`text-red-700 text-sm`}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={tw`w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2`}
          >
            {loading ? (
              <View style={tw`animate-spin rounded-full h-5 w-5 border-b-2 border-white`}></View>
            ) : (
              <>
                <CheckCircle size={20} color="white" />
                <Text style={tw`text-white font-bold text-lg`}>Sign In</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={tw`mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200`}>
          <Text style={tw`text-amber-800 text-sm text-center`}>
            Explore inventory, analytics, orders & settings after login
          </Text>
        </View>

        <TouchableOpacity
          onPress={onNavigateToSignUp}
          style={tw`w-full text-center text-sm text-gray-600 mt-6`}
        >
          <Text style={tw`text-center text-sm text-gray-600`}>
            Don't have an account? <Text style={tw`font-bold`}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;