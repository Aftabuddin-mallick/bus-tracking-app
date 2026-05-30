import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import MapView, {
  Marker,
  Polyline,
} from 'react-native-maps';

import {COLORS} from '../../ui/theme/colors';

import {SPACING} from '../../ui/theme/spacing';

import {TYPOGRAPHY} from '../../ui/theme/typography';

import busIcon from '../../assets/images/bus.png';

import SearchCard from '../../components/SearchCard';

export default function UserHome() {

const [buses, setBuses] =
  React.useState([
   {
  id: 1,

  latitude: 22.5726,
  longitude: 88.3639,

  title: 'WB-01A-1234',

   currentStopIndex: 0,

  route: [
    'Howrah',
    'Park Street',
    'Sealdah',
    'Salt Lake',
  ],
},

{
  id: 2,
  latitude: 22.5826,
  longitude: 88.3739,

  title: 'WB-01A-5678',

   currentStopIndex: 0,

  route: [
    'Dunlop',
    'Shyambazar',
    'Esplanade',
    'Salt Lake',
  ],
},

  {
  id: 3,
  latitude: 22.5626,
  longitude: 88.3539,

  title: 'WB-01A-9999',

   currentStopIndex: 0,

  route: [
    'Howrah',
    'MG Road',
    'Sealdah',
    'Airport',
  ],
},
  ]);

  const [selectedBus, setSelectedBus] =
  React.useState<any>(null);

  const [from, setFrom] =
  React.useState('');

  const [to, setTo] =
  React.useState('');

  const [searched, setSearched] =
  React.useState(false);

  // const [search, setSearch] =
  // React.useState('');

const filteredBuses = searched
  ? buses.filter(bus => {

      const routeStops =
        bus.route.map(stop =>
          stop.toLowerCase().trim(),
        );

      return (
        routeStops.includes(
          from.toLowerCase().trim(),
        ) &&

        routeStops.includes(
          to.toLowerCase().trim(),
        )
      );
    })

  : [];
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

  currentStopIndex:
    bus.currentStopIndex <
    bus.route.length - 1

      ? bus.currentStopIndex + 1

      : 0,
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

      <SearchCard
  from={from}
  to={to}
  setFrom={setFrom}
  setTo={setTo}
  onSearch={() => {

  setSelectedBus(null);

  setSearched(true);
}}
/>


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

          {filteredBuses.map(bus => (

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
  Current Stop:

  {' '}
  {
    selectedBus.route[
      selectedBus.currentStopIndex
    ]
  }
</Text>

<Text style={styles.liveText}>
  Next Stop:

  {' '}
  {
    selectedBus.route[
      (
        selectedBus.currentStopIndex + 1
      ) %

      selectedBus.route.length
    ]
  }
</Text>

<Text style={styles.liveText}>
  ETA: 5 mins
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

searchInput: {
  backgroundColor: '#F3F4F6',

  borderRadius: 12,

  paddingHorizontal: 15,

  paddingVertical: 12,

  marginTop: 10,

  fontSize: 16,
},

liveText: {
  color: COLORS.gray,

  marginBottom: 4,
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