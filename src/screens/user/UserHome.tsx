import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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

  const [showSearchCard, setShowSearchCard] =
  React.useState(true);

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

        {/* HEADER */}
      <View style={styles.header}>

  <View style={styles.headerTop}>

    <View>

      <Text style={styles.headerMiniText}>
        Smart Transit
      </Text>

      <Text style={styles.headerTitle}>
        Bus Tracking
      </Text>

      <Text style={styles.headerSubtitle}>
        Real-time route intelligence
      </Text>

    </View>

    <View style={styles.profileCircle}>
      <Text style={styles.profileText}>
        A
      </Text>
    </View>

  </View>

  <View style={styles.liveBadge}>

    <View style={styles.liveDot} />

    <Text style={styles.liveBadgeText}>
      LIVE TRACKING ACTIVE
    </Text>

  </View>

</View>


        {/* MAP */}
        <View style={styles.mapContainer}>

{showSearchCard && (

<SearchCard
  from={from}
  to={to}
  setFrom={setFrom}
  setTo={setTo}
  onSearch={() => {

  if (!from.trim() || !to.trim()) {
    return;
  }

  setSelectedBus(null);

  setSearched(true);

  setShowSearchCard(false);
}}
/>

)}

          <MapView

            scrollEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            pitchEnabled={true}
            moveOnMarkerPress={false}


            



           style={[styles.map, {flex: 1}]}
              initialRegion={{
              latitude: 22.5726,
              longitude: 88.3639,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}>
            
            {/* <View style={styles.mapShade} /> */}

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


{!showSearchCard && (

<TouchableOpacity
  style={styles.floatingSearchButton}

  onPress={() => setShowSearchCard(true)}>

  <Text style={styles.floatingSearchText}>
    🔍 Search Again
  </Text>

</TouchableOpacity>

)}

  {searched && filteredBuses.length === 0 && (

<View style={styles.noBusCard}>

  <Text style={styles.noBusText}>
    No buses found for this route
  </Text>

  <TouchableOpacity
    onPress={() => setShowSearchCard(true)}>

    <Text style={styles.tryAgainText}>
      Search Again
    </Text>

  </TouchableOpacity>

</View>

)}

  <View style={styles.locationButton}>

    <Text style={styles.locationIcon}>
      📍
   </Text>

  </View>

   {selectedBus && (

  <View style={styles.liveCard}>

      <Text style={styles.liveBusTitle}>
  {selectedBus.title}
</Text>

<View style={styles.statusBadge}>
  <Text style={styles.statusText}>
    LIVE
  </Text>
</View>

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

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },


header: {
  backgroundColor: '#111827',

  marginBottom: 20,

  paddingTop: 25,

  paddingBottom: 30,

  paddingHorizontal: 25,

  borderBottomLeftRadius: 35,

  borderBottomRightRadius: 35,
},

headerTop: {
  flexDirection: 'row',

  justifyContent: 'space-between',

  alignItems: 'center',
},

headerMiniText: {
  color: '#9CA3AF',

  fontSize: 14,

  marginBottom: 6,
},

headerTitle: {
  color: 'white',

  fontSize: 34,

  fontWeight: 'bold',
},

headerSubtitle: {
  color: '#D1D5DB',

  marginTop: 5,

  fontSize: 15,
},

profileCircle: {
  width: 55,

  height: 55,

  borderRadius: 28,

  backgroundColor: '#2563EB',

  justifyContent: 'center',

  alignItems: 'center',
},

profileText: {
  color: 'white',

  fontSize: 22,

  fontWeight: 'bold',
},

liveBadge: {
  marginTop: 22,

  backgroundColor: 'rgba(255,255,255,0.08)',

  paddingVertical: 12,

  paddingHorizontal: 16,

  borderRadius: 18,

  flexDirection: 'row',

  alignItems: 'center',
},

liveDot: {
  width: 10,

  height: 10,

  borderRadius: 5,

  backgroundColor: '#22C55E',

  marginRight: 10,
},

liveBadgeText: {
  color: 'white',

  fontWeight: '600',

  letterSpacing: 0.5,
},

 card: {
  backgroundColor: '#FFFFFF',

  marginHorizontal: SPACING.lg,

  padding: SPACING.lg,

  borderRadius: 28,

  marginBottom: SPACING.lg,

  elevation: 8,

  shadowColor: '#000',

  shadowOpacity: 0.08,

  shadowRadius: 10,

  shadowOffset: {
    width: 0,
    height: 4,
  },
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
  flex: 1,

  marginHorizontal: SPACING.lg,

  borderRadius: 35,

  backgroundColor: '#fff',

  marginBottom: 20,

  overflow: 'hidden',

  elevation: 8,
},

mapShade: {
  position: 'absolute',

  top: 0,
  bottom: 0,
  left: 0,
  right: 0,

  backgroundColor: 'rgba(0,0,0,0.05)',

  zIndex: 1,

  pointerEvents: 'none',
},


locationButton: {
  position: 'absolute',

  bottom: 25,

  right: 20,

  width: 55,

  height: 55,

  borderRadius: 28,

  backgroundColor: 'white',

  justifyContent: 'center',

  alignItems: 'center',

  elevation: 8,
},

locationIcon: {
  fontSize: 24,
},

  map: {
    flex: 1,
  },

liveCard: {
  position: 'absolute',

  bottom: 15,

  left: 15,

  right: 15,

  backgroundColor: '#FFFFFF',

  padding: SPACING.lg,

  borderRadius: 24,

  elevation: 10,

  shadowColor: '#000',

  shadowOpacity: 0.15,

  shadowRadius: 10,

  shadowOffset: {
    width: 0,
    height: 4,
  },
},

noBusCard: {
  position: 'absolute',

  bottom: 20,

  left: 20,

  right: 20,

  backgroundColor: 'white',

  padding: 18,

  borderRadius: 20,

  elevation: 8,
},

noBusText: {
  fontWeight: 'bold',

  fontSize: 16,

  color: '#111827',

  marginBottom: 8,
},

tryAgainText: {
  color: '#2563EB',

  fontWeight: 'bold',
},

liveBusTitle: {
  fontSize: 22,

  fontWeight: 'bold',

  color: '#111827',

  marginBottom: 8,
},

searchInput: {
  backgroundColor: '#F9FAFB',

  borderWidth: 1,

  borderColor: '#E5E7EB',

  borderRadius: 18,

  paddingHorizontal: 18,

  paddingVertical: 14,

  marginTop: 12,

  fontSize: 16,

  color: '#111827',
},

floatingSearchButton: {
  position: 'absolute',

  top: 20,

  alignSelf: 'center',

  backgroundColor: '#111827',

  paddingHorizontal: 18,

  paddingVertical: 12,

  borderRadius: 30,

  zIndex: 999,

  elevation: 10,
},

floatingSearchText: {
  color: 'white',

  fontWeight: 'bold',
},

liveText: {
  color: '#4B5563',

  marginBottom: 6,

  fontSize: 15,
},

searchButton: {
  backgroundColor: '#2563EB',

  marginTop: 18,

  paddingVertical: 16,

  borderRadius: 18,

  alignItems: 'center',

  elevation: 5,
},

searchButtonText: {
  color: COLORS.white,

  fontWeight: 'bold',

  fontSize: 17,

  letterSpacing: 0.5,
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

  statusBadge: {
  backgroundColor: '#DCFCE7',

  alignSelf: 'flex-start',

  paddingHorizontal: 12,

  paddingVertical: 5,

  borderRadius: 20,

  marginBottom: 10,
},

statusText: {
  color: '#16A34A',

  fontWeight: 'bold',

  fontSize: 12,
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