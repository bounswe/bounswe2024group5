


import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const MyQuizAttemptsView = ({ quizHistory, navigation }) => {
    return (
        <View style={styles.section}>
            {quizHistory && quizHistory.length > 0 ? (
                quizHistory.map((quiz) => (
                    <View key={quiz.id} style={styles.card}>
                        <Text style={styles.itemTitle}>{quiz.title}</Text>
                        <Text style={styles.itemDetail}>{quiz.completedAt}</Text>
                        <Text style={styles.itemDetail}>
                            <FontAwesomeIcon name="star-o" size={12} color="#4c1d95" /> {quiz.score} points gained
                        </Text>
                        <Text style={styles.itemDetail}>
                            {quiz.status}
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No quiz history available.</Text>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "600",
        color: "#2e1065",
        marginBottom: 15,
        textAlign: "left",
    },
    noDataText: {
        textAlign: "center",
        marginTop: 20,
        color: "gray",
        fontSize: 14,
        marginVertical: 20,
    },
    section: {
        marginBottom: 30,
        width: "100%",
    },
    card: {
        backgroundColor: "#ede9fe",
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderColor: "#4c1d95",
        borderWidth: 0.5,
        marginHorizontal: 4,
    },
    itemTitle: {
        fontSize: 16,
        color: "#4c1d95",
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "left",
    },
    itemDetail: {
        fontSize: 12,
        color: "#666",
        textAlign: "left",
    },
});

export default MyQuizAttemptsView;  