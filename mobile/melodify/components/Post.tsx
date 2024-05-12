import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface PostData {
    id: string; // Unique ID for the post
    pp: string; // Profile picture URL
    username: string; // Username of the poster
    when: string; // Description of when the post was made
    textBody: string; // Main text content of the post
    imageURL?: string; // Optional image URL for the post
}

interface PostProps {
    postData: PostData;
}

const Post: React.FC<PostProps> = ({ postData }) => {
    const [liked, setLiked] = useState(false);
    // const navigation = useNavigation();
    const [likeCount, setLikeCount] = useState(0); // State to keep track of like count

    const toggleLike = () => {
        setLiked(!liked);
        // Increment or decrement like count based on the current state of liked
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    };

    // const handleCommentPress = () => {
    //     // Navigate to the comment screen with necessary data
    //     navigation.navigate('CommentScreen', { postId: postData.id });
    // };

    return (
        <View style={styles.postContainer}>
            <Image
                source={require("../assets/profile_pic.png")}
                // source={{ uri: postData.pp }}
                style={styles.profilePic}
                onLoad={() => console.log('Profile picture loaded')}
                onError={(error) => console.error('Error loading profile picture:', error)}
            />
            <View style={styles.postContent}>
                <Text style={styles.username}>
                    {postData.username} <Text style={styles.when}>- {postData.when}</Text>
                </Text>
                <Text style={styles.textBody}>{postData.textBody}</Text>
                {postData.imageURL && (
                    <Image 
                        source={require("../assets/content.jpg")} 
                        // source={{uri: postData.imageURL }} 
                        style={styles.postImage} 
                    />
                )}
                <View style={styles.iconRow}>
                    <TouchableOpacity onPress={toggleLike}>
                        {liked ? (
                            <FontAwesome name="heart" size={18} color="#ff0000" />
                        ) : (
                            <FontAwesome name="heart-o" size={18} color="#777" />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.likeCount}>{likeCount}</Text>

                    {/* <TouchableOpacity onPress={handleCommentPress}>
                        <FontAwesome name="comment-o" size={18} color="#777" />
                    </TouchableOpacity> */}
                    <FontAwesome name="comment-o" size={18} color="#777" style={styles.comment} />
                    <FontAwesome name="share-alt" size={16} color="#777" style={styles.share} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row',
        backgroundColor: '#111927',
        borderWidth: 1,
        borderColor: '#777',
        padding: 10,
        alignItems: 'flex-start',
    },
    profilePic: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    postContent: {
        paddingLeft: 10,
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        color: 'white',
    },
    when: {
        fontWeight: 'normal',
        color: '#aaa',
    },
    textBody: {
        color: 'white',
    },
    postImage: {
        borderRadius: 10,
        marginTop: 10,
        height: 180,
        width: 250,
    },
    iconRow: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center', // Align items vertically
        justifyContent: 'flex-start', // Align items from the start
        width: '100%',
    },
    likeCount: {
        color: 'white',
        marginLeft: 5,
    },
    comment: {
        marginLeft: 80,
    },
    share: {
        marginLeft: 80,
    }
});

export default Post;
