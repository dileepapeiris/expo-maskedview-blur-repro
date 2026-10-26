import { MaskedView } from '@expo/ui/community/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Repro for https://github.com/expo/expo/issues/52282
// Four boxes in front of colored stripes. Box 3 should look like box 4.

const STRIPES = ['#e53935', '#fdd835', '#1e88e5', '#43a047', '#8e24aa', '#fb8c00'];

function Stripes() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {STRIPES.map((c, i) => (
        <View key={i} style={{ flex: 1, backgroundColor: c }} />
      ))}
    </View>
  );
}

// Same mask as the docs "Alpha-fade mask" example, but from top (opaque) to bottom (transparent).
const fade = <LinearGradient colors={['black', 'transparent']} style={StyleSheet.absoluteFill} />;

function Box({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <Stripes />
        {children}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff', paddingTop: 70, paddingHorizontal: 16, gap: 12 },
  item: { gap: 4 },
  label: { fontSize: 14, color: '#333' },
  box: { width: 300, height: 100, overflow: 'hidden', borderRadius: 8 },
});
