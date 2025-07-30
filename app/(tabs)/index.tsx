import React, { useEffect } from 'react';
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
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import SheImage from '../../assets/images/she.jpg';

const { width } = Dimensions.get('window');

// Notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Word banks
const adjectives = ['beautiful', 'strong', 'brilliant', 'amazing', 'resilient', 'kind', 'fearless', 'compassionate', 'inspiring', 'thoughtful'];
const actions = ['brightens', 'inspires', 'heals', 'uplifts', 'soothes', 'guides', 'empowers', 'touches', 'comforts', 'enriches'];
const nouns = ['my heart', 'my soul', 'my day', 'the world', 'everything around me', 'my dreams', 'my thoughts', 'every moment', 'the universe', 'my spirit'];
const templates = [
  'You are so {adj}, you {verb} {noun}.',
  'Your {adj} soul always {verb} {noun}.',
  'You bring {adj} energy that {verb} {noun}.',
  'My love, your {adj} smile {verb} {noun}.',
  'Never forget how {adj} you are — you {verb} {noun}.',
  'Just being you is enough to {verb} {noun}.',
  'You’re not just {adj}, you’re the reason {noun} feels full.',
  'You’re the {adj} light that {verb} my path.',
  'Your presence {verb} everything — truly {adj}.',
  'Every breath you take {verb} {noun} with {adj} love.',
];

// Generate messages
const messages = Array.from({ length: 1440 }, () => {
  const template = templates[Math.floor(Math.random() * templates.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const verb = actions[Math.floor(Math.random() * actions.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return template
    .replace('{adj}', adj)
    .replace('{verb}', verb)
    .replace('{noun}', noun)
    .replace('{adj}', adj);
});

const MessageCard = ({ message }: { message: string }) => (
  <View style={cardStyles.card}>
    <Text style={cardStyles.text}>{message}</Text>
  </View>
);

export default function App() {
  useEffect(() => {
    scheduleMessages();
  }, []);

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

  const message = messages[new Date().getHours()];
  const name = 'Princess';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>💖 For You, {name} 💖</Text>
        <Text style={styles.subtitle}>
          Happy Girlfriend&apos;s Day, You Adorable Human 💕
        </Text>

        <View style={styles.imageWrapper}>
          <Image source={SheImage} style={styles.image} />
        </View>

        <MessageCard message={message} />
        <Text style={styles.footerNote}>🌸 Made with endless love 🌸</Text>
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
    padding: 24,
    backgroundColor: '#ffe4ec',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#d63384',
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
  imageWrapper: {
    shadowColor: '#d63384',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffb3d9',
    marginBottom: 24,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
  },
  footerNote: {
    marginTop: 40,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

const cardStyles = StyleSheet.create({
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

