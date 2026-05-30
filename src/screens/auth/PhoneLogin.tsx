import React, {
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';

import {StatusBar} from 'react-native';

import {AuthContext} from '../../context/AuthContext';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import CustomButton from '../../ui/components/CustomButton';

import CustomInput from '../../ui/components/CustomInput';

import {COLORS} from '../../ui/theme/colors';

import {SPACING} from '../../ui/theme/spacing';

import {TYPOGRAPHY} from '../../ui/theme/typography';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function PhoneLogin({
  navigation,
}: Props) {
  const [phone, setPhone] = useState('');

  const [loading, setLoading] =
    useState(false);

  const {sendOtp} =
    useContext(AuthContext);

  const handleSend = async () => {
    if (
      !phone.startsWith('+91') ||
      phone.length < 13
    ) {
      Alert.alert(
        'Invalid Number',
        'Enter valid Indian phone number',
      );

      return;
    }

    try {
      setLoading(true);

      await sendOtp(phone);

      console.log('OTP SENT SUCCESS');

      navigation.navigate('Otp', {
        phone,
      });
    } catch (error: any) {
      Alert.alert(
        'OTP Error',
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.logo}>
          🚌
        </Text>

        <Text style={styles.title}>
          Bus Tracker
        </Text>

        <Text style={styles.subtitle}>
          Login with your phone number
        </Text>

        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />

        <CustomInput
          value={phone}
          onChangeText={setPhone}
          placeholder="+91XXXXXXXXXX"
        />

        <CustomButton
          title="Send OTP"
          onPress={handleSend}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  content: {
    flex: 1,

    justifyContent: 'center',

    padding:
      SPACING.lg,
  },

  logo: {
    fontSize: 60,

    textAlign: 'center',

    marginBottom:
      SPACING.md,
  },

  title: {
    fontSize:
      TYPOGRAPHY.title,

    fontWeight: 'bold',

    color: COLORS.black,

    textAlign: 'center',

    marginBottom:
      SPACING.sm,
  },

  subtitle: {
    fontSize:
      TYPOGRAPHY.body,

    color: COLORS.gray,

    textAlign: 'center',

    marginBottom:
      SPACING.xl,
  },
});