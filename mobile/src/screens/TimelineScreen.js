import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { deleteTimelineEvent, getTimelineEvents } from '../services/tripApi';
import ScreenHeader from '../components/ScreenHeader';
import { colors, spacing } from '../theme';

export default function TimelineScreen() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setEvents(await getTimelineEvents());
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);
  const remove = async (event) => { try { await deleteTimelineEvent(event.type, event.id); setEvents((current) => current.filter((item) => !(item.id === event.id && item.type === event.type))); } catch { /* Keep the event when the server rejects deletion. */ } };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenHeader eyebrow="YOUR JOURNEY" title="Timeline" subtitle="Your entire journey, day by day." />
      {isLoading && <ActivityIndicator color={colors.green} />}
      {!isLoading && events.length === 0 && <Text style={styles.empty}>Your timeline will appear as you plan and remember.</Text>}
      <View style={styles.list}>
        {events.map((event, index) => (
          <View style={styles.item} key={`${event.type}-${event.id}`}>
            <View style={styles.date}><Text style={styles.dateText}>{event.date}</Text><Text style={styles.day}>Day {index + 1}</Text></View>
            <View style={styles.rail}><Text style={styles.icon}>{event.icon || '•'}</Text></View>
            <View style={styles.card}><Text style={styles.type}>{event.type}</Text><Text style={styles.title}>{event.title}</Text><Text style={styles.description}>{event.description || 'A moment worth keeping.'}</Text><Pressable onPress={() => remove(event)}><Text style={styles.delete}>Delete moment</Text></Pressable></View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.page, paddingTop: 58, backgroundColor: colors.sand, flexGrow: 1 },
  list: { marginTop: 8 },
  item: { flexDirection: 'row', minHeight: 105 },
  date: { width: 72, paddingTop: 4 },
  dateText: { color: colors.ink, fontSize: 11, fontWeight: '800' },
  day: { color: colors.muted, fontSize: 10, marginTop: 4 },
  rail: { width: 34, alignItems: 'center', borderLeftColor: '#cddbd3', borderLeftWidth: 1 },
  icon: { width: 30, height: 30, paddingTop: 6, borderRadius: 15, backgroundColor: colors.green, color: '#fff', fontSize: 12, textAlign: 'center' },
  card: { flex: 1, padding: 14, marginBottom: 13, marginLeft: 11, borderWidth: 1, borderColor: colors.line, borderRadius: 12, backgroundColor: colors.paper },
  type: { color: colors.green, fontSize: 9, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: colors.ink, fontSize: 16, fontWeight: '800', marginTop: 6 },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  delete: { color: '#a65748', fontSize: 10, marginTop: 10 },
  empty: { color: colors.muted, fontSize: 14 },
});