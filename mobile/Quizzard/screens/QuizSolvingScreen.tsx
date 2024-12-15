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

// types from the database/types.ts file:
// type Question = {
//   id: number;
//   quizId: number;
//   word: string;
//   questionType: QuestionType;
//   options: string[];
//   correctAnswer: string;      // 'A', 'B', 'C' or 'D'
//   wrongAnswers: string[];
//   difficulty: number;         // elo
// }

// type QuestionType =
//   | "english_to_turkish"
//   | "turkish_to_english"
//   | "english_to_sense";

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
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Posts about <Text style={styles.boldText}>'{word}'</Text>
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
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
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
      Alert.alert(
        "Start of the Quiz:",
        "This is the first question of the quiz."
      );
    }
  };

  const handleNext = () => {
    console.log("handling next");
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      console.log(`Is answered? ${isQuestionAnswered}`);
    } else {
      Alert.alert("End of the Quiz:", "This is the last question of the quiz.");
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

      if (response.status === 201) {
      } else if (response.status === 400) {
        Alert.alert("Info", "This question is already in your favorites.");
      } else if (response.status === 404) {
        Alert.alert("Error", "Question not found.");
      } else {
        Alert.alert("Error", "Failed to add question to favorites.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      Alert.alert("Error", "Failed to add question to favorites.");
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <QuizHeader
        quizName={quiz.title}
        questionIndex={questionIndex}
        totalQuestions={questions.length}
      />
      <View style={styles.heartContainer}>
        <TouchableOpacity
          onPress={() => {
            addToFavorites();
            console.log("Favorite clicked");
          }}
        >
          <View style={styles.heartButtonContent}>
            <Text style={styles.heartButtonText}>
              Add To Favorite Questions
            </Text>
            <Ionicons
              name="heart-outline"
              size={24}
              color="#6a0dad"
              style={styles.heartIcon}
            />
          </View>
        </TouchableOpacity>
      </View>

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

      {/* Container for Next Button */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handlePrevious}>
          {/* Replace text with right-pointing arrow icon */}
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
    justifyContent: "flex-end", // Makes modal slide from bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%", // Takes up 80% of screen height
    width: "100%",
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
  modalTitle: {
    fontSize: 20,
    color: "#1a1a1a",
  },
  boldText: {
    fontWeight: "bold",
  },
  modalBody: {
    flex: 1,
    width: "100%",
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20, // Add padding at the bottom
  },
  postsList: {
    flex: 1,
  },
  postPreview: {
    width: 300,
    height: "25%",
    minHeight: 150,
    marginHorizontal: 10,
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
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginHorizontal: 10,
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
  heartContainer: {
    backgroundColor: "#f5f3ff", // Light purple background
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
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
});

export default QuizSolvingScreen;
