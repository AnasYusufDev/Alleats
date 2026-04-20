import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function CartScreen() {
  const { cartItems, restaurantId } = useLocalSearchParams();
  const items: CartItem[] = cartItems ? JSON.parse(cartItems as string) : [];
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://unclasp-deceiving-skimming.ngrok-free.dev/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          totalPrice: total,
          restaurant: { id: restaurantId }
        })
      });

      if (response.ok) {
        router.replace({
          pathname: '/orderconfirmation',
          params: { total: total, restaurantName: restaurantId }
        });
      }
    } catch (err) {
      Alert.alert('Fejl', 'Noget gik galt. Prøv igen.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Tilbage</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Din kurv</Text>
      {items.length === 0 ? (
        <Text style={styles.empty}>Kurven er tom</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.quantity}>Antal: {item.quantity}</Text>
                </View>
                <Text style={styles.price}>{item.price * item.quantity} kr</Text>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {total} kr</Text>
            <TouchableOpacity style={styles.orderButton} onPress={placeOrder} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.orderButtonText}>Bestil nu</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  backButton: { marginBottom: 12 },
  backText: { fontSize: 16, color: '#c8102e', fontWeight: '500' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  empty: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 40 },
  card: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600', color: '#111827' },
  quantity: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#c8102e' },
  totalContainer: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 16, marginTop: 8 },
  totalText: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  orderButton: { backgroundColor: '#c8102e', borderRadius: 8, padding: 16, alignItems: 'center' },
  orderButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});