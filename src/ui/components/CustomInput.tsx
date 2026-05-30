import React from 'react';

import {
  TextInput,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../theme/colors';

interface Props {
  value: string;

  onChangeText: (text: string) => void;

  placeholder: string;

  secureTextEntry?: boolean;
}

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: 12,

    padding: 16,

    marginBottom: 16,

    fontSize: 16,

    backgroundColor: COLORS.white,

    color: COLORS.text,
  },
});