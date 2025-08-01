import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function MessageCard({ message }: { message: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff0f6',
    padding: 25,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#f9a8d4',
    shadowColor: '#d63384',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    width: width * 0.9,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#b03060',
    fontWeight: '600',
    lineHeight: 30,
  },
});
