import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import Modal from 'react-native-modal';

const getCardValue = (card) => {
  if (['J', 'Q', 'K'].includes(card)) return 10;
  if (card === 'A') return 11; 
  return parseInt(card);
};

const calculateHandValue = (hand) => {
  let value = hand.reduce((acc, card) => acc + getCardValue(card), 0);
  let numAces = hand.filter(card => card === 'A').length;
  
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces -= 1;
  }
  return value;
};

const getRandomCard = () => {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return cards[Math.floor(Math.random() * cards.length)];
};

const BlackjackGame = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [revealDealerCard, setRevealDealerCard] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 

  const startGame = () => {
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([getRandomCard(), getRandomCard()]);
    setGameOver(false);
    setMessage('');
    setGameStarted(true);
    setRevealDealerCard(false);
    setModalVisible(false);
  };

  const handleHit = () => {
    const newHand = [...playerHand, getRandomCard()];
    setPlayerHand(newHand);

    const playerValue = calculateHandValue(newHand);
    if (playerValue > 21) {
      setMessage('Bust! You lose.');
      setGameOver(true);
      setRevealDealerCard(true);
      setModalVisible(true);
    }
  };

  const handleStand = () => {
    setRevealDealerCard(true);
    let dealerValue = calculateHandValue(dealerHand);
    let newHand = [...dealerHand];

    while (dealerValue < 17) {
      newHand = [...newHand, getRandomCard()];
      dealerValue = calculateHandValue(newHand);
    }

    setDealerHand(newHand);

    const playerValue = calculateHandValue(playerHand);
    if (dealerValue > 21 || playerValue > dealerValue) {
      setMessage('You win!');
    } else if (playerValue < dealerValue) {
      setMessage('Dealer wins!');
    } else {
      setMessage('It\'s a tie!');
    }
    setGameOver(true);
    setModalVisible(true); 
  };

  const handleRestart = () => {
    startGame();
  };

  const closeModal = () => {
    setModalVisible(false);
    startGame(); 
  };

  const getResultColor = () => {
    if (message.includes('win')) {
      return message.includes('You') ? 'green' : 'red';
    } else {
      return 'orange';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>
      {!gameStarted ? (
        <TouchableOpacity style={styles.button} onPress={startGame}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.subtitle}>Dealer's Hand</Text>
          <View style={styles.handContainer}>
            {dealerHand.map((card, index) => (
              <Card key={index} value={index === 0 && !revealDealerCard ? '??' : card} />
            ))}
          </View>
          {gameOver && <Text style={styles.handValue}>Dealer's Hand Value: {calculateHandValue(dealerHand)}</Text>}
          <Text style={styles.subtitle}>Your Hand</Text>
          <View style={styles.handContainer}>
            {playerHand.map((card, index) => (
              <Card key={index} value={card} />
            ))}
          </View>
          <Text style={styles.handValue}>Your Hand Value: {calculateHandValue(playerHand)}</Text>
          {!gameOver && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleHit}>
                <Text style={styles.buttonText}>Hit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleStand}>
                <Text style={styles.buttonText}>Stand</Text>
              </TouchableOpacity>
            </View>
          )}
          {gameOver && (
            <TouchableOpacity style={styles.button} onPress={handleRestart}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <Modal isVisible={modalVisible} backdropOpacity={0.8}>
        <View style={styles.modalContainer}>
          <Text style={[styles.resultText, { color: getResultColor() }]}>{message}</Text>
          <Text style={styles.resultText}>Dealer's Result: {calculateHandValue(dealerHand)}</Text>
          <Text style={styles.resultText}>Your Result: {calculateHandValue(playerHand)}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#ecf0f1',
    marginTop: 20,
  },
  handContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  handValue: {
    fontSize: 20,
    color: '#ecf0f1',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ecf0f1',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default BlackjackGame;
