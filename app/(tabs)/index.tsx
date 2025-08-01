import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import LottieView from 'lottie-react-native';

import SheImage from '../../assets/images/she.jpg';
// import FunThings from '../../components/FunThings';
import MessageCard from '../../components/MessageCard';
import { generateLoveMessages } from '../../constants/loveMessages';


const { width } = Dimensions.get('window');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const messages = generateLoveMessages();

export default function App() {
  const [notificationsPaused, setNotificationsPaused] = useState(false);
const [diary, setDiary] = useState('');
const [savedNote, setSavedNote] = useState('');
const [compliment, setCompliment] = useState('');

const compliments = [
  "You're even more lovely than this app 😍",
  "Your smile is my favorite notification 💬",
  "You're the sunshine I didn't know I needed ☀️",
  "You make every moment magical ✨",
  "Even coffee isn’t as uplifting as you ☕💕",
];

const saveNote = () => {
  if (diary.trim()) {
    setSavedNote(diary.trim());
    setDiary('');
    Alert.alert('Saved!', 'Your note was saved 💌');
  }
};

const giveCompliment = () => {
  const random = compliments[Math.floor(Math.random() * compliments.length)];
  setCompliment(random);
};

  useEffect(() => {
    registerAndSchedule();

    async function registerAndSchedule() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission not granted!');
        return;
      }

      if (!notificationsPaused) {
        scheduleMessages();
      }
    }

  }, [notificationsPaused]);

  const scheduleMessages = async () => {
    if (!Device.isDevice) {
      Alert.alert('Use a real device for notifications');
      return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted!');
      return;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const hourLater = new Date(now);
      hourLater.setHours(now.getHours() + i);
      hourLater.setMinutes(0);
      hourLater.setSeconds(0);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💌 Your Love Note',
          body: messages[i % messages.length],
        },
        trigger: hourLater,
      });
    }
  };

  const toggleNotifications = async () => {
    if (!notificationsPaused) {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } else {
      scheduleMessages();
    }
    setNotificationsPaused(!notificationsPaused);
  };

  const name = 'Princess';
  const mode = 'fun';
  const message = messages[new Date().getHours()];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const loveStartDate = new Date('2025-01-25');
  const daysTogether = Math.floor(
    (new Date().getTime() - loveStartDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const loveQuotes = [
    "You're my today and all of my tomorrows.",
    "In your smile, I see something more beautiful than stars.",
    "You are my heart, my life, my one and only thought.",
  ];
  const quote = loveQuotes[new Date().getDay() % loveQuotes.length];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>💖 For You, {name} 💖</Text>
        <Text style={styles.subtitle}>
          Happy Girlfriend&apos;s Day, You Adorable Human 💕
        </Text>

        <LottieView
          source={{ uri: 'https://lottie.host/dd6cf145-7c6a-40b2-90a6-275f25d705f7/bLDpd7tSBm.lottie' }}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />


        <View style={styles.outerGlow}>
          <View style={styles.imageWrapper}>
            <Image source={SheImage} style={styles.image} />
          </View>
        </View>

        <Text style={styles.quote}>{quote}</Text>
        <MessageCard message={message} />
        <Text style={styles.days}>You've been loved for {daysTogether} days 💖</Text>

        

        <TouchableOpacity style={styles.button} onPress={toggleNotifications}>
          <Text style={styles.buttonText}>
            {notificationsPaused ? 'Resume Messages' : 'Pause Messages'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>🌸 Made with endless love 🌸</Text>

        {/* {mode === 'fun' && <FunThings />} */}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffe4ec',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 74,
    backgroundColor: '#ffe4ec',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#d63384',
    marginBottom: 8,
    textAlign: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '500',
    color: '#a0522d',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontStyle: 'italic',
    color: '#6b5b95',
    textAlign: 'center',
    marginBottom: 24,
  },
  outerGlow: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 9999,
    backgroundColor: '#ffe0f0',
    shadowColor: '#ffb6c1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 15,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f6',
    padding: 8,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#ffc0cb',
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 24,
    transform: [{ scale: 1 }],
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#cc3366',
    marginBottom: 16,
    textAlign: 'center',
  },
  days: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8b008b',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#d63384',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerNote: {
    marginTop: 40,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});
