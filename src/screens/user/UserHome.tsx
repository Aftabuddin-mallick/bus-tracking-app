import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import {COLORS} from '../../ui/theme/colors';

import {SPACING} from '../../ui/theme/spacing';

import {TYPOGRAPHY} from '../../ui/theme/typography';

export default function UserHome() {

  const [busLocation, setBusLocation] =
  React.useState({
    latitude: 22.5726,
    longitude: 88.3639,
  });

   React.useEffect(() => {

    const interval = setInterval(() => {

      setBusLocation(prev => ({
        latitude:
          prev.latitude + 0.0005,

        longitude:
          prev.longitude + 0.0005,
      }));

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello 👋
          </Text>

          <Text style={styles.title}>
            Track Your Bus
          </Text>
        </View>

        {/* SEARCH CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Search Route
          </Text>

          <Text style={styles.cardText}>
            Find buses and live routes
          </Text>
        </View>

        {/* MAP */}
        <View style={styles.mapContainer}>

          <MapView
            style={styles.map}
              region={{
              latitude: 22.5726,
              longitude: 88.3639,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}>

            <Marker
             coordinate={busLocation}
              title="Bus Location"
              description="Live tracking"
            />

          </MapView>

        </View>

        {/* BUSES */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Nearby Buses
          </Text>

          <View style={styles.busCard}>
            <Text style={styles.busName}>
              Bus WB-01A-1234
            </Text>

            <Text style={styles.busEta}>
              Arriving in 5 mins
            </Text>
          </View>

          <View style={styles.busCard}>
            <Text style={styles.busName}>
              Bus WB-01A-5678
            </Text>

            <Text style={styles.busEta}>
              Arriving in 12 mins
            </Text>
          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    padding: SPACING.lg,
  },

  greeting: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.gray,
  },

  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 4,
  },

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

  cardText: {
    color: COLORS.gray,
  },

  mapContainer: {
    height: 250,
    marginHorizontal: SPACING.lg,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },

  map: {
    flex: 1,
  },

  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },

  busCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 16,
    marginBottom: SPACING.md,
    elevation: 3,
  },

  busName: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
  },

  busEta: {
    color: COLORS.gray,
    marginTop: 4,
  },
});