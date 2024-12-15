import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";
import BaseLayout from "./BaseLayout";

const FollowListScreen = ({ route, navigation }) => {
  const { username, type } = route.params; // type will be either 'followers' or 'following'
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const { token } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${hostUrl}/api/profile/${username}/${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate('Profile', { username: item.username })}
    >
      <Image
        source={{ uri: item.profilePicture || 'https://via.placeholder.com/50' }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.username}>@{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#6d28d9" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6d28d9" />
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {type.charAt(0).toUpperCase() + type.slice(1)} ({users.length})
          </Text>
        </View>

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.username}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3e8ff',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e1065',
  },
  listContainer: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4c1d95',
  },
  name: {
    fontSize: 14,
    color: '#666',
  },
});

export default FollowListScreen;