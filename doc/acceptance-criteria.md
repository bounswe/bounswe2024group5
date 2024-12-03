# Acceptance Criteria


## Primary features (e.g. semantic search, user management)

## Domain-specific features (e.g. why they're specific, how they're implemented)

Here, we list 4 domain-specific points we implement. We implemented the first 3 points and plan to implement the last one in the future:
- [x] Quiz creationg question type: has to follow structure 
- [x] Quiz creation word check
- [x] Tag constraint in the Forum posts
- [ ] Bad word detection in the Forum posts

### 1. 

### 2. 

### 3. Tag Constraint in the Forum Post Creation 

Users are required to provide tags (at least one) when creating a forum post. These tags have to be valid English words that exist in our database. This contraint help us keep the forum posts connected to our domain, by linking each post to at least one English word. Though we cannot directly monitor what users write in their forum posts, the tag requirement restricts users from creating posts that are completly unrelated to the domain of language learning.

We implemented (in the [PR #381](https://github.com/bounswe/bounswe2024group5/pull/381)) a `POST /posts` endpoint to create forum posts. The following displays the basic structure of a request body this endpoint accepts:

```json
{
  "title": "Sample Title",
  "content": "This is a sample post content.",
  "tags": [
    "fast"
  ]
}
```

If the entered tag words are not valid English words that do not exist in our database, the endpoint responds with a `400 Bad Request` error. Hence, the user is unable to cretae posts with invalid tags. You can view the usage of this endpoint in mobile [here](https://github.com/bounswe/bounswe2024group5/blob/93bcb460b4407cafb2cb025e1beaef5701c1b323/mobile/Quizzard/screens/CreateQuestionScreen.tsx#L55-L69).


### 4. Bad Word Detection in the Forum Post Creation

In addition to the tags restriction above, we plan to implement additional checks to monitor the user's input in the forum posts creation. We plan to implement a bad word detector endpoint to detect any kind of vulgarism and offensive content to ensure the data safety and user trust in our application. This feature is planned to be implemented in the next and final milestone.


## API and its documentation (e.g. endpoints, expected inputs, outputs)

We updated the API docs regularly along with the updates of the backend.  
Some of the PRs which updated the API docs:
* [PR #381](https://github.com/bounswe/bounswe2024group5/pull/381)
* [PR #410](https://github.com/bounswe/bounswe2024group5/pull/410)
* [PR #422](https://github.com/bounswe/bounswe2024group5/pull/422)

## Standard(s) being followed

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
- [Acceptance Criteria Validation](#acceptance-criteria-validation)
- [Testing Tools](#testing-tools)
- [Additional Testing Activities](#additional-testing-activities)

---

## Unit Testing

Ensure that individual components and functions operate correctly in isolation.

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

### **6. Search Functionality**

- [ ] **Word Search with Linked Data Integration**
  - **Acceptance Criteria:**
    - Users can search for words and receive comprehensive results including definitions, translations, synonyms, antonyms, and example usages.
    - The search leverages linked data sources for enriched information.
  - **Example:**
    - Searching for "run" should display its definitions, translations, synonyms like "sprint," and example sentences.

- [ ] **Handling Invalid or Empty Search Queries**
  - **Acceptance Criteria:**
    - The system gracefully handles empty or invalid search inputs without crashing.
    - Users receive helpful feedback or suggestions.
  - **Example:**
    - Entering an empty search should prompt: "Please enter a word to search."

---

## Integration Testing

Ensure that different modules and services work together seamlessly.

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
    - Searching for "run" fetches data from both the application's database and linked sources like Lexvo, displaying a comprehensive result.

---

## Acceptance Criteria Validation

Ensure that all features meet the predefined acceptance criteria and function as intended.

### **1. Define Acceptance Criteria**

- [ ] **Document Acceptance Criteria**
  - Clearly define what constitutes success for each feature.
  - Include both functional and non-functional aspects.
  
- [ ] **Provide Examples for Each Criterion**
  - Offer concrete scenarios that demonstrate the acceptance criteria.
  
  - **Example:**
    - **Criterion:** Users can create quizzes with multiple question types.
    - **Example Scenario:** A user creates a quiz with multiple-choice and matching questions, saves it, and verifies its availability for other users.

### **2. Manual Testing Against Criteria**

- [ ] **Feature-by-Feature Validation**
  - Manually test each feature to ensure it aligns with the acceptance criteria.
  
- [ ] **User Scenario Testing**
  - Simulate real-world user interactions to validate feature functionality.
  
  - **Example:**
    - Simulate a user registering, creating a quiz, attempting the quiz, and viewing the updated points on their profile.

### **3. Feedback and Iteration**

- [ ] **Collect Feedback from Testers**
  - Gather insights from team members or beta testers regarding feature performance.
  
- [ ] **Iterate Based on Feedback**
  - Make necessary adjustments to features to better meet acceptance criteria.
  
  - **Example:**
    - If testers find the quiz creation interface unintuitive, redesign it for better usability.

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

- **RestAssured**
  - Tool for testing RESTful APIs with a fluent interface.

### **2. Frontend Testing Tools**

- **Jest**
  - JavaScript testing framework for unit and integration tests.
  
- **React Testing Library**
  - Utilities for testing React components in a user-centric manner.
  
- **Cypress**
  - End-to-end testing framework for simulating real user interactions.

- **Enzyme**
  - JavaScript testing utility for React that makes it easier to assert, manipulate, and traverse React components' output.

### **3. Mobile Testing Tools**

- **Jest**
  - For unit testing JavaScript code in React Native.
  
- **React Native Testing Library**
  - Extends React Testing Library for React Native components.

### **4. API Testing Tools**

- **Postman**
  - GUI tool for testing API endpoints manually.
  
- **RestAssured**
  - Automates API testing in Java.

### **5. Performance Testing Tools**

- **JMeter**
  - Open-source tool for load testing and performance measurement.
  
- **Locust**
  - Scalable user load testing tool written in Python.

### **6. Security Testing Tools**

- **OWASP ZAP**
  - Automated security scanner for finding vulnerabilities in web applications.
  
- **SonarQube**
  - Continuous inspection tool for code quality and security vulnerabilities.

### **7. Accessibility Testing Tools**

- **Lighthouse**
  - Automated tool for improving the quality of web pages, including accessibility checks.
  
- **aXe**
  - Accessibility testing engine for automated testing of web applications.

### **8. Cross-Browser Testing Tools**

- **BrowserStack**
  - Cloud-based platform for testing across various browsers and devices.
  
- **CrossBrowserTesting**
  - Provides access to a wide range of browsers, devices, and operating systems for testing.

### **9. Continuous Integration Tools**

- **GitHub Actions**
  - Automate workflows directly from GitHub repositories.
  
- **Jenkins**
  - Open-source automation server for building, testing, and deploying code.
  
- **Travis CI**
  - Continuous integration service for building and testing software projects hosted on GitHub.

---

## Additional Testing Activities

Complementary activities to enhance overall testing effectiveness.

### **1. Peer Code Review**

- [ ] **Adherence to Coding Standards**
  - Ensure that code follows established style guides and best practices.
  
- [ ] **Bug Identification**
  - Detect potential bugs or logical errors before code integration.
  
- [ ] **Security Checks**
  - Identify and mitigate security vulnerabilities in the codebase.

### **2. Documentation Testing**

- [ ] **User Guides Verification**
  - Ensure that user manuals and help documents are accurate and comprehensive.
  
- [ ] **API Documentation Consistency**
  - Cross-check API documentation against actual endpoints and responses.
  
- [ ] **Code Comments and Inline Documentation**
  - Verify that code is well-commented and explanations are clear.

### **3. Merge Conflict Resolution**

- [ ] **Regular Branch Synchronization**
  - Frequently merge the main branch into feature branches to minimize conflicts.
  
- [ ] **Conflict Resolution Protocol**
  - Follow a standardized process for resolving merge conflicts.
  
- [ ] **Post-Merge Testing**
  - Re-run tests after merging to ensure no new issues have been introduced.

### **4. User Acceptance Testing (UAT)**

- [ ] **Real-World Scenario Simulation**
  - Test the application using scenarios that reflect actual user behavior.
  
- [ ] **Stakeholder Feedback Collection**
  - Gather input from stakeholders to validate that the application meets business needs.
  
- [ ] **Final Validation Before Release**
  - Ensure all acceptance criteria are met and the application is ready for deployment.

### **5. Regression Testing**

- [ ] **Re-testing After Changes**
  - Re-run existing tests after code modifications to ensure no new bugs are introduced.
  
- [ ] **Automated Regression Suites**
  - Maintain a suite of automated tests that cover critical functionalities for quick regression checks.

---




## Main Authors

