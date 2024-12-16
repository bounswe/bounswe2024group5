import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import QuizHeader from "../components/QuizSolveQuizHeader";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";
import { Post, Reply } from "../types/forum";
import { Ionicons } from "@expo/vector-icons";
import { Question } from "../database/types";

// Add missing type for route params
interface RouteParams {
  quiz: {
    id: number;
    title: string;
  };
  questions: Question[];
}

interface PostPreviewProps {
  post: Post;
  onPress: () => void;
}

interface SelectedPostViewProps {
  post: Post;
  replies: Reply[];
  onBack: () => void;
}

// 1. Move these components outside of the main component
const PostPreview = React.memo<PostPreviewProps>(({ post, onPress }) => (
  <TouchableOpacity style={styles.postPreview} onPress={onPress}>
    <Text style={styles.postTitle}>{post.title}</Text>
    <Text style={styles.postContent}>{post.content}</Text>
    <Text style={styles.postMeta}>
      {post.username} • {new Date(post.createdAt).toLocaleDateString()}
    </Text>
  </TouchableOpacity>
));

const SelectedPostView = React.memo<SelectedPostViewProps>(
  ({ post, replies, onBack }) => (
    <ScrollView style={styles.postsList} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#6d28d9" />
        <Text style={styles.backButtonText}>Back to posts</Text>
      </TouchableOpacity>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
        <Text style={styles.postMeta}>
          Posted by {post.username} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
        <View style={styles.repliesSection}>
          <Text style={styles.repliesTitle}>Replies</Text>
          {replies.map((reply) => (
            <View key={reply.id} style={styles.replyContainer}>
              <Text style={styles.replyContent}>{reply.content}</Text>
              <Text style={styles.replyMeta}>
                {reply.username} •{" "}
                {new Date(reply.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
);

const ForumModal = React.memo<{
  visible: boolean;
  onClose: () => void;
  word: string;
  isLoadingPosts: boolean;
  selectedPost: Post | null;
  relatedPosts: Post[];
  postReplies: Reply[];
  onPostSelect: (post: Post) => void;
  onBackToList: () => void;
}>(
  ({
    visible,
    onClose,
    word,
    isLoadingPosts,
    selectedPost,
    relatedPosts,
    postReplies,
    onPostSelect,
    onBackToList,
  }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.relatedPostModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.relatedPostModalTitle}>
              Posts about '{word}'
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#1a1a1a" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            {isLoadingPosts ? (
              <ActivityIndicator size="large" color="#6d28d9" />
            ) : selectedPost ? (
              <SelectedPostView
                post={selectedPost}
                replies={postReplies}
                onBack={onBackToList}
              />
            ) : (
              <FlatList
                data={relatedPosts}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={
                  <View style={styles.noPostsContainer}>
                    <Ionicons
                      name="chatbox-outline"
                      size={40}
                      color="#6c757d"
                    />
                    <Text style={styles.noPostsText}>
                      No related posts found for '{word}'
                    </Text>
                  </View>
                }
                renderItem={({ item: post }) => (
                  <PostPreview post={post} onPress={() => onPostSelect(post)} />
                )}
                keyExtractor={(post) => post.id.toString()}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
);

const QuizSolvingScreen = ({ route, navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  // const { quiz } = route.params; // Access the passed data
  const { quiz, questions } = route.params as RouteParams; // Access the passed data
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(
    questions.map(() => false)
  );
  const question = questions[questionIndex];
  // const [question, setQuestion] = useState<Question | null>(null);
  const [quizAttemptId, setQuizAttemptId] = useState(null);
  const [previousAnswers, setPreviousAnswers] = useState({});
  const authContext = useAuth(); // Get the authentication context
  //   const [selectedAnswers, setSelectedAnswers] = useState(
  //     Array(questions.length).fill(null)
  //   );
  const [alreadyFinished, setAlreadyFinished] = useState(false);
  const token = authContext ? authContext.token : null;
  const [forumModalVisible, setForumModalVisible] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postReplies, setPostReplies] = useState<Reply[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hintImages, setHintImages] = useState<string[]>([]);
  const [isHintModalVisible, setIsHintModalVisible] = useState(false);
  const [isLoadingHintImages, setIsLoadingHintImages] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // New state variables for modals
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  // Add new state
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [favoriteModalMessage, setFavoriteModalMessage] = useState("");

  const initializeQuiz = async () => {
    console.log("### Initializing quiz:", quiz.id);
    try {
      // Get or create quiz attempt
      const attemptResponse = await fetch(`${hostUrl}/api/quiz-attempts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId: quiz.id }),
      });

      if (!attemptResponse.ok) {
        throw new Error("Failed to create/get quiz attempt");
      }
      const attemptData = await attemptResponse.json();
      setQuizAttemptId(attemptData.id);

      // Fetch quiz details with questions
      const quizResponse = await fetch(`${hostUrl}/api/quizzes/${quiz.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!quizResponse.ok) {
        throw new Error("Failed to fetch quiz details");
      }

      const quizData = await quizResponse.json();
      const questions = quizData.quiz.questions;

      setIsQuestionAnswered(new Array(questions.length).fill(false));
      setSelectedAnswers(new Array(questions.length).fill(null));

      // Fetch previous answers
      const answersResponse = await fetch(
        `${hostUrl}/api/question-answers?quizAttemptId=${attemptData.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (answersResponse.ok) {
        const answersData = await answersResponse.json();

        // Map previous answers
        const answersMap = {};
        answersData.forEach((answer) => {
          answersMap[answer.questionId] = answer.answer;
        });
        setPreviousAnswers(answersMap);

        // Update selectedAnswers and isQuestionAnswered
        const updatedSelectedAnswers = questions.map(
          (q) => answersMap[q.id] || null
        );
        const updatedIsQuestionAnswered = questions.map(
          (q) => answersMap[q.id] !== undefined
        );

        setSelectedAnswers(updatedSelectedAnswers);
        setIsQuestionAnswered(updatedIsQuestionAnswered);
      }
    } catch (error) {
      console.error("Error initializing quiz:", error);
      Alert.alert("Error", "Failed to load quiz. Please try again later.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  useEffect(() => {
    console.log(`### QuizSolvingScreen: quiz ID: ${quiz.id}`);
    initializeQuiz();
  }, [quiz.id, hostUrl, token]);

  const fetchHintImages = useCallback(
    async (word: string) => {
      setIsLoadingHintImages(true);
      try {
        const response = await fetch(
          `${hostUrl}/api/hint?word=${encodeURIComponent(word)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const images = await response.json();
          setHintImages(images);
        } else {
          Alert.alert("Error", "Failed to fetch hint images");
        }
      } catch (error) {
        console.error("Error fetching hint images:", error);
        Alert.alert("Error", "Failed to load hint images");
      } finally {
        setIsLoadingHintImages(false);
        setIsHintModalVisible(true);
      }
    },
    [hostUrl, token]
  );

  const handleAnswer = async (answer) => {
    if (alreadyFinished) return;
    if (isQuestionAnswered[questionIndex]) return;

    try {
      // First, create the question answer
      const response = await fetch(`${hostUrl}/api/question-answers`, {
        method: "POST", // Changed from PUT to POST
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizAttemptId,
          questionId: questions[questionIndex].id,
          answer: answer,
        }),
      });

      if (!response.ok) {
        console.log(`Response status: ${response.status}`);
        const errorText = await response.text();
        console.log(`Error response: ${errorText}`);
        throw new Error("Failed to submit answer");
      }

      const updatedIsQuestionAnswered = [...isQuestionAnswered];
      updatedIsQuestionAnswered[questionIndex] = true;
      setIsQuestionAnswered(updatedIsQuestionAnswered);

      const updatedSelectedAnswers = [...selectedAnswers];
      updatedSelectedAnswers[questionIndex] = answer;
      setSelectedAnswers(updatedSelectedAnswers);
    } catch (error) {
      console.error("Error submitting answer:", error);
      Alert.alert("Error", "Failed to submit answer. Please try again.");
    }
  };

  const handlePrevious = () => {
    console.log("handling previous");
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      console.log(`Is answered? ${isQuestionAnswered}`);
    } else {
      // Replace Alert with Modal
      setShowStartModal(true);
    }
  };

  const handleNext = () => {
    console.log("handling next");
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      console.log(`Is answered? ${isQuestionAnswered}`);
    } else {
      // Replace Alert with Modal
      setShowEndModal(true);
    }
  };

  const handleFinish = async () => {
    if (alreadyFinished) {
      navigation.navigate("QuizFinish", {
        quiz,
        questions,
        selectedAnswers,
        alreadyFinished,
      });
      return;
    }
    setAlreadyFinished(true);

    try {
      const response = await fetch(
        `${hostUrl}/api/quiz-attempts/${quizAttemptId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete quiz");
      }

      navigation.navigate("QuizFinish", {
        quiz,
        questions,
        selectedAnswers,
        alreadyFinished,
      });
    } catch (error) {
      console.error("Error completing quiz:", error);
      Alert.alert("Error", "Failed to complete quiz. Please try again.");
    }
  };

  const handleCancel = async () => {
    // TODO: Add putting the question-answers for this quiz attempt to the backend.
    navigation.goBack();
  };
  const generateQuestionSentence = (question): string => {
    // const generateQuestionSentence = (question_type: 'english_to_turkish' | 'turkish_to_english' | 'english_to_sense', word: string): string => {
    console.log("Question: ", question.questionType, question.word);
    if (question.questionType === "english_to_turkish") {
      return `How do you say '${question.word}' in Turkish?`;
    } else if (question.questionType === "turkish_to_english") {
      return `How do you say '${question.word}' in English?`;
    } else if (question.questionType === "english_to_sense") {
      return `What is the meaning of '${question.word}'?`;
    } else {
      return "Invalid question type";
    }
  };

  // Move the answers array creation and shuffling into useMemo
  const shuffledAnswers = useMemo(() => {
    const answers = [...question.wrongAnswers, question.correctAnswer];
    return answers.sort(() => Math.random() - 0.5);
  }, [question]); // Only re-shuffle when question changes

  const fetchRelatedPosts = useCallback(
    async (word: string) => {
      setIsLoadingPosts(true);
      try {
        const response = await fetch(
          `${hostUrl}/api/posts?tag=${encodeURIComponent(word)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRelatedPosts(data);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
        Alert.alert("Error", "Failed to load related posts");
      } finally {
        setIsLoadingPosts(false);
      }
    },
    [hostUrl, token]
  );

  const fetchPostReplies = async (postId: number) => {
    try {
      const response = await fetch(`${hostUrl}/api/posts/${postId}/replies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPostReplies(data);
      }
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  // Update addToFavorites function
  const addToFavorites = async () => {
    const questionId = questions[questionIndex].id;

    try {
      const response = await fetch(`${hostUrl}/api/favorite-question`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId }),
      });

      if (response.status === 201 || response.status === 400) {
        setIsFavorited(true);
        setFavoriteModalMessage(
          response.status === 201
            ? "Question added to favorites."
            : "This question is already in your favorites."
        );
      } else {
        setFavoriteModalMessage("Failed to add question to favorites.");
      }
      setShowFavoriteModal(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      setFavoriteModalMessage("Failed to add question to favorites.");
      setShowFavoriteModal(true);
    }
  };

  const checkFavoriteStatus = async (questionId: number) => {
    try {
      const response = await fetch(
        `${hostUrl}/api/favorite-question/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFavorited(response.status === 200);
    } catch (error) {
      console.error("Error checking favorite status:", error);
      setIsFavorited(false);
    }
  };

  // Add useEffect to check favorite status when question changes
  useEffect(() => {
    if (question) {
      checkFavoriteStatus(question.id);
    }
  }, [questionIndex, question]);
  return (
    <View style={styles.container}>
      <QuizHeader
        quizName={quiz.title}
        questionIndex={questionIndex}
        totalQuestions={questions.length}
        onFavorite={addToFavorites}
        isFavorited={isFavorited}
      />

      <View style={styles.roundQuestionContainer}>
        <Text style={styles.questionText}>
          {generateQuestionSentence(question)}
        </Text>
        {shuffledAnswers.map((answer, index) => {
          let backgroundColor;
          if (!isQuestionAnswered[questionIndex]) {
            backgroundColor = "#ddd6fe";
          } else {
            if (answer === question.correctAnswer) {
              backgroundColor = "green";
            } else if (answer === selectedAnswers[questionIndex]) {
              backgroundColor = "red";
            } else {
              backgroundColor = "#ddd6fe";
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.button, { backgroundColor }]}
              onPress={() => handleAnswer(answer)}
            >
              <Text style={styles.buttonText}>{answer}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Container for Next and Previous Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handlePrevious}>
          {/* Replace text with left-pointing arrow icon */}
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          {/* Replace text with right-pointing arrow icon */}
          <Ionicons name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Cancel and Submit Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {questionIndex === questions.length - 1 && (
          <TouchableOpacity style={styles.submitButton} onPress={handleFinish}>
            <Text style={styles.submitButtonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Container for Hint and Related Posts Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.hintButton}
          onPress={() => fetchHintImages(question.word)}
        >
          <Ionicons name="help-circle-outline" size={20} color="#6a0dad" />
          <Text style={styles.hintButtonText}>Hint</Text>
        </TouchableOpacity>
        
        {/* Hint Images Modal */}
        <Modal
          visible={isHintModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsHintModalVisible(false)}
        >
          <View style={styles.hintModalContainer}>
            <View style={styles.hintModalContent}>
              <View style={styles.hintModalHeader}>
                <Text style={styles.hintModalTitle}>
                  Hints for '{question.word}'
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsHintModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#1a1a1a" />
                </TouchableOpacity>
              </View>
              <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>
                  These images are here to help, not to solve the quiz for you.
                  Sometimes they nail it, and other times... well, they might
                  just confuse you. Don't blame us if the hint feels more like a
                  plot twist—trust your brain and keep going! You've got this!
                </Text>
              </View>

              <View style={styles.hintModalBody}>
                {isLoadingHintImages ? (
                  <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color="#6a0dad" />
                    <Text style={styles.loadingText}>Loading hints...</Text>
                  </View>
                ) : hintImages.length === 0 ? (
                  <View style={styles.centerContent}>
                    <Ionicons name="images-outline" size={40} color="#6c757d" />
                    <Text style={styles.noHintText}>
                      No hint images found for '{question.word}'
                    </Text>
                  </View>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.hintImagesContainer}
                  >
                    {hintImages.map((imageUrl, index) => (
                      <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={styles.hintImage}
                        resizeMode="contain"
                      />
                    ))}
                  </ScrollView>
                )}
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.forumButton}
          onPress={() => {
            fetchRelatedPosts(question.word);
            setForumModalVisible(true);
          }}
        >
          <Ionicons name="chatbox-outline" size={20} color="#6a0dad" />
          <Text style={styles.forumButtonText}>See Related Posts</Text>
        </TouchableOpacity>
      </View>
      <ForumModal
        visible={forumModalVisible}
        onClose={() => {
          setForumModalVisible(false);
          setSelectedPost(null);
        }}
        word={question.word}
        isLoadingPosts={isLoadingPosts}
        selectedPost={selectedPost}
        relatedPosts={relatedPosts}
        postReplies={postReplies}
        onPostSelect={(post) => {
          setSelectedPost(post);
          fetchPostReplies(post.id);
        }}
        onBackToList={() => setSelectedPost(null)}
      />

      {/* Start of Quiz Modal */}
      <Modal
        visible={showStartModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowStartModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="information-circle" size={50} color="#059669" />
            <Text style={styles.modalTitle}>First Question</Text>
            <Text style={styles.modalText}>
              You're at the beginning of the quiz. Can't go back any further!
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.continueButton]}
                onPress={() => setShowStartModal(false)}
              >
                <Text
                  style={[styles.modalButtonText, styles.continueButtonText]}
                >
                  Got it
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* End of Quiz Modal */}
      <Modal
        visible={showEndModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEndModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="information-circle" size={50} color="#059669" />
            <Text style={styles.modalTitle}>Last Question</Text>
            <Text style={styles.modalText}>
              This is the final question. Press 'Finish' when you're ready to
              submit your answers.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.continueButton]}
                onPress={() => setShowEndModal(false)}
              >
                <Text
                  style={[styles.modalButtonText, styles.continueButtonText]}
                >
                  Got it
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add modal component in return statement */}
      <Modal
        visible={showFavoriteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFavoriteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="heart" size={50} color="#059669" />
            <Text style={styles.modalTitle}>Favorites</Text>
            <Text style={styles.modalText}>{favoriteModalMessage}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.continueButton]}
                onPress={() => setShowFavoriteModal(false)}
              >
                <Text
                  style={[styles.modalButtonText, styles.continueButtonText]}
                >
                  Got it
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF", // Set the background color
  },
  roundQuestionContainer: {
    backgroundColor: "#f5f3ff", // Light grey background color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10, // Rounded corners
    opacity: 0.9, // Slight opacity
    marginTop: 40,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderColor: "#8b5c56", // Dark outline
    borderWidth: 1,
    borderRadius: 20, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000", // Text color
    fontSize: 16,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 60, // Adjust for smaller button size
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  cancelButton: {
    backgroundColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#6d28d9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forumButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#6d28d9",
  },
  forumButtonText: {
    color: "#6d28d9",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  relatedPostModalContent: {
    backgroundColor: "#f0eff7",   //#f0eff7
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "100%",
    height: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    marginBottom: 15,
  },
  relatedPostModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "left",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginVertical: 10,
    textAlign: "center",
  },
  modalBody: {
    flex: 1,
    width: "100%",
  },
  flatListContent: {
    paddingVertical: 10,
    paddingBottom: 20, 
  },
  postsList: {
    flex: 1,
  },
  postPreview: {
    minHeight: "25%",
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  postMeta: {
    fontSize: 14,
    color: "#6c757d",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: "#6d28d9",
    marginLeft: 8,
  },
  postContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  repliesSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  repliesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  replyContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  replyContent: {
    fontSize: 15,
    color: "#4a4a4a",
    marginBottom: 6,
  },
  replyMeta: {
    fontSize: 13,
    color: "#6c757d",
  },
  postContent: {
    fontSize: 16,
    color: "#4a4a4a",
    lineHeight: 22,
    marginBottom: 12,
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noPostsText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  closeButton: {
    padding: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  hintModalBody: {
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6a0dad",
  },
  hintModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  hintModalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    height: "70%", // Fixed height
  },
  hintImagesContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  hintImage: {
    width: 280,
    height: 280,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0", // Debug background
  },
  hintButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#6a0dad",
  },
  hintButtonText: {
    color: "#6a0dad",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  hintModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  hintModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  disclaimerContainer: {
    backgroundColor: "#fff3cd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  disclaimerText: {
    fontSize: 14,
    color: "#856404",
    textAlign: "center",
    lineHeight: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 20,
  },
  quizInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  questionCount: {
    fontSize: 16,
    color: "#666",
  },
  heartContainer: {
    backgroundColor: "#f5f3ff",
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  heartButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heartButtonText: {
    color: "#6a0dad",
    fontSize: 16,
    marginRight: 8,
  },
  heartIcon: {
    marginLeft: 4,
  },

  noHintText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 10,
  },

  // New styles for Info Modals
  infoModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoModalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoModalIcon: {
    marginBottom: 15,
  },
  infoModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginVertical: 10,
    textAlign: "center",
  },
  infoModalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  infoModalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  infoModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
    backgroundColor: "#059669",
    marginHorizontal: 10,
  },
  infoModalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
    marginHorizontal: 10,
  },
  continueButton: {
    backgroundColor: "#059669",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  continueButtonText: {
    color: "white",
  },
});
export default QuizSolvingScreen;
