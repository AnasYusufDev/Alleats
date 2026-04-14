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
import { useLocalSearchParams, router } from 'expo-router';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function MenuScreen() {
  const { restaurantId, restaurantName } = useLocalSearchParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch(`https://unclasp-deceiving-skimming.ngrok-free.dev/api/menu/${restaurantId}`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#c8102e" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Tilbage</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{restaurantName}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>{item.price} kr</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push({ pathname: '/cart', params: { cartItems: JSON.stringify(cart), restaurantId: restaurantId } })}
        >
          <Text style={styles.cartButtonText}>Se kurv ({cartCount})</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  backButton: { marginBottom: 12 },
  backText: { fontSize: 16, color: '#c8102e', fontWeight: '500' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  card: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  description: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  category: { fontSize: 12, color: '#9CA3AF' },
  right: { alignItems: 'center', gap: 8 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#c8102e' },
  addButton: { backgroundColor: '#c8102e', borderRadius: 20, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  cartButton: { backgroundColor: '#c8102e', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  cartButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});