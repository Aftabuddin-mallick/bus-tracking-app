import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {COLORS} from '../theme/colors';

interface Props {
  title: string;

  onPress: () => void;

  loading?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  loading,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}>

      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,

    padding: 16,

    borderRadius: 12,

    alignItems: 'center',

    elevation: 4,
  },

  text: {
    color: COLORS.white,

    fontWeight: 'bold',

    fontSize: 16,
  },
});