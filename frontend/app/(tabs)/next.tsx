import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

type Restaurant = {
  id: number;
  name: string;
  description: string;
  address: string;
  category: string;
  open: boolean;
};

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://unclasp-deceiving-skimming.ngrok-free.dev/api/restaurants', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#c8102e" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Restauranter</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/menu', params: { restaurantId: item.id, restaurantName: item.name } })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={item.open ? styles.open : styles.closed}>
              {item.open ? 'Åben' : 'Lukket'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  card: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  name: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 4 },
  category: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  address: { fontSize: 13, color: '#9CA3AF', marginBottom: 8 },
  open: { fontSize: 13, color: '#16a34a', fontWeight: '500' },
  closed: { fontSize: 13, color: '#c8102e', fontWeight: '500' },
});