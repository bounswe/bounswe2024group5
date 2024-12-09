import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const MyPostsView = ({ myPosts, navigation }) => {
    return (
        <View style={styles.section}>
            {myPosts && myPosts.length > 0 ? (
                myPosts.map((post) => (
                    <TouchableOpacity
                        key={post.id}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("QuestionDetail", {
                                questionId: post.id,
                            })
                        }
                    >
                        <Text style={styles.itemTitle}>{post.title}</Text>
                        <View style={styles.forumDetailLine}>
                            <Text style={styles.forumDetail}>{post.createdAt}</Text>
                            <View style={styles.forumStats}>
                                <Text style={styles.forumDetail}>
                                    <AntDesignIcon name="like2" size={12} color="#e13528" /> {post.noUpvote} |{" "}
                                </Text>
                                <Text style={styles.forumDetail}>
                                    <AntDesignIcon name="message1" size={12} color="#4c1d95" /> {post.noReplies}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.noDataText}>No posts available.</Text>
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
    forumDetailLine: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    forumDetail: {
        fontSize: 12,
        color: "#666",
        textAlign: "left",
    },
    forumStats: {
        flexDirection: "row",
    },
});

export default MyPostsView;  