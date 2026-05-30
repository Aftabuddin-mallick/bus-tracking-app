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
  Polyline,
} from 'react-native-maps';

import {COLORS} from '../../ui/theme/colors';

import {SPACING} from '../../ui/theme/spacing';

import {TYPOGRAPHY} from '../../ui/theme/typography';

import busIcon from '../../assets/images/bus.png';

export default function UserHome() {

const [buses, setBuses] =
  React.useState([
    {
      id: 1,
      latitude: 22.5726,
      longitude: 88.3639,
      title: 'WB-01A-1234',
    },

    {
      id: 2,
      latitude: 22.5826,
      longitude: 88.3739,
      title: 'WB-01A-5678',
    },

    {
      id: 3,
      latitude: 22.5626,
      longitude: 88.3539,
      title: 'WB-01A-9999',
    },
  ]);

  const [selectedBus, setSelectedBus] =
  React.useState<any>(null);

  const routeCoordinates = [
  {
    latitude: 22.5726,
    longitude: 88.3639,
  },

  {
    latitude: 22.5826,
    longitude: 88.3739,
  },

  {
    latitude: 22.5926,
    longitude: 88.3839,
  },

  {
    latitude: 22.6026,
    longitude: 88.3939,
  },
];

   React.useEffect(() => {

  const interval = setInterval(() => {

    setBuses(prevBuses =>

      prevBuses.map(bus => ({
        ...bus,

        latitude:
          bus.latitude + (
            Math.random() * 0.0001
          ),

        longitude:
          bus.longitude + (
            Math.random() * 0.0001
          ),
      })),
    );

  }, 500);

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
              initialRegion={{
              latitude: 22.5726,
              longitude: 88.3639,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}>


          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor="#007BFF"
          />  

            {buses.map(bus => (

          <Marker
            key={bus.id}
              coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude,
            }}
            title={bus.title}
            description="Live Bus Tracking"
            image={busIcon}
            onPress={() => setSelectedBus(bus)}
          />

))}

          </MapView>

          {selectedBus && (

  <View style={styles.liveCard}>

    <Text style={styles.liveBusTitle}>
      {selectedBus.title}
    </Text>

    <Text style={styles.liveText}>
      ETA: 5 mins
    </Text>

    <Text style={styles.liveText}>
      Route: Howrah → Salt Lake
    </Text>

    <Text style={styles.liveText}>
      Status: On Time
    </Text>

  </View>

)}

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

  liveCard: {
  backgroundColor: COLORS.white,

  marginHorizontal: SPACING.lg,

  padding: SPACING.lg,

  borderRadius: 18,

  marginTop: SPACING.md,

  elevation: 5,
},

liveBusTitle: {
  fontSize: TYPOGRAPHY.heading,

  fontWeight: 'bold',

  marginBottom: 8,
},

liveText: {
  color: COLORS.gray,

  marginBottom: 4,
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