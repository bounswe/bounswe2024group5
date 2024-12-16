// OtherUserProfileScreen.tsx
import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import BaseLayout from "./BaseLayout";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";
import MyQuizzesView from "../components/MyQuizzesView";
import MyPostsView from "../components/MyPostsView";
import { calculateQuizDifficultyFromElo } from "../components/EloCefrInfoTable";

interface OtherUserProfileScreenProps {
    route: {
        params: {
            username: string;
        };
    };
    navigation: any;
}

const OtherUserProfileScreen: React.FC<OtherUserProfileScreenProps> = ({ route, navigation }) => {
    // Extract username from route params
    const { username: viewedUsername } = route.params;

    // Context and auth
    const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
    const authContext = useAuth();
    const token = authContext ? authContext.token : null;

    // State variables
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [createdQuizzes, setCreatedQuizzes] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [showMyQuizzes, setShowMyQuizzes] = useState(true);
    const [showMyPosts, setShowMyPosts] = useState(true);

    // Fetch user profile
    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${hostUrl}/api/profile/${viewedUsername}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            Alert.alert("Error", "Could not load user profile");
        } finally {
            setLoading(false);
        }
    };

    // Fetch user's quizzes
    const fetchUserQuizzes = async () => {
        try {
            const response = await fetch(
                `${hostUrl}/api/quizzes?username=${viewedUsername}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch quizzes");
            }

            const data = await response.json();
            const processedQuizzes = data.quizzes.map((quiz) => ({
                ...quiz,
                elo: quiz.difficulty,
                difficulty: calculateQuizDifficultyFromElo(quiz.difficulty),
            }));

            setCreatedQuizzes(processedQuizzes);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    // Fetch user's posts
    const fetchUserPosts = async () => {
        try {
            const response = await fetch(
                `${hostUrl}/api/posts?username=${viewedUsername}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const myPosts = await response.json();
            const processedPosts = myPosts.map((post) => ({
                id: post.id,
                title: post.title,
                createdAt: new Date(post.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                }),
                noReplies: post.noReplies,
                noUpvote: post.noUpvote,
            }));

            setPosts(processedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Fetch all data when component mounts or username changes
    useEffect(() => {
        const fetchAllData = async () => {
            await fetchUserProfile();
            await fetchUserQuizzes();
            await fetchUserPosts();
        };

        fetchAllData();
    }, [viewedUsername]);

    // Toggle section visibility
    const handleMyQuizzes = () => {
        setShowMyQuizzes(!showMyQuizzes);
    };

    const handleMyPosts = () => {
        setShowMyPosts(!showMyPosts);
    };

    // Loading state
    if (loading) {
        return (
            <BaseLayout navigation={navigation}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6d28d9" />
                    <Text>Loading...</Text>
                </View>
            </BaseLayout>
        );
    }

    // Error state
    if (!userProfile) {
        return (
            <BaseLayout navigation={navigation}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load profile data.</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchUserProfile}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </BaseLayout>
        );
    }

    // Destructure user profile data
    const {
        name,
        score,
        profilePicture,
        englishProficiency,
    } = userProfile;

    return (
        <BaseLayout navigation={navigation}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <Image
                        source={{
                            uri: profilePicture || "https://via.placeholder.com/120",
                        }}
                        style={styles.profileImage}
                    />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.subheading}>
                            <AntDesignIcon name="user" size={16} color="gray" /> @{viewedUsername}
                        </Text>

                        <View style={styles.statistics}>
                            <Text style={styles.score}>
                                <Ionicons name="trophy-outline" size={16} color="#fbbf24" />{" "}
                                {score} Points
                            </Text>
                            <View style={styles.englishProficiency}>
                                <Text style={styles.proficiencyText}>
                                    Level: {englishProficiency}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* My Quizzes Section */}
                <Pressable
                    style={styles.sectionButton}
                    onPress={handleMyQuizzes}
                >
                    <Text style={styles.sectionTitle}>Quizzes</Text>
                    {showMyQuizzes ? (
                        <MyQuizzesView
                            createdQuizzes={createdQuizzes}
                            onDelete={null}
                            navigation={navigation}
                            deleteFunctionality={false}
                        // Remove onDelete prop as we don't want to allow deletion
                        />
                    ) : null}
                </Pressable>

                {/* My Posts Section */}
                <View>
                    <Pressable
                        style={styles.sectionButton}
                        onPress={handleMyPosts}
                    >
                        <Text style={styles.sectionTitle}>Posts</Text>
                        {showMyPosts ? (
                            <MyPostsView
                                myPosts={posts}
                                navigation={navigation}
                            />
                        ) : null}
                    </Pressable>
                </View>
            </ScrollView>
        </BaseLayout>
    );
};


const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
        // backgroundColor:"#ede9fe",
        borderRadius: 12,
    },
    headerInfo: {
        marginLeft: 15,
        flex: 1,
        marginTop: 5,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 60,
        backgroundColor: "#ddd",
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2e1065",
        textAlign: "left",
    },
    subheading: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
        textAlign: "left",
    },
    statistics: {
        flexDirection: "row",
        justifyContent: "space-between", // Ensures left and right alignment
        alignItems: "center",
        // marginHorizontal: 20,
    },
    score: {
        fontSize: 14,
        color: "#2e1065",
        fontWeight: "bold",
        textAlign: "left",
        marginRight: 20,
    },
    englishProficiency: {
        marginLeft: 30,
        paddingHorizontal: 10, // Add padding inside the box
        borderRadius: 12,
        backgroundColor: "#fef3c7",
        justifyContent: "center", // Centers text vertically
        alignItems: "center", // Centers text horizontally
    },
    proficiencyText: {
        fontSize: 14,
        color: "#2e1065",
        fontWeight: "bold",
    },
    sectionButton: {
        backgroundColor: "#f5f3ff",
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#2e1065",
        marginBottom: 15,
        textAlign: "left",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 18,
        color: "#ff0000",
        marginBottom: 20,
        textAlign: "center",
    },
    retryButton: {
        backgroundColor: "#6d28d9",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default OtherUserProfileScreen;