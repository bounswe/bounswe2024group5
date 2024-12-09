import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const MyQuizzesView = ({ createdQuizzes, onDelete, navigation }) => {

    return (
        <View style={styles.quizSection}>
            {createdQuizzes && createdQuizzes.length > 0 ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.quizScroll}
                    contentContainerStyle={styles.quizScrollContent}
                >
                    {createdQuizzes.map((quiz) => (
                        <View key={quiz.id} style={styles.card}>
                            <Text style={styles.itemTitle}>{quiz.title}</Text>
                            <Text style={styles.itemDetail}>{quiz.questions.length} Questions</Text>
                            {/* TODO: Convert the following ELO to CEFR */}
                            <Text style={styles.itemDetail}>ELO: {quiz.difficulty}</Text>

                            {/* Favorites and Delete Container */}
                            <View style={styles.cardFooter}>
                                <Text style={styles.itemDetail}>
                                    <AntDesignIcon name="like2" size={12} color="#e13528" /> {quiz.noFavorites}
                                </Text>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => onDelete(quiz.id)}
                                >
                                    <Text style={styles.deletebuttonText}>
                                        <AntDesignIcon name="delete" size={12} />
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noDataText}>
                    You haven't created any quizzes yet.
                </Text>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    quizSection: {
        // height: 180,
    },
    quizScroll: {
        paddingVertical: 8,
    },
    quizScrollContent: {
        // paddingHorizontal: 12,
        marginLeft: 4,
    },
    noDataText: {
        textAlign: "center",
        marginTop: 20,
        color: "gray",
        fontSize: 14,
        marginVertical: 20,
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
    cardFooter: {
        flexDirection: "row", // Align children in a row
        justifyContent: "space-between", // Space out favorites and delete button
        alignItems: "center", // Center them vertically
    },
    deleteButton: {
        backgroundColor: "#ede9fe",
        padding: 6, // Adjust padding for a smaller size
        borderRadius: 24,
        borderWidth: 0.5,
        borderColor: "#ccc",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    deletebuttonText: {
        color: "#e13528",
        textAlign: "center",
    },
});

export default MyQuizzesView;