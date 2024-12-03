# Acceptance Criteria

This document outlines the acceptance criteria for the checklist items related to the development and implementation of the key features of our project, as the bounswe2024group5. The following criteria are designed to align with project goals, adhere to industry best practices, and maintain high-quality standards. We include examples, implementation details, and testing requirements to provide a comprehensive framework for validating the functionality, usability, and reliability of each component. This document serves as a reference for contributors, us, and you, the customers, throughout our project lifecycle.

## Table of Contents

1. [Primary features](#Primary-features)
2. [Domain-specific features](#Domain-specific-features)
3. [API and its documentation](#API-and-its-documentation)
4. [Standard being followed](#Standard-being-followed)
5. [Testing strategies](#Testing-strategies)


## Primary features (e.g. semantic search, user management)

### Semantic Search 
We utilize semantic search in the forum related features of our app to enhance user search experience among the forum posts.

...

### User Management


#### User Account Functionality:

- [x] Users can register with valid credentials (e.g., email and password).
- [x] Users can log in and log out securely.
- [x] Passwords are hashed securely.

#### Database Integration:

User data is stored securely in the database with appropriate schema design.

....

#### API Endpoints:

See the section [below](#API-and-its-documentation) for more details into the API implementation. In terms of user management, we implemented the following endpoints:
- POST /auth/register - Register a user.
- POST /auth/login - Login with an exitsing user details.
- GET /profile/:username - Fetch a user’s details with its username.
- GET /profile/me - Fetch the authenticated user's profile
- PUT /profile/me - Update the authenticated user's profile
- DELETE /users/:id - Deactivate or delete a user.

##### Related Works:
- 


## Domain-specific features

Here, we list 4 domain-specific points we implement. We implemented the first 3 points and plan to implement the last one in the future:
- [x] Quiz creationg question type: has to follow structure 
- [ ] Quiz creation word check
- [x] Tag constraint in the Forum posts
- [ ] Bad word detection in the Forum posts

### 1.Quiz Creation Word Validity Check
In the quiz creation, we check whether the question word is in our database. This ensures that the word entered is a valid word.

This is domain spesific because checking whether a question exists in our database is not a generic software feature. This is useful for our case of an English learning app to ensure the consistency and quality of the quiz content.

The check for the input word was created in [this commit](https://github.com/bounswe/bounswe2024group5/commit/11ad2b427ad7c388fca06962819dc54d636202dc#diff-7382e3f108e33645a6c54363d5acf961175bc16a396a4e48b4da24e0c7a7042c). However, we did not connect this function yet to the other parts of the program. We want to add a 2 second delay after a character is entered to check whether a word is valid or not. We will finish the implementation before the final milestone.


### 2. Quiz Creation Question Type
In the quiz creation, we enforce the user to select one of the three question types: English => Turkish, Turkish => English and English => English Meaning.

This is domain spesific because limiting the questions with types is not a generic software feature. This ensures that the type of questions in our English learning app are consistent. 

We implemented the final version of the dropdown component in [this commit](https://github.com/bounswe/bounswe2024group5/commit/5df744898da7e640ad53353883b1dc6cfcefe8c0).

### 3. Tag Constraint in the Forum Post Creation 

Users are required to provide tags (at least one) when creating a forum post. These tags have to be valid English words that exist in our database. This contraint help us keep the forum posts connected to our domain, by linking each post to at least one English word. Though we cannot directly monitor what users write in their forum posts, the tag requirement restricts users from creating posts that are completly unrelated to the domain of language learning.

We implemented a `POST /posts` endpoint to create forum posts. The following displays the basic structure of a request body this endpoint accepts:

```json
{
  "title": "Sample Title",
  "content": "This is a sample post content.",
  "tags": [
    "fast"
  ]
}
```

If the entered tag words are not valid English words that do not exist in our database, the endpoint responds with a `400 Bad Request` error. Hence, the user is unable to cretae posts with invalid tags.

#### Related Work:

* [Issue #369](https://github.com/bounswe/bounswe2024group5/issues/369)
* [PR #381](https://github.com/bounswe/bounswe2024group5/pull/381)
* [Post Service Backend implementation](https://github.com/bounswe/bounswe2024group5/blob/93bcb460b4407cafb2cb025e1beaef5701c1b323/backend/src/main/java/com/quizzard/quizzard/service/PostService.java#L4)
* Mobile usage of this endpoint: [CreateQuizScreen](https://github.com/bounswe/bounswe2024group5/blob/93bcb460b4407cafb2cb025e1beaef5701c1b323/mobile/Quizzard/screens/CreateQuestionScreen.tsx#L55-L69).


### 4. Bad Word Detection in the Forum Post Creation

In addition to the tags restriction above, we plan to implement additional checks to monitor the user's input in the forum posts creation. We plan to implement a bad word detector endpoint to detect any kind of vulgarism and offensive content to ensure the data safety and user trust in our application. This feature is planned to be implemented in the next and final milestone.


## API and its documentation (e.g. endpoints, expected inputs, outputs)

We updated the API docs regularly along with the updates of the backend.  
Some of the PRs which updated the API docs:
* [PR #381](https://github.com/bounswe/bounswe2024group5/pull/381)
* [PR #410](https://github.com/bounswe/bounswe2024group5/pull/410)
* [PR #422](https://github.com/bounswe/bounswe2024group5/pull/422)

We only need to add 40* responses to the API documentation for some features we implemented. Here they are:

- **GET** /quizzes
- **POST** /quizzes
- **PUT** /quizzes/{id}
- **DELETE** /quizzes
- **POST** /quiz-attempts
- **GET** /quiz-attempts
- **GET** /quiz-attempts/{id}
- **DELETE** /quiz-attempts/{id}
- **PUT** /quiz-attempts/{id}
- **GET** /posts
- **GET** /posts/{postId}/upvotes
- **GET** /posts/upvotes
- **GET** /posts/replies
- **POST** /file/upload
- **GET** /favorite-question

Our team has developed a robust and well-documented API that covers crucial endpoints with precision and clarity. Our ongoing documentation updates show our commitment to high-quality, sustainable software development practices.

## Standard being followed

1. Adherence to ARIA Roles and Properties
* All ARIA roles (role attributes) are used appropriately as per the W3C ARIA specification.
* ARIA roles are only used where necessary, avoiding redundant or incorrect usage that could confuse assistive technologies.
* Example: A search input uses `role="searchbox"` and is labeled with `aria-label="Search quizzes"`.

2. Keyboard Accessibility
* All interactive elements are fully operable via keyboard.
* Proper ARIA attributes, such as aria-expanded, aria-pressed, and aria-selected, are used to reflect the current state of components.
* Focus management is implemented for dynamic UI components, such as modals or dropdowns, using aria-hidden and focus trapping.
* Example: When a dropdown item is selected `aria-selected="true"` is set.

3. Accessible Naming and Descriptions
* All interactive elements have accessible names or descriptions using aria-label, aria-labelledby, or aria-describedby where applicable.
* Names and descriptions provided are concise and accurately represent the element’s purpose.
* Example: A button for creating a quiz includes `aria-label="Create a new quiz"` to provide context to screen readers.

4. The use of ARIA roles, states, and properties is clearly documented in the project's API or component documentation.
* The documentation has a section dedicated to explaining ARIA standard and how it's used in our application.

## Testing strategies (e.g. unit test coverage, integration testing, tools)



## Table of Contents

- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [Testing Tools](#testing-tools)
- [Additional Testing Activities](#additional-testing-activities)

---

## Unit Testing

Ensure that individual components and functions operate correctly in isolation.

## **Web**
### **1. Account Creation & Registration**

- [ ] **Unique Username Validation**
  - **Acceptance Criteria:**
    - The system must allow registration only if the username is unique.
    - Attempting to register with an existing username should result in an error.
  - **Example:**
    - Registering with username "user123" twice should allow the first registration and reject the second with an appropriate error message.

- [ ] **Input Field Validation**
  - **Acceptance Criteria:**
    - All mandatory fields (username, name, email, password, English proficiency level) must be validated.
    - Invalid inputs should trigger specific error messages.
  - **Example:**
    - Leaving the email field empty should display: "Email is required."


### **2. Authentication**

- [ ] **Login with Valid Credentials**
  - **Acceptance Criteria:**
    - Users can log in using either their username or email along with the correct password.
    - Successful login returns a valid authentication token/session.
  - **Example:**
    - Logging in with email "user@example.com" and password "Secure@123" should grant access.

- [ ] **Login with Invalid Credentials**
  - **Acceptance Criteria:**
    - Incorrect username/email or password should prevent login.
    - An appropriate error message should be displayed.
  - **Example:**
    - Logging in with email "user@example.com" and wrong password should display: "Invalid username/email or password."

### **3. Profile Management**

- [ ] **Update Profile Information**
  - **Acceptance Criteria:**
    - Users can update their name, email, and English proficiency level.
    - Changes are accurately reflected in the user's profile.
  - **Example:**
    - Changing the name from "John Doe" to "Jane Doe" should update the profile accordingly.

- [ ] **Profile Picture Upload**
  - **Acceptance Criteria:**
    - Users can upload and update their profile picture.
    - The system should accept valid image formats and reject invalid ones.
  - **Example:**
    - Uploading a JPEG image should display it on the profile page, while uploading a TXT file should be rejected.

### **4. Quiz Management**

- [ ] **Quiz Creation Logic**
  - **Acceptance Criteria:**
    - Users can create quizzes by providing a title, description, and a set of questions.
    - Each question must have a valid format and associated answers.
  - **Example:**
    - Creating a quiz titled "Basic Vocabulary" with 5 valid questions should successfully save the quiz.


- [ ] **Scoring Algorithms**
  - **Acceptance Criteria:**
    - The system accurately calculates points based on quiz performance.
    - Edge cases (e.g., all answers correct/incorrect) are handled correctly.
  - **Example:**
    - Completing a quiz with 4 correct answers out of 5 should award the appropriate number of points.

### **5. Forum Functionality**

- [ ] **Forum Post Creation**
  - **Acceptance Criteria:**
    - Users can create forum posts with a title and content.
    - Posts are saved and retrievable from the database.
  - **Example:**
    - Creating a post titled "Difference between 'affect' and 'effect'" should make it visible in the forum list.

- [ ] **Reply to Forum Posts**
  - **Acceptance Criteria:**
    - Users can reply to existing forum posts.
    - Replies are correctly associated with their parent posts.
  - **Example:**
    - Replying to the above post should display the reply under the original post.

- [ ] **Upvote Forum Posts**
  - **Acceptance Criteria:**
    - Users can upvate existing forum posts.
    - Upvotes are calculated correctly.
  - **Example:**
    - Upvoting a post with 2 upvotes increases the upvote to 3.

### **6. Search Functionality**

- [ ] **Word Search with Autocomplete**
  - **Acceptance Criteria:**
    - Users can search for words and receive words including that input.

  - **Example:**
    - Searching for "ca" should display cars, cats etc.


---
## **Mobile**
### **1. Account Creation & Registration**

- [ ] **Unique Username Validation**
  - **Acceptance Criteria:**
    - The system must allow registration only if the username is unique.
    - Attempting to register with an existing username should result in an error.
  - **Example:**
    - Registering with username "user123" twice should allow the first registration and reject the second with an appropriate error message.

- [ ] **Input Field Validation**
  - **Acceptance Criteria:**
    - All mandatory fields (username, name, email, password, English proficiency level) must be validated.
    - Invalid inputs should trigger specific error messages.
  - **Example:**
    - Leaving the email field empty should display: "Email is required."

- [ ] **Password Strength Validation**
  - **Acceptance Criteria:**
    - Passwords must meet minimum security requirements (e.g., minimum length, inclusion of special characters).
    - Weak passwords should be rejected with a clear message.
  - **Example:**
    - Entering "password" should trigger: "Password must be at least 8 characters long and include a special character."

### **2. Authentication**

- [ ] **Login with Valid Credentials**
  - **Acceptance Criteria:**
    - Users can log in using either their username or email along with the correct password.
    - Successful login returns a valid authentication token/session.
  - **Example:**
    - Logging in with email "user@example.com" and password "Secure@123" should grant access.

- [ ] **Login with Invalid Credentials**
  - **Acceptance Criteria:**
    - Incorrect username/email or password should prevent login.
    - An appropriate error message should be displayed.
  - **Example:**
    - Logging in with email "user@example.com" and wrong password should display: "Invalid username/email or password."

### **3. Profile Management**

- [ ] **Update Profile Information**
  - **Acceptance Criteria:**
    - Users can update their name, email, and English proficiency level.
    - Changes are accurately reflected in the user's profile.
  - **Example:**
    - Changing the name from "John Doe" to "Jane Doe" should update the profile accordingly.

- [ ] **Profile Picture Upload**
  - **Acceptance Criteria:**
    - Users can upload and update their profile picture.
    - The system should accept valid image formats and reject invalid ones.
  - **Example:**
    - Uploading a JPEG image should display it on the profile page, while uploading a TXT file should be rejected.

### **4. Quiz Management**

- [ ] **Quiz Creation Logic**
  - **Acceptance Criteria:**
    - Users can create quizzes by providing a title, description, and a set of questions.
    - Each question must have a valid format and associated answers.
  - **Example:**
    - Creating a quiz titled "Basic Vocabulary" with 5 valid questions should successfully save the quiz.

- [ ] **Question Association**
  - **Acceptance Criteria:**
    - Questions are correctly linked to their respective quizzes.
    - Deleting a quiz should also remove its associated questions.
  - **Example:**
    - Deleting the "Basic Vocabulary" quiz should remove all its 5 questions from the database.

- [ ] **Scoring Algorithms**
  - **Acceptance Criteria:**
    - The system accurately calculates points based on quiz performance.
    - Edge cases (e.g., all answers correct/incorrect) are handled correctly.
  - **Example:**
    - Completing a quiz with 4 correct answers out of 5 should award the appropriate number of points.

### **5. Forum Functionality**

- [ ] **Forum Post Creation**
  - **Acceptance Criteria:**
    - Users can create forum posts with a title and content.
    - Posts are saved and retrievable from the database.
  - **Example:**
    - Creating a post titled "Difference between 'affect' and 'effect'" should make it visible in the forum list.

- [ ] **Reply to Forum Posts**
  - **Acceptance Criteria:**
    - Users can reply to existing forum posts.
    - Replies are correctly associated with their parent posts.
  - **Example:**
    - Replying to the above post should display the reply under the original post.

- [ ] **Upvote Forum Posts**
  - **Acceptance Criteria:**
    - Users can upvate existing forum posts.
    - Upvotes are calculated correctly.
  - **Example:**
    - Upvoting a post with 2 upvotes increases the upvote to 3.


### **6. Search Functionality**

- [ ] **Word Search with Autocomplete**
  - **Acceptance Criteria:**
    - Users can search for words and receive words including that input.

  - **Example:**
    - Searching for "ca" should display cars, cats etc.

---

## Integration Testing

Ensure that different modules and services work together seamlessly.
## **Mobile**
### **1. User Registration and Login Flow**

- [ ] **Complete Registration Process**
  - **Acceptance Criteria:**
    - Users can register with valid information and subsequently log in.
    - Data flows correctly from frontend forms to backend storage.
  - **Example:**
    - A user registers with all valid details and is able to log in immediately after registration.

- [ ] **Authentication Token Handling**
  - **Acceptance Criteria:**
    - Upon successful login, the system issues a valid token/session.
    - Protected routes are accessible only with valid tokens.
  - **Example:**
    - Accessing the profile page without logging in redirects the user to the login page.

### **2. Quiz Lifecycle Management**

- [ ] **Quiz Creation to Availability**
  - **Acceptance Criteria:**
    - Created quizzes are immediately available for other users to attempt.
    - Data consistency is maintained between quiz creation and availability.
  - **Example:**
    - Creating a quiz and then searching for it as another user should display the newly created quiz.

- [ ] **Quiz Attempt and Scoring**
  - **Acceptance Criteria:**
    - Users can attempt quizzes, and their answers are recorded.
    - Scores are calculated based on correct answers and updated in the user's profile.
  - **Example:**
    - Completing a quiz with 3 correct answers out of 5 should update the user's points accordingly.

### **3. Forum Interaction Flow**

- [ ] **Creating and Viewing Posts**
  - **Acceptance Criteria:**
    - Users can create posts and view them in the forum.
    - Replies to posts are displayed correctly under their respective posts.
  - **Example:**
    - A user creates a post and another user replies; both should be visible in the forum thread.

- [ ] **Search Integration in Forum**
  - **Acceptance Criteria:**
    - Searching within the forum retrieves relevant posts based on keywords or tags.
    - Linked data sources enhance search relevance.
  - **Example:**
    - Searching for "grammar" in the forum should display all posts related to grammar topics.

### **4. Profile and Points Synchronization**

- [ ] **Profile Information Update**
  - **Acceptance Criteria:**
    - Updates to profile information reflect immediately across the system.
    - Points earned from quizzes are accurately displayed in the user's profile.
  - **Example:**
    - After completing a quiz, the user's points increase and are visible on their profile page.

### **5. Search and Data Retrieval Integration**

- [ ] **End-to-End Search Functionality**
  - **Acceptance Criteria:**
    - Searches initiated from the frontend are processed by the backend and return accurate results.
    - Linked data sources are queried and integrated into the search results.
  - **Example:**
    - Searching for "run" fetches data from both the application's database

---


## **Web**
### **1. User Registration and Login Flow**

- [ ] **Complete Registration Process**
  - **Acceptance Criteria:**
    - Users can register with valid information and subsequently log in.
    - Data flows correctly from frontend forms to backend storage.
  - **Example:**
    - A user registers with all valid details and is able to log in immediately after registration.

- [ ] **Authentication Token Handling**
  - **Acceptance Criteria:**
    - Upon successful login, the system issues a valid token/session.
    - Protected routes are accessible only with valid tokens.
  - **Example:**
    - Accessing the profile page without logging in redirects the user to the login page.

### **2. Quiz Lifecycle Management**

- [ ] **Quiz Creation to Availability**
  - **Acceptance Criteria:**
    - Created quizzes are immediately available for other users to attempt.
    - Data consistency is maintained between quiz creation and availability.
  - **Example:**
    - Creating a quiz and then searching for it as another user should display the newly created quiz.

- [ ] **Quiz Attempt and Scoring**
  - **Acceptance Criteria:**
    - Users can attempt quizzes, and their answers are recorded.
    - Scores are calculated based on correct answers and updated in the user's profile.
  - **Example:**
    - Completing a quiz with 3 correct answers out of 5 should update the user's points accordingly.

### **3. Forum Interaction Flow**

- [ ] **Creating and Viewing Posts**
  - **Acceptance Criteria:**
    - Users can create posts and view them in the forum.
    - Replies to posts are displayed correctly under their respective posts.
  - **Example:**
    - A user creates a post and another user replies; both should be visible in the forum thread.

- [ ] **Search Integration in Forum**
  - **Acceptance Criteria:**
    - Searching within the forum retrieves relevant posts based on keywords or tags.
    - Linked data sources enhance search relevance.
  - **Example:**
    - Searching for "grammar" in the forum should display all posts related to grammar topics.

### **4. Profile and Points Synchronization**

- [ ] **Profile Information Update**
  - **Acceptance Criteria:**
    - Updates to profile information reflect immediately across the system.
    - Points earned from quizzes are accurately displayed in the user's profile.
  - **Example:**
    - After completing a quiz, the user's points increase and are visible on their profile page.

### **5. Search and Data Retrieval Integration**

- [ ] **End-to-End Search Functionality**
  - **Acceptance Criteria:**
    - Searches initiated from the frontend are processed by the backend and return accurate results.
    - Linked data sources are queried and integrated into the search results.
  - **Example:**
    - Searching for "run" fetches data from both the application's database

---

## Testing Tools

Utilize a range of tools to facilitate effective testing across different layers of the application.

### **1. Backend Testing Tools**

- **JUnit**
  - Framework for writing and running unit tests in Java.
  
- **Mockito**
  - Mocking framework for simulating dependencies in unit tests.
  
- **Spring Boot Test**
  - Provides utilities for testing Spring Boot applications, including integration tests.


### **2. Frontend Testing Tools**

- **Vitest**
  - 

### **3. Mobile Testing Tools**

- **Jest**
  - For unit testing JavaScript code in React Native.
  

### **4. API Testing Tools**

- **Postman**
  - GUI tool for testing API endpoints manually.

## Additional Testing Activities

Complementary activities to enhance overall testing effectiveness.

### **1. Peer Code Review**

- **Adherence to Coding Standards**
  - Ensure that code follows established style guides and best practices.

  
- **Bug Identification**
  - Detect potential bugs or logical errors before code integration.

  
  
- **Performance Considerations**
  - Assess the performance impact of new code additions.


---




## Main Authors

