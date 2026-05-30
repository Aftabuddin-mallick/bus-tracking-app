import React, {
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import {AuthContext} from '../../context/AuthContext';

import CustomButton from '../../ui/components/CustomButton';

import {COLORS} from '../../ui/theme/colors';

import {SPACING} from '../../ui/theme/spacing';

import {TYPOGRAPHY} from '../../ui/theme/typography';

export default function RoleSelect() {
  const {saveRole} =
    useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const handleRole = async (
    role: string,
  ) => {
    try {
      setLoading(true);

      await saveRole(role);

    } catch (error: any) {
      Alert.alert(
        'Role Error',
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
          🚌
        </Text>

        <Text style={styles.title}>
          Select Your Role
        </Text>

        <Text style={styles.subtitle}>
          Choose how you want to use
          the app
        </Text>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Passenger"
            onPress={() =>
              handleRole('user')
            }
            loading={loading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Driver"
            onPress={() =>
              handleRole('driver')
            }
            loading={loading}
          />
        </View>

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

  buttonContainer: {
    marginBottom:
      SPACING.md,
  },
});