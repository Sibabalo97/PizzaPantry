import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import tw from 'twrnc';
import PizzaIcon from '../../../components/icons/PizzaIcon';

interface SignUpScreenProps {
  onSignUp: (email: string, password: string, name: string) => void;
  onNavigateToSignIn: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onNavigateToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSignUp(email, password, name);
    }, 800);
  };

  return (
    <ScrollView style={tw`h-full bg-gradient-to-br from-amber-100 via-amber-400 to-red-500`}>
      <View style={tw`flex items-center justify-center p-4 min-h-full`}>
        <View style={tw`bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm my-8`}>
          <View style={tw`text-center mb-8`}>
            <View style={tw`mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4`}>
              <PizzaIcon />
            </View>
            <Text style={tw`text-3xl font-extrabold text-gray-900`}>Create Account</Text>
            <Text style={tw`text-gray-500 mt-2`}>Join PieStock today</Text>
          </View>

          <View style={tw`space-y-4`}>
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
            />
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
              value={password}
              onChangeText={setPassword}
              placeholder="Password (min 6 chars)"
              secureTextEntry
            />
            <TextInput
              style={tw`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none`}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
            />

            {error ? (
              <View style={tw`bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg`}>
                <Text style={tw`text-red-700 text-sm`}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              style={tw`w-full bg-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2`}
            >
              {loading ? (
                <View style={tw`animate-spin rounded-full h-5 w-5 border-b-2 border-white`}></View>
              ) : (
                <>
                  <UserPlus size={20} color="white" />
                  <Text style={tw`text-white font-bold text-lg`}>Sign Up</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={onNavigateToSignIn}
            style={tw`w-full text-center text-sm text-gray-600 mt-6`}
          >
            <Text style={tw`text-center text-sm text-gray-600`}>
              Already have an account? <Text style={tw`font-bold`}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;