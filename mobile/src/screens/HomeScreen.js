import { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getTrips } from '../services/tripApi';
import ScreenHeader from '../components/ScreenHeader';
import TripCard from '../components/TripCard';
import { colors, spacing } from '../theme';

export default function HomeScreen({ onOpenTrips }) {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setTrips(await getTrips());
      } catch (loadError) {
        console.error('Mobile trip loading failed:', loadError);
        setError('Start the Spring Boot backend to load your trips.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadTrips();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenHeader eyebrow="TRIPTALES MOBILE" title="Your journey" subtitle="Plan lightly. Remember everything." />
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85' }} imageStyle={styles.heroImage} style={styles.hero}>
        <View style={styles.heroOverlay} />
        <Text style={styles.heroEyebrow}>A QUIET PLACE FOR YOUR STORIES</Text>
        <Text style={styles.heroTitle}>Make room for the good days.</Text>
        <Text style={styles.heroText}>Your trips, journal entries and memories in one calm place.</Text>
        <Pressable style={styles.primaryButton} onPress={onOpenTrips}><Text style={styles.primaryButtonText}>View my trips  →</Text></Pressable>
      </ImageBackground>
      <View style={styles.featureRow}><Text style={styles.feature}><Text style={styles.featureIcon}>✈</Text>{'\n'}Plan</Text><Text style={styles.feature}><Text style={styles.featureIcon}>⌖</Text>{'\n'}Explore</Text><Text style={styles.feature}><Text style={styles.featureIcon}>▤</Text>{'\n'}Journal</Text><Text style={styles.feature}><Text style={styles.featureIcon}>▣</Text>{'\n'}Capture</Text></View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Recent trips</Text><Text style={styles.sectionMeta}>{trips.length} saved</Text></View>
      {isLoading && <ActivityIndicator color={colors.green} />}
      {error && <View style={styles.errorBox}><Text style={styles.error}>{error}</Text><Pressable style={styles.retryButton} onPress={() => { setError(''); setIsLoading(true); void loadTrips(); }}><Text style={styles.retryText}>Retry connection</Text></Pressable></View>}
      {!isLoading && !error && trips.length === 0 && <Text style={styles.empty}>No trips yet. Create your first journey from the web app while mobile trip creation is being built.</Text>}
      {!isLoading && trips.slice(0, 2).map((trip, index) => <TripCard key={trip.id} trip={trip} index={index} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.page, paddingTop: 58, backgroundColor: colors.sand, flexGrow: 1 },
  hero: { minHeight: 280, justifyContent: 'flex-end', overflow: 'hidden', padding: spacing.card, borderRadius: 18, marginBottom: 20 },
  heroImage: { borderRadius: 18 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13, 73, 70, .48)' },
  heroEyebrow: { color: '#dcece3', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  heroTitle: { color: '#fffdf9', fontSize: 28, fontWeight: '800', lineHeight: 34, marginTop: 13 },
  heroText: { color: '#e4efe9', fontSize: 13, lineHeight: 20, marginTop: 10 },
  primaryButton: { alignSelf: 'flex-start', backgroundColor: '#e8b17d', borderRadius: 22, marginTop: 18, paddingHorizontal: 16, paddingVertical: 11 },
  primaryButtonText: { color: colors.greenDark, fontSize: 12, fontWeight: '800' },
  featureRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingHorizontal: 12 },
  feature: { color: colors.muted, fontSize: 10, textAlign: 'center' },
  featureIcon: { color: colors.green, fontSize: 22 },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { color: colors.ink, fontSize: 22, fontWeight: '800' },
  sectionMeta: { color: colors.muted, fontSize: 12 },
  errorBox: { marginBottom: 16 },
  error: { color: '#a65748', fontSize: 13, lineHeight: 20 },
  retryButton: { alignSelf: 'flex-start', borderColor: colors.green, borderRadius: 18, borderWidth: 1, marginTop: 10, paddingHorizontal: 13, paddingVertical: 8 },
  retryText: { color: colors.greenDark, fontSize: 11, fontWeight: '800' },
  empty: { color: colors.muted, fontSize: 13, lineHeight: 20 },
});
