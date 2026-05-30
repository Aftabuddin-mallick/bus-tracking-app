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

import {AuthContext} from '../../context/AuthContext';

import CustomButton from '../../ui/components/CustomButton';

import CustomInput from '../../ui/components/CustomInput';

import {COLORS} from '../../ui/theme/colors';

import {SPACING} from '../../ui/theme/spacing';

import {TYPOGRAPHY} from '../../ui/theme/typography';

export default function OtpScreen({
  navigation,
}: any) {
  const [code, setCode] = useState('');

  const [loading, setLoading] =
    useState(false);

  const {verifyOtp} =
    useContext(AuthContext);

  const handleVerify = async () => {
    if (code.length < 6) {
      Alert.alert(
        'Invalid OTP',
        'Enter valid 6 digit OTP',
      );

      return;
    }

    try {
      setLoading(true);

      console.log('VERIFY BUTTON CLICKED');

     await verifyOtp(code);

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

        <Text style={styles.icon}>
          🔐
        </Text>

        <Text style={styles.title}>
          Verify OTP
        </Text>

        <Text style={styles.subtitle}>
          Enter the OTP sent to your phone
        </Text>

        <CustomInput
          value={code}
          onChangeText={setCode}
          placeholder="Enter 6 digit OTP"
        />

        <CustomButton
          title="Verify OTP"
          onPress={handleVerify}
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

  icon: {
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