// EloCefrInfoTable.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const calculateQuizDifficultyFromElo = (elo: number) => {
    if (elo < 400) return "A1";
    else if (elo < 1000) return "A2";
    else if (elo < 1800) return "B1";
    else if (elo < 2600) return "B2";
    else if (elo < 3300) return "C1";
    else return "C2";
};

export const EloCefrInfoTable = () => {

    return (
        <View style={styles.modalContentContainer}>
            <Text style={styles.modalSectionTitle}>Welcome to Quizzard! 🔮</Text>

            <Text style={styles.modalText}>
                We are your friend in language learning.{"\n"}
                We offer quizzes to help you learn English with fun!
            </Text>

            <Text style={styles.modalSectionSubtitle}>ELO - CEFR Levels Conversion</Text>

            <Text style={styles.modalText}>You can see the conversion logic:</Text>

            <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                    <Text style={styles.levelText}>A1 </Text>
                    <FontAwesome name="long-arrow-right" size={16} color="#6a0dad" />
                    <Text style={styles.rangeText}> [000, 400]</Text>
                </Text>
            </View>
            
            <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                    <Text style={styles.levelText}>A2 </Text>
                    <FontAwesome name="long-arrow-right" size={16} color="#6a0dad" />
                    <Text style={styles.rangeText}> [400, 1800]</Text>
                </Text>
            </View>

            <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                    <Text style={styles.levelText}>B1 </Text>
                    <FontAwesome name="long-arrow-right" size={16} color="#6a0dad" />
                    <Text style={styles.rangeText}> [1000, 1800]</Text>
                </Text>
            </View>
            
            <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                    <Text style={styles.levelText}>B2 </Text>
                    <FontAwesome name="long-arrow-right" size={16} color="#6a0dad" />
                    <Text style={styles.rangeText}> [1800, 2600]</Text>
                </Text>
            </View>
            
            <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                    <Text style={styles.levelText}>C1 </Text>
                    <FontAwesome name="long-arrow-right" size={16} color="#6a0dad" />
                    <Text style={styles.rangeText}> [2600, 3300]</Text>
                </Text>
            </View>
            
            <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                    <Text style={styles.levelText}>C2 </Text>
                    <FontAwesome name="long-arrow-right" size={16} color="#6a0dad" />
                    <Text style={styles.rangeText}> [3300, 10000]</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContentContainer: {
        paddingTop: 10,
    },
    modalSectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6a0dad',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalSectionSubtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6a0dad',
        marginTop: 15,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        lineHeight: 22,
    },
    bulletPoint: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 5,
    },
    bullet: {
        fontSize: 18,
        marginRight: 10,
        color: "#4C1D95", // Optional color customization
    },
    bulletText: {
        fontSize: 16,
        color: "#6a0dad",
        flex: 1, // Ensures text wraps properly
    },
    levelText: {
        fontWeight: "bold",
        color: "#6a0dad",
      },
      rangeText: {
        color: "#333",
        fontWeight: "bold",
      },
});