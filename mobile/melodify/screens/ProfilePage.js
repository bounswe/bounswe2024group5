import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.platformName}>Melodify</Text>
        <View style={styles.profileInfoContainer}>
          <Image
            source={require('../assets/profile_pic.png')}
            style={styles.profileImage}
          />
          {/* Followers and Following */}
          <View style={styles.followContainer}>
            <Text style={styles.followerNumber}>10K</Text>
            <Text style={styles.followerText}>folowers</Text>
            <Text style={styles.followingNumber}>50</Text>
            <Text style={styles.followingText}>following</Text>
          </View>
        </View>
        
        <View style={styles.nameContainer}>
          {/* Name and Username */}
          <View style={styles.names}>
            <Text style={styles.name}>Melody Max</Text>
            <Text style={styles.username}>@melodymelinda</Text>
            <Text style={styles.online}>online</Text>
          </View>
          {/* Currently Listening */}
          <View style={styles.currentlyListeningContainer}>
            <Text style={styles.listening}>Listening now</Text>
            <Text style={styles.songname}>Song Name - Artist</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <View style={styles.buttonContainer1}>
            {/* Edit Profile Button */}
            <TouchableOpacity onPress={() => console.log("Edit profile button pressed")} style={styles.editprofileButton}>
              <Text style={styles.editprofileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer2}>
            {/* New Post Button */}
            <TouchableOpacity onPress={() => console.log("New post button pressed")} style={styles.newpostButton}>
              <Text style={styles.newpostButtonText}>+ Share a Post</Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator}></View>
      {/* Latest Activity */}
      <Text style={styles.activityTitle}>Last Activities</Text>
      {/* Posts */}
      {/* Render user's posts here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#01112C', // Dark blue background color
  },
  topSection: {
    marginBottom: 20,
  },
  platformName: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // White text color
  },
  profileInfoContainer: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'top', // Align children vertically
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  followContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
    justifyContent: 'flex-end',
    flex: 1, // Take remaining space
  },
  followerNumber: { 
    color: '#ffffff', // White text color
    fontWeight: 'bold',

  },
  followerText: {
    color: '#ffffff', // White text color
    marginLeft: 5,

  },
  followingNumber: {
    color: '#ffffff', // White text color
    fontWeight: 'bold',
    marginLeft: 20,
  },
  followingText: {
    color: '#ffffff', // White text color
    marginLeft: 5,
  },
  nameContainer: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'top', // Align children vertically
    marginBottom: 10,
  },
  names: {
    flex: 1, // Take remaining space
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff', // White text color
  },
  username: {
    fontSize: 12,
    marginBottom: 5,
    color: '#C1C1C2', // light gray text color
  },
  online: {
    color: '#00C600', // Green text color
  },
  currentlyListeningContainer: {
    marginBottom: 10,
    marginRight: 20,
    alignItems: 'right',
  },
  listening: {
    color: '#C1C1C2', // light gray text color
  },
  songname: {
    color: '#ffffff', // White text color
  },
  buttons:{
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'top', // Align children vertically
    marginBottom: 10,
  },
  buttonContainer1: {
    // borderColor: 'black',
    borderRadius: 20,
    padding: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#90B7FA', // Light blue background color
  },
  editprofileButton: {
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  editprofileButtonText: {
    fontSize: 12, // Adjust font size here
    color: '#000000',
  },
  buttonContainer2: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    flex: 1, // Take remaining space

    // borderColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
    padding: 5,
    marginLeft: 50,
    backgroundColor: '#B9D1F9', // Light blue background color
  },
  newpostButton: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  newpostButtonText: {
    fontSize: 20, // Adjust font size here
    fontWeight: 'bold',
    color: '#01112C',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#888888', // Light gray border color
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // White text color
  },
});

export default ProfilePage;
