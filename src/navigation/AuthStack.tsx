import React from 'react';

import {createNativeStackNavigator}
from '@react-navigation/native-stack';

import PhoneLogin
from '../screens/auth/PhoneLogin';

import OtpScreen
from '../screens/auth/OtpScreen';

import RoleSelect
from '../screens/auth/RoleSelect';

const Stack =
  createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="PhoneLogin"
        component={PhoneLogin}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{title: 'Verify OTP'}}
      />

      <Stack.Screen
        name="RoleSelect"
        component={RoleSelect}
        options={{title: 'Select Role'}}
      />

    </Stack.Navigator>
  );
}