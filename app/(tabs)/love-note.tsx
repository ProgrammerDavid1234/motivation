import React, { useState } from 'react';
import { Linking } from 'react-native'; // Add this import at the top

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

export default function LoveNoteScreen() {
    const [diary, setDiary] = useState('');
    const [savedNote, setSavedNote] = useState('');

    const saveNote = () => {
        if (diary.trim()) {
            setSavedNote(diary.trim());
            const phone = '2347084700734'; // Your phone number in international format (without +)
            const message = encodeURIComponent(diary.trim());
            const url = `https://wa.me/${phone}?text=${message}`;

            Linking.openURL(url)
                .then(() => {
                    setDiary('');
                    Alert.alert('Saved!', 'Your note was opened in WhatsApp 💌');
                })
                .catch(() => {
                    Alert.alert('Error', 'Could not open WhatsApp');
                });
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>📓 Today's Love Note</Text>
            <TextInput
                style={styles.diaryInput}
                multiline
                placeholder="Write something sweet..."
                placeholderTextColor="#cc6699"
                value={diary}
                onChangeText={setDiary}
            />
            <TouchableOpacity style={styles.button} onPress={saveNote}>
                <Text style={styles.buttonText}>Save Note</Text>
            </TouchableOpacity>

            {savedNote ? (
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.lastNoteLabel}>💌 Last Note:</Text>
                    <Text style={styles.lastNoteText}>{savedNote}</Text>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe4ec',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#b03060',
        textAlign: 'center',
    },
    diaryInput: {
        backgroundColor: '#fff0f6',
        borderColor: '#d63384',
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        height: 100,
        textAlignVertical: 'top',
        color: '#b03060',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#d63384',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    lastNoteLabel: {
        fontWeight: '600',
        color: '#8b008b',
        textAlign: 'center',
    },
    lastNoteText: {
        marginTop: 6,
        color: '#6b5b95',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
