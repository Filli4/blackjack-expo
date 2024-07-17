
import BlackjackGame from './CardGame';

import React from 'react';
import { StyleSheet, View } from 'react-native';


const App = () => {
  return (
    <View style={styles.container}>
      <BlackjackGame />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default App;
