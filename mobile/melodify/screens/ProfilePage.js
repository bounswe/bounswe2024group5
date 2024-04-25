// THIS IS A DUMMY PROFILE PAGE, wHEN MOBILE TEAM MERGE ALL PR'S, THIS FILE SHOULDN'T BE ACCEPTED



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GradientBackground from '../components/GradientBackground';

const ProfilePage = () => {
    return (
        <GradientBackground>
            <View style={styles.container}>
                <Text style={styles.title}>Profile Page</Text>
                <Text style={styles.content}>Welcome to your profile!</Text>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    content: {
        fontSize: 18,
        color: 'white',
    }
});

export default ProfilePage;
