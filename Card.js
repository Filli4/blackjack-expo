import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Card;
