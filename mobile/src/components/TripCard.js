import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const tripImages = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',
];

export default function TripCard({ trip, index = 0 }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: tripImages[index % tripImages.length] }} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>{trip.tripName}</Text>
          <Text style={styles.status}>{trip.status || 'Upcoming'}</Text>
        </View>
        <Text style={styles.destination}>📍 {trip.destination}</Text>
        <Text style={styles.dates}>📅 {trip.startDate}  →  {trip.endDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden', borderWidth: 1, borderColor: colors.line, borderRadius: 14, backgroundColor: colors.paper, marginBottom: spacing.medium },
  image: { width: '100%', height: 132 },
  content: { padding: spacing.card },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.small },
  title: { color: colors.ink, flex: 1, fontSize: 17, fontWeight: '800' },
  status: { color: colors.greenDark, backgroundColor: colors.mint, borderRadius: 12, fontSize: 10, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 5 },
  destination: { color: colors.muted, fontSize: 12, marginTop: 10 },
  dates: { color: colors.muted, fontSize: 12, marginTop: 5 },
});
