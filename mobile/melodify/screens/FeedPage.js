import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GradientBackground from '../components/GradientBackground';

const FeedPage = () => {
    return (
        <GradientBackground>
            <View style={styles.container}>
                <Text style={styles.title}>Feed Page</Text>
                <Text style={styles.content}>Welcome to the Feed!</Text>
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

export default FeedPage;