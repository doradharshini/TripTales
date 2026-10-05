import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import TripsScreen from './src/screens/TripsScreen';
import JournalScreen from './src/screens/JournalScreen';
import MemoriesScreen from './src/screens/MemoriesScreen';
import TimelineScreen from './src/screens/TimelineScreen';

const tabs = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'trips', label: 'My Trips', icon: '▣' },
  { key: 'journal', label: 'Journal', icon: '✎' },
  { key: 'memories', label: 'Memories', icon: '▧' },
  { key: 'timeline', label: 'Timeline', icon: '◷' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    if (activeTab === 'home') return <HomeScreen onOpenTrips={() => setActiveTab('trips')} />;
    if (activeTab === 'trips') return <TripsScreen />;
    if (activeTab === 'journal') return <JournalScreen />;
    if (activeTab === 'memories') return <MemoriesScreen />;
    return <TimelineScreen />;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.screen}>{renderScreen()}</View>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <Pressable key={tab.key} style={styles.tab} onPress={() => setActiveTab(tab.key)}>
              <Text style={[styles.tabIcon, activeTab === tab.key && styles.tabActive]}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabActive]}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand,
  },
  screen: { flex: 1 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.paper },
  tab: { alignItems: 'center', minWidth: 56 },
  tabIcon: { color: colors.muted, fontSize: 18 },
  tabLabel: { color: colors.muted, fontSize: 9, marginTop: 3 },
  tabActive: { color: colors.greenDark, fontWeight: '800' },
});
