import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeedPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Melodify</Text>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Search" 
                    placeholderTextColor="#ccc"
                />
                <Ionicons name="search" size={24} color="gray" style={styles.iconStyle} />
            </View>
            <View style={styles.container2}>
                <Text style={styles.title}>Feed Page</Text>
                <Text style={styles.content}>Welcome to the Feed!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#111927', // Dark blue background color
    },
    mainTitle: {
        fontWeight: 'bold',
        marginTop: 30,
        // marginLeft: 20,
        alignSelf: 'flex-start',
        fontSize: 40,
        marginBottom: 20,
        color: '#ffffff', // White text color
    },
    searchContainer: {
        alignSelf: 'flex-start',
        width: '100%',
        padding: 20,
        position: 'relative',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 40, // Adjust padding to make space for the icon inside the box
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
    },
    iconStyle: {
        position: 'absolute',
        right: 30, // Adjust based on your design preference
        top: 33, // Adjust based on the height of your TextInput
        backgroundColor: 'transparent',
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
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
    },
});

export default FeedPage;
