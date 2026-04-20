import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function OrderConfirmationScreen() {
  const { total, restaurantName } = useLocalSearchParams();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Bestilling modtaget!</Text>
        <Text style={styles.subtitle}>Din ordre er på vej.</Text>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total betalt</Text>
          <Text style={styles.cardPrice}>{total} kr</Text>
        </View>
        <Text style={styles.info}>Estimeret leveringstid: 30-45 min 🚴</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.buttonText}>Tilbage til forsiden</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 80, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  card: { backgroundColor: '#FEF2F2', borderRadius: 12, padding: 24, width: '100%', alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#FECACA' },
  cardLabel: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  cardPrice: { fontSize: 36, fontWeight: 'bold', color: '#c8102e' },
  info: { fontSize: 14, color: '#6B7280', marginBottom: 40 },
  button: { backgroundColor: '#c8102e', borderRadius: 8, padding: 16, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});