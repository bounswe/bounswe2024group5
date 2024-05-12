import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface PostData {
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

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <View style={styles.postContainer}>
            <Image
                source={require("../assets/profile_pic.png")}
                // source={{ uri: postData.pp }}
                // uri={{postData.pp }}
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
                    <FontAwesome name="comment-o" size={18} color="#777" />
                    <FontAwesome name="share-alt" size={16} color="#777" />
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
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default Post;
