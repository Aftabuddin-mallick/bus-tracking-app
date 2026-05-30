import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../ui/theme/colors';

import {SPACING} from '../ui/theme/spacing';

import {TYPOGRAPHY} from '../ui/theme/typography';

export default function SearchCard({
  from,
  to,
  setFrom,
  setTo,
  onSearch,
}: any) {

  return (
    <View style={styles.card}>

      <Text style={styles.cardTitle}>
        Search Route
      </Text>

      <TextInput
        placeholder="From Station"
        value={from}
        onChangeText={setFrom}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="To Station"
        value={to}
        onChangeText={setTo}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={onSearch}>

        <Text style={styles.searchButtonText}>
          Search Buses
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,

    marginHorizontal: SPACING.lg,

    padding: SPACING.lg,

    borderRadius: 18,

    marginBottom: SPACING.lg,

    elevation: 4,
  },

  cardTitle: {
    fontSize: TYPOGRAPHY.heading,

    fontWeight: 'bold',

    marginBottom: 6,
  },

  searchInput: {
    backgroundColor: '#F3F4F6',

    borderRadius: 12,

    paddingHorizontal: 15,

    paddingVertical: 12,

    marginTop: 10,

    fontSize: 16,
  },

  searchButton: {
    backgroundColor: COLORS.primary,

    marginTop: 15,

    paddingVertical: 14,

    borderRadius: 14,

    alignItems: 'center',
  },

  searchButtonText: {
    color: COLORS.white,

    fontWeight: 'bold',

    fontSize: 16,
  },
});