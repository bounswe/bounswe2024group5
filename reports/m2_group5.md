# Introduction

This is the second milestone report for our group project, group bounswe2024group5. We are a group of enthusiastic students of CmpE451, committed to building an English Learning app that features posting and solving quizzes, interacting with other language learners in the forums.

Our team members that have contributed to the project:

- [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir)
- [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu)
- [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik)
- [ÖZGÜR DENİZ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir)
- [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)
- [SEMİH YILMAZ](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz)
- [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan)
- [FAHREDDİN ÖZCAN](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan)

---

<details>
  <summary>Table of Contents</summary>

- [1. Executive Summary](#1-executive-summary)
  - [1.1 Project Description](#11-project-description)
  - [1.2 Project Status](#12-project-status)
- [2. Customer Feedback and Reflections](#2-customer-feedback-and-reflections)
- [3. List and Status of Deliverables](#3-list-and-status-of-deliverables)
  - [3.1 Evaluation of the status of Deliverables](#31-evaluation-of-the-status-of-deliverables)
  - [3.2 Addressed Requirements](#32-addressed-requirements)
  - [3.3 Evaluation of Tools](#33-evaluation-of-tools)
    - [3.3.1 GitHub](#331-github)
    - [3.3.2 Google Meet](#332-google-meet)
    - [3.3.3 WhatsApp](#333-whatsapp)
- [4. Planning](#4-Planning)
  - [4.1. Change Of Plans](#41-change-of-plans)
  - [4.2 Plan for completing the project](#42-plan-for-completing-the-project)
  - [4.3 Project plan](#43-project-plan)
- [5. Individual Contribution Table](#5-individual-contribution-table)
  - [5.1 ARINÇ DEMİR](#51-ARINÇ-DEMİR)
  - [5.2 ASUDE EBRAR KIZILOĞLU](#52-ASUDE-EBRAR-KIZILOĞLU)
  - [5.3 FAHREDDİN ÖZCAN](#53-FAHREDDİN-ÖZCAN)
  - [5.4 HALİL UTKU ÇELİK](#54-HALİL-UTKU-ÇELİK)
  - [5.5 ÖZGÜR DENİZ DEMİR](#55-ÖZGÜR-DENİZ-DEMİR)
  - [5.6 RAMAZAN ONUR ACAR](#56-Ramazan-Onur-Acar)
  - [5.7 SEMİH YILMAZ](#57-SEMİH-YILMAZ)
  - [5.8 SÜLEYMAN EMİR TAŞAN](#58-SÜLEYMAN-EMİR-TAŞAN)
- [6. Deliverables](#6-deliverables)
  - [6.1 Project Repository](#61-project-repository)
  - [6.2 RAM (Responsibility Assignment Matrix)](#62-ram-responsibility-assignment-matrix)
  - [6.3 A pre-release Version of our Software](#63-a-pre-release-version-of-our-software)
  - [6.4 UX Design](#64-ux-design)
  - [6.5 Utilized Standard](#65-utilized-standard)
  - [6.6 API documentation](#66-api-documentation)
- [7. Testing](#7-testing)
  - [7.1 General Testing Plan](#71-general-testing-plan)
  - [7.2 Unit Tests](#72-unit-tests)
  _ [7.2.1 Backend](#721-backend)
  _ [7.2.2 Frontend](#722-frontend) \* [7.2.3 Mobile](#723-mobile)
  </details>

# 1. Executive Summary

## 1.1 Project Description

Quizzard is a language learning platform for Turkish speakers. It helps users acquire new vocabulary words by letting them solve quizzes. Those quizzes contain questions that are designed to help users commit new words to their long-term memory by matching words to their translations or meanings.

Users can either solve quizzes that they themselves have created or quizzes created by other users. This enables a community of language learners help each other through their learning journey. But quiz sharing isn't the only mechanism through which users can help each other. They can also answer questions related to specific words that are asked by other users on the forum.

Overall, Quizzard's quiz and forum features are the main drivers of language advancement for Turkish speaking individuals in our project.

## 1.2 Project Status

During this last month, sinse Milestone 1, we implemented the most of the backend infrastructure. Quiz creation, and quiz solve attempt, forum post creation, search and other functionalities endpoints were designed. Moreover, we integrated the open-source database we will use for the quiz data.

On the mobile client side, backend integration were implemented for several features. Web users are now able to use quiz and forum functionalities to the fullest. On the web client side, similar to the mobile, most of the necessary features were implemented. In addition, we added a section for related forum posts in the quiz-solve page, as a part of the customer feedback we received in the first customer presentation.

In terms of UI/UX, both mobile and web now has quiz images displayed. We also worked to make the UI for both clients similar to each other to keep consistent UI for our app. For a better user experience, we thought of users who start solving a quiz in our platform but leave on the half way for various reasons. To handle such occurrences, we introduced the "in progress" status for the quizzes so that whenever a user goes back to a quiz they solved half-way previously, we retrieve their previous answers to offer the users to continue from where they left off. This feature is fully implemented in the web and partially implemented in the mobile client, to be completed soon.

In addition, we started implementing the profile page on both clients, which is an ongoing feature that is being improved still.

---

# 2. Customer Feedback and Reflections

Our customer feedback this time was extremely motivating for us because we were able to receive the the positive feedbacks from our improvements and design decisions. Moreover, we had complementary suggestions and feedback for our latest additions to the application.

One of the most appreciated suggestions was to include images for questions, sourced from Wikidata, as it would make the quizzes more engaging and visually appealing. This feature could significantly improve the learning experience by providing context to the questions, especially for visual learners. We will work on these and focus on approaches of how to link an image for abstract words.

Another key area of feedback was related to personalizing the learning experience through quiz recommendations. The customer suggested adding a feature to recommend quizzes on the home screen based on the users. This would provide a tailored experience and guide users toward appropriate challenges that match their skill level. Additionally, displaying recommendations after a quiz finishes could motivate users to continue learning by seamlessly transitioning them to the next suitable activity.

A critical issue raised pertained to preventing repeated attempts on the same quiz by the same user. Currently, users can solve a quiz multiple times and earn points each time, which could lead to inflated scores. Addressing this would ensure the scoring system remains fair and encourages genuine progress.

Lastly, the customer emphasized the importance of transparency in how proficiency levels (A1, A2, B1, etc.) are calculated in relation to ELO/points. Providing clear guidelines on how users progress between levels would enhance trust in the system and keep users motivated to reach higher levels of proficiency.

By implementing these changes, we can improve the usability and integrity of the app while ensuring a more engaging and personalized experience for the learners.

---

# 3. List and Status of Deliverables

| Deliverable                                  | Status                 | Related Link                                         |
| -------------------------------------------- | ---------------------- | ---------------------------------------------------- |
| Project Repository                           | Delivered              | [repo](https://github.com/bounswe/bounswe2024group5) |
| Project plan                                 | Completed & Delivered  | [jump](#43-project-plan)                             |
| RAM (Responsibility Assignment Matrix)       | Completed & Delivered  | [jump](#62-ram-responsibility-assignment-matrix)     |
| Pre-release Version of our Software          | Implemented & Released | [jump](#63-a-pre-release-version-of-our-software)    |
| UX Design                                    | Designed & Implemented | [jump](#64-ux-design)                                |
| Utilized Standard                            | Designed & Implemented | [jump](#65-utilized-standard)                        |
| API documentation                            | Designed & Implemented | [jump](#66-api-documentation)                        |
| Individual Contributions (see section below) | Completed & Documented | [jump](#5-individual-contribution-table)             |
| Milestone Report                             | Completed & Delivered  | this report                                          |

## 3.1 Evaluation of the status of Deliverables

<!--- Evaluation of the status of deliverables and its impact on your project plan (reflection). -->

- **Project plan**: We utilize Github's Projects [Roadmap](https://github.com/orgs/bounswe/projects/67/views/4) feature to manage our project plan effectively. [See](#43-project-plan) for more details.

- **RAM (Responsibility Assignment Matrix)**: We keep track of our individual task distributions in this matrix, and we often review it. This semester, [Semih](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz) volunteered for the RAM revision duty. Other team members also review the matrix to arrange their responsibilities. RAM is particularly important in terms of task distributions in the sub temas (mobile, backend, frontend). With this visualization, we find it easier to distribute the tasks fairly among us.

- **API documentation**: Our [API documentation](https://editor.swagger.io/?url=https://raw.githubusercontent.com/bounswe/bounswe2024group5/refs/heads/main/doc/api-design.yml) includes detailed descriptions of available endpoints, including parameters, request methods, and sample responses. It forms the basis of a cohesive agreement between the different teams (front end, mobile and back end) in our group. In the image below, you can see the api-doc for the /autocomplete endpoint. [See](#66-api-documentation) for some API examples.

![image](https://github.com/user-attachments/assets/672fa87c-69d1-40e4-8c44-124f3d5985c2)

## 3.2 Addressed Requirements

The status of requirements is updated at their [page](https://github.com/bounswe/bounswe2024group5/wiki/Requirements). The emojis symbolize three different state:

- ✅ is for requirements that we finished implementing it.
- ⚠️ is for requirements that we have started working on but not finished.
- ❌ is for requirements that we have not started.

---

## 3.3 Evaluation of Tools

We used four major tools for team communication, and planning and design of our project.

## 3.3.1 GitHub

GitHub continues to be the primary platform for planning and tracking of our project. We constantly make use of issues to collaborate on and track project tasks and this enables all team members to exactly know the status of our project and diffuse confusion as to who's supposed to do what.

We also use wiki section to document meeting notes, diagrams and design files. This easy access to project files enables us to keep in sight what our final objective is at all times. Finally we use pull requests to ensure only high quality code makes it to the main branch of our codebase. For this. we only commmit reviewed and approved code to our main branch.

## 3.3.2 Google Meet

The fact that Discord continues to be blocked in the country, we needed to use a new platform to hold our weekly meetings. We chose Google Meet for this job due to its longer meeting time allowance (for an hour).

## 3.3.3 WhatsApp

We were already using WhatsApp for texting related to issues that needed to be resolved fast. But, specifically in this last month, since we had to discontinue using Discord to share brainstorming ideas and files, we used our whatsapp group chat for these tasks as well.

---

# 4. Planning

## 4.1 Change Of Plans

We haven't really changed any plans from the Milestone 1. After milestone 1, we had a meeting and set a target for the milestone 2, and for almost all we were able to implement them. The ones we haven't, will be implemented for the milestone 2.

## 4.2 Plan for completing the Project

With the milestone 2 coming to an end, we can say that we've implemented most of the necessary features that makes our application function, including all backend, mobile and frontend. It should also be noted that, almost none of the implemented features uses mock data, so everything works in sync with backend with real data from database. After this point, we can group the necessary further improvement towards completing the project in these groups:

1. Fixing the existing bugs
   Since we're an agile team, we're implementing features in a fast manner and there are few flaws in some of the flows. This is our number one priority going forward.

2. Test coverage
   To make sure that everything works as intended and maintain the software quality, we need to increase our test coverage.

3. Feature Additions
   Throughout the development process and during customer presentations, we've collected feedbacks for possible features. One of the major focuses and the most time consuming one will be implementing these features. It's possible that not all are implemented at the final state, but our roadmap is as below:

- First, we want to improve the learning experience. For that, we'll put more information about the word on the quiz solving page, so that there are enough resources to learn about the word while solving the quiz. This will include images, meaning, example usages.
- We will improve the CRUD operations on quizzes and implement quiz update and deletion.
- We will add quiz upvote and favourites list.
- Photo suggestions from wikidata for quiz images
- Improvements in the difficulty algorithm
- Improvements in the user level detection and score gain algorithm
- Follow action, followers and feed implementation
  etc.

## 4.3 Project Plan

<!---
Link to a detailed project plan in your wiki or repository. If you're using Project Libre,
either commit your plan file to your repository or document screenshots of the plan in
your wiki, linking either way in this section. On the other hand, if you're using GitHub
Projects, take screenshots of the board and document them in your wiki, linking in this
section.
--->

We utilize Github's Projects [Roadmap](https://github.com/orgs/bounswe/projects/67/views/4) feature to manage our project plan effectively. This visual representation allows us to monitor our progress according to the upcoming deadlines, such as the milestones. Additionally, it facilitates communication between sub-teams (backend, frontend, and mobile), ensuring that everyone is informed of each other's progress. [Ebrar](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) is responsible to update the Project plan frequently, and other team members also review and revise it often. You can view the screenshot of our project plan from the [wiki page](https://github.com/bounswe/bounswe2024group5/wiki/Project-Plan).

---

# 5. Individual Contribution Table

<!--- Required Format:
* Member: (Your name)
* Responsibilities: The overall description of responsibilities assigned to you
* Main contributions: The overall description of your contributions to the project until
Customer Milestone 2.
* API contributions: Your contributions to the API development. Document here at
least 1 complex API endpoint you have developed if you worked as a back-end
developer, or at least 1 complex API endpoint you have used if you worked as a
front-end / mobile developer. Example call and response should be provided.
Document here in what context / scenario the specific API endpoint is used in the
project.
* Code-related significant issues: Your issues (that you have resolved or reviewed
significantly) that contribute to the code base demonstrated during the demo.
* Management-related significant issues: Your issues (that you have resolved or
reviewed significantly) that contribute to the management of the project.
* Pull requests: You have created, merged, and reviewed. Please also briefly
summarize what the conflict was (if you had any) and how it was resolved
regarding the pull requests you have reviewed.
* Additional information: Mention any additional task you have performed that is not
listed above.

 -->

## 5.1 [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir)

### Responsibilities

Mobile Development

### Main Contributions

I peer programmed with Ramazan and Ebrar on implementing the word validity check in the lab. The word you type when creating a question needs to be a valid word that is in our database. [#349](https://github.com/bounswe/bounswe2024group5/issues/349)

I added the proficiency level selection to the registration page. [#364](https://github.com/bounswe/bounswe2024group5/issues/364), [PR#405](https://github.com/bounswe/bounswe2024group5/pull/405)

I generated random mock data on the go for the home page while we waited for the API's to be implemented. I sorted the quizzes by being closest to the elo of the user. Additionally, I wrote the functionality of the Other Quizzes Section dropdown that filters the quizzes by their level. [#365](https://github.com/bounswe/bounswe2024group5/issues/365), [PR#370](https://github.com/bounswe/bounswe2024group5/pull/370)

I created a page for showing the details of the quiz before starting it. I displayed the quiz description, image, question count and elo there.[#371](https://github.com/bounswe/bounswe2024group5/issues/371), [PR#374](https://github.com/bounswe/bounswe2024group5/pull/374)

I created the quiz finish page where we show the number of correct, wrong and empty answers. You can also return back to revise your answers or go back to the home or quiz description page. Also solved the bug where the wrong answer was not showing in red when you return to a previously answered question. [#389](https://github.com/bounswe/bounswe2024group5/issues/389), [PR#408](https://github.com/bounswe/bounswe2024group5/pull/408)

Before our deployment, I fixed the following bugs:
No splash image and icon, home screen not taking user elo from api, home screen not getting difficulty from api, bug in quizzes for you filtering, quiz not finishing properly, false answer not showing red when you return back to previous questions, answered questions not showing when you return to attempt, quiz elo showing decimal points in home page. [PR#446](https://github.com/bounswe/bounswe2024group5/pull/446)

### API Contributions

I integrated two endpoints. One in the home page and one in the quiz solving page.

- **`Get /profile/me` endpoint**: The home page needed the elo of the user in order to sort the quizzes shown properly. I implemented this endpoint in order to get the elo of the user.

```py
const response = await fetch(`${hostUrl}/api/profile/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
if (response.ok) {
    const data = await response.json();
    setUserElo(data.score)
}
```

The response of the endpoint is the profile data of the user. I only needed the elo here.

```
example:
        username: johndoe
        email: johndoe@example.com
        name: John Doe
        profilePicture: "https://example.com/images/profile.jpg"
        score: 1500.0
        englishProficiency: B1
        noCreatedQuizzes: 5
```

- **`PUT /question-answers?quizAttemptId={id}` endpoint**: This call was needed for getting the previous answers on a quiz solving attempt. In our app, the user can continue their solving attempt later. I needed to get the questions they already answered and show those as done in the solving screen.

```py
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

        // Map all the previous answers to show already answered later on in the code.
        const answersMap = {};
        answersData.forEach((answer) => {
          answersMap[answer.questionId] = answer.answer;
        });
```

The response is a list of question answers. Every element in the list look like this:

```
	id: 3 	// quiz ID
        quizAttemptId: 2
        questionId: 5
        answer: Elma
        isCorrect: True
        updatedAt: 26/04/2024
```

### Code-related significant issues

- [#349](https://github.com/bounswe/bounswe2024group5/issues/349): Ensuring the Users Enter Valid Words (peer programming).
- [#364](https://github.com/bounswe/bounswe2024group5/issues/364): Add Proficiency Level Selection to Registration. [PR#405](https://github.com/bounswe/bounswe2024group5/pull/405)
- [#365](https://github.com/bounswe/bounswe2024group5/issues/365): Home Page Final Touches. [PR#370](https://github.com/bounswe/bounswe2024group5/pull/370)
- [#371](https://github.com/bounswe/bounswe2024group5/issues/371): Add a Quiz Welcome Page [PR#374](https://github.com/bounswe/bounswe2024group5/pull/374)
- [#389](https://github.com/bounswe/bounswe2024group5/issues/389): Add Quiz Finish Page Mobile. [PR #408](https://github.com/bounswe/bounswe2024group5/pull/408)

### Management-related significant issues

-

### Pull Requests

#### Created

- [PR#370](https://github.com/bounswe/bounswe2024group5/pull/370):
  Created random elo and difficulty for quizzes since they don't exist in the backend yet.
  Added placeholder image to quizzes since they don't exist in the backend yet.
  Added a mock elo for the user to the home page. Also sort the quizzes for being the closest to the users elo.
  Now selecting the dropdown on the "other quizzes" section filters the quizzes by their difficulty.
- [PR#374](https://github.com/bounswe/bounswe2024group5/pull/374): I added the Quiz Welcome Page when we select a page from the home page.
  In that page, the details of the quiz are displayed.
  You can continue to solve the quiz or go back.
- [PR#405](https://github.com/bounswe/bounswe2024group5/pull/405): Fixed bug where users were not authenticated after registration.
  Added picker for proficiency level in registration.
  Modified the API call to send field "englishProficiency".
- [PR#408](https://github.com/bounswe/bounswe2024group5/pull/408): Fixed wrong answer not showing when you return back to a question in Quiz Solving.
  Added Quiz Finish Screen. It shows the number of right, wrong, empty answers.
  Added the buttons for Return Home, Quiz Description and Revise Answers.
- [PR#408](https://github.com/bounswe/bounswe2024group5/pull/446): Added splash image and icon.
  Fixed home screen not taking user elo from api.
  Fixed home screen not getting difficulty from api.
  Fixed bug in quizzes for you filtering.
  Fixed quiz not finishing properly.
  Fixed false answer not showing red when you return back to previous questions.
  Fixed answered questions not showing when you return to attempt.
  Fixed quiz elo showing decimal points in home page.

#### Reviewed/Merged

- [PR#368](https://github.com/bounswe/bounswe2024group5/pull/368): My Quiz Preview Mobile (Ebrar)
- [PR#426](https://github.com/bounswe/bounswe2024group5/pull/426): Add/mobile api calls for profile (Ramazan)
- [PR#449](https://github.com/bounswe/bounswe2024group5/pull/449): Hotfix: Forum search Missing language parameter for Mobil (Ebrar)

### Additional Information

I wrote the two user stories [#353](https://github.com/bounswe/bounswe2024group5/issues/353)

I built the apk for our release.

I periodically update my personal page for my contributions.

## 5.2 [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu)

### Responsibilities

Group Communicator, Mobile Development.

### Main Contributions

For our Mobile app, I implemented the API requests for creating new quizzes. I worked closely with [Süleyman](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) from the backend team to make the `file/upload` api work for the image upload functionality. After [Ramazan](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar) implemented the profile page, I made use of the existing quiz view in profile page to display the user's own created quizzes. I also added edit and delete buttons to it. Delete button is integrated with backend, but edit button is not yet. I also fetched user profile data to display in profil page.

I introduced a simple IP-address [variable](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/app/HostContext.tsx) to make use of api uri dynamically in the mobile client, instead of hardcoding it. I added the usage of the existing dropdown view in registration page to keep consistent UI, after [Arınç](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) implemented the proficiency level selection in registration.

After [Ramazan](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar) implemented the forum screens, I improved the UI of forum question detail view to keep consistent theme with the web, as well as keeping the date, upvote, and comment features look neat.

I collaborated with [Ramazan](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar) and [Arınç](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) to finalize the intermediate version of our Mobile app, get it ready for the customer presentation. I worked with [Süleyman](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) and [Deniz](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir) to create meaningful mockdata in our deployed app to display in the presentation.

Moreover, I collaborated with Arınç and Ramazan during lab sessions to implement a word validity check. This feature ensures users enter valid words by verifying their input against a predefined dictionary, providing a smoother and more reliable interaction with the app.

For the management tasks, I often organize our agenda during the labs and initiate the task distribution. Also, I keep track of our [Project Plan](https://github.com/orgs/bounswe/projects/67/views/4).

### API Contributions

I integrated several endpoints to mobile in the quiz creation, quiz solve, and profile screens. I will mention 2 of such endpoints I used:

- **`POST /file/upload` endpoint**: I implementing the file upload backend integration in the quiz creation screen, [code](https://github.com/bounswe/bounswe2024group5/blob/3421cd7ca1cd5ebde665e49f415eb940ac9f3616/mobile/Quizzard/screens/QuizCreationScreen.tsx#L46-L55). An example call to this endpoint is as follows:

```py
const formData = new FormData();
formData.append('file', {
    uri: fileUri,
    type: 'image/jpeg', // Adjust this based on your file type
    name: 'upload.jpg',
});
const response = await fetch(
    `${hostUrl}/api/file/upload`,
    {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);
if (response.ok) {
    const result = await response.text();
    return result;
} ...
```

The response of the endpoint is the uri of the uploaded file, images in our case, in the string format. This functionality is used, when users create new quizzes, they can upload an image for their quiz. Later, this uploaded images are displayed in the home screen, along with other quiz data.

Getting this endpoint work was a great challenge. I collaborated with [Fahderrin](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) from frontend and [Semih](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz) from backend throughout this process. We encountered several issues in terms of cloud arrangement of files, and local deployment. At least, we managed to overcome difficulties and finished with great image functionality on both mobile and web.

- **`PUT /quiz-attempts/{id}` endpoint**: I implementing the PUT request to this endpoint inside the `handleFinish` function in the quiz solving screen, [code](https://github.com/bounswe/bounswe2024group5/blob/3421cd7ca1cd5ebde665e49f415eb940ac9f3616/mobile/Quizzard/screens/QuizSolvingScreen.tsx#L229-L239). An example call to this endpoint is as follows:

```py
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
```

The response confirms that this quiz attempt was completed. This endpoint is used whenever a user solves a quiz on our app, and clicks the "finish" button. With this `completed` field set to `true`, the user's answers to the quiz questions are saved and the user's score according to how well they did in the quiz is calculated and added to the user's elo / score.

On the other hand, if the user starts to solve a quiz (hence created a quiz attempt) but never clicks the "finish" button, the app reserves the user's answers to the questions, in case if they ever come back to solving this quiz. As long as the user does not click "finish", no quiz-score is calculated on user's behalf.

### Code-related significant issues

- [#366](https://github.com/bounswe/bounswe2024group5/issues/366): Add Create Quiz API calls for Mobile. [PR #415](https://github.com/bounswe/bounswe2024group5/pull/415)
- [#367](https://github.com/bounswe/bounswe2024group5/issues/367): Implement delete and edit buttons for user's own created quizzes. [PR #368](https://github.com/bounswe/bounswe2024group5/pull/368)
- [#411](https://github.com/bounswe/bounswe2024group5/issues/411): API calls && Mobile debugging and fixes. [PR #415](https://github.com/bounswe/bounswe2024group5/pull/415)

### Management-related significant issues

- [#317](https://github.com/bounswe/bounswe2024group5/issues/317): Arrange the Project plan [Roadmap view](https://github.com/orgs/bounswe/projects/67/views/4).
- [#459](https://github.com/bounswe/bounswe2024group5/issues/459): Initiated the documentation of the Milestone 2 report.

### Pull Requests

#### Created

- [#368](https://github.com/bounswe/bounswe2024group5/pull/368): Use Quiz view in profile page, and delete&edit buttons, and backend integration.
- [#415](https://github.com/bounswe/bounswe2024group5/pull/415): `file/upload` endpoint, dynamic IP address variable, fetch user data in profile page, home page fixes, API calls for Quiz Solve screen.
- [#449](https://github.com/bounswe/bounswe2024group5/pull/449): Forum screen UI improvements, `autocomplete` endpoint hot-fix.

#### Reviewed/Merged

- [#362](https://github.com/bounswe/bounswe2024group5/pull/362): Initialize mobile profile pages and bugfixes.
- [#370](https://github.com/bounswe/bounswe2024group5/pull/370): Home page touches and quiz filtering.
- [#374](https://github.com/bounswe/bounswe2024group5/pull/374): Quiz welcome screen.
- [#446](https://github.com/bounswe/bounswe2024group5/pull/446): Final touches and fixes for the milestone.

#### Challenges

I encountered great difficulty trying to merge my branch `366-mobile-api-calls` to main in PR [#415](https://github.com/bounswe/bounswe2024group5/pull/415). [Arınç](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) and I were modifying the same files, and I messed up with the VS Code's resolve conflict view. The issues escalated very quickly combining with my weak internet connection and huge amount of file changes trying to be committed. I retried merging the branch 4 times, resolving the same conflicts in the register screen, more than 8 times. I sought help from my teammates in the mobile team. And with patience and some caffeine, I finally managed to made the PR to merge the branch successfully, without losing the changes we have made. ([click to witness my desperation](https://github.com/bounswe/bounswe2024group5/commit/e70029b24dc41e0dfe3d17017df91fc2d00633d6)).

### Additional Information

I value the quality of documentation. Thus, I frequently review our wiki pages, specifically the home page and sidebar. I add links to missing recent meeting notes and lab reports. I also add the group's issues to the Github [Project](https://github.com/orgs/bounswe/projects/67), and add missing labels to the issues whenever I locate them.

## 5.3 [FAHREDDİN ÖZCAN](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan)

### Responsibilities

Frontend Development, Conceptual Research, Meeting Notes Organiser, Testing Implementation, Integration Management, and Documentation (Requirements and Diagrams)

### Main Contrubutitons

During Milestone 2, I focused on establishing frontend testing practices and implementing core features using backend APIs. I set up React Testing Library infrastructure for component testing and developed comprehensive testing guidelines in our Software Quality Plan. This helped maintain code quality standards across the platform.

For feature development, I implemented the quiz solving system which tracks user progress through questions, allows pausing/resuming attempts, and provides navigation between questions. I built this with an emphasis on user experience, adding features like progress indicators and difficulty badges. The system integrates with our backend APIs to store user answers and calculate scores.

To improve data quality and user experience, I implemented word autocomplete functionality for both quiz questions and forum tags. This standardizes language input while helping users with word suggestions. I also added file upload capabilities for quiz images and profile photos using Google Cloud Storage, making the platform more visually engaging.

I enhanced the profile system by integrating forum activity display and quiz history. The profile page now shows user's quiz attempts, created quizzes, and forum participation in a unified view. This required careful API integration and state management using React Query to handle complex data relationships.

For project quality, I implemented WAI-ARIA accessibility standards and worked on maintaining consistent UI/UX between mobile and web platforms. I collaborated extensively with the mobile team to ensure feature parity and design system.

### API Contributions

I developed core frontend features using our APIs, such as quiz progress management, image upload for profile and quiz pages, and word autocomplete. While implementing the REST API requests and response data, I used React Query library for client side memory.

1.  Quiz Attempts API:
    We are keeping track of the user's progression in the quizzes. When a user clicks on a quiz, we create an attempt for that quiz. As the user keeps solving questions, we send the answer of user to backend to keep in the related attempt.

        - **POST `/api/question-answers`**: Records user's answers during quiz solving

```typescript
const response = await fetch(`${hostUrl}/api/question-answers`, {
method: 'POST',
headers: {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  quizAttemptId,
  questionId,
  answer
}),
});

// Response
{
"id": 789,
"quizAttemptId": 123,
"questionId": 456,
"answer": "book",
"isCorrect": true,
"updatedAt": "2024-11-29T10:30:00Z"
}
```

By using the API above, we're now aware of the users quiz progression. In order to utilize this data, we fetch the attempt details from the api, and then render the quiz on the frontend with the data from the backend. Once we got the response, we fill in the users answer to quiz, and then navigate them to the last question unsolved.

- **GET `/api/quiz-attempts`**: Fetches quiz progress and attempts

```typescript
const params = new URLSearchParams();
if (filters?.isCompleted) params.append("isCompleted", "true");
if (filters?.quizId) params.append("quizId", quizId.toString());

const response = await fetch(
  `${hostUrl}/api/quiz-attempts?${params.toString()}`,
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  }
);

[
  {
    id: 123,
    userId: 456,
    quizId: 789,
    score: 85,
    completed: true,
    completedAt: "2024-11-29T10:35:00Z",
    updatedAt: "2024-11-29T10:35:00Z",
  },
];
```

2. File Upload API
   As per the feedback we've received in the milestone 1, we've decided to add image upload feature to Quizzard. This feature exists both in the user profile, and in the quiz creation page. In the quiz creation form, we provide option to upload the image from local. Once the image is uploaded, we recieve the image url and pass to quiz data while creating the quiz. This enabled us to make the UI more colorful.

- **POST `/api/file/upload`**: Uploads the file to the Google Cloud Bucket

```typescript
mutationFn: async (file: File) => {
  const TOKEN = sessionStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${hostUrl}/api/file/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return (await response.text()) as string;
};
// Response
("https://storage.googleapis.com/quizzard-images/quiz-123.jpg");
```

3. Word Autocomplete API
   Since we're building an language learning application, our target audience might lack the word knowledge, so while providing word inputs for the questions they can sometimes have typos. Also, in order to keep track of the word data, the pool of the words should be a bit limited. For that, we've built a autocomplete feature, where both on the forum tags and question words, when user types in a prefix, we come up with some suggestions for that prefix. User can select the word from the dropdown displayed.

- **GET `/api/autocomplete`**:

```typescript
const queryParams = new URLSearchParams({
  prefix,
  language: "english" | "turkish",
});

const response = await fetch(`${hostUrl}/api/autocomplete?${queryParams}`, {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Response
["book", "boot", "boom", "booth", "bootstrap"];
```

### Code-related significant issues

- [#452](https://github.com/bounswe/bounswe2024group5/issues/452): Add Frontend Integration and UI Tests [PR #453](https://github.com/bounswe/bounswe2024group5/pull/453)
- [#442](https://github.com/bounswe/bounswe2024group5/issues/442): Subtle UI Fixes [PR #445](https://github.com/bounswe/bounswe2024group5/pull/445)
- [#437](https://github.com/bounswe/bounswe2024group5/issues/437): Integrate Autocomplete API [PR #439](https://github.com/bounswe/bounswe2024group5/pull/439)
- [#435](https://github.com/bounswe/bounswe2024group5/issues/435): Fix difficulty intervals [PR #436](https://github.com/bounswe/bounswe2024group5/pull/436)
- [#433](https://github.com/bounswe/bounswe2024group5/issues/433): Fix Quiz Solving Question Navigation Issue [PR #434](https://github.com/bounswe/bounswe2024group5/pull/434)
- [#419](https://github.com/bounswe/bounswe2024group5/issues/419): Show The Forum Posts on Profile [PR #420](https://github.com/bounswe/bounswe2024group5/pull/420)
- [#416](https://github.com/bounswe/bounswe2024group5/issues/416): Fix Google Credentials [PR #417](https://github.com/bounswe/bounswe2024group5/pull/417)
- [#412](https://github.com/bounswe/bounswe2024group5/issues/412): Frontend UI and Logic Fixes [PR #413](https://github.com/bounswe/bounswe2024group5/pull/413)
- [#404](https://github.com/bounswe/bounswe2024group5/issues/404): Fix Featured Quizzes Card Sizes
- [#402](https://github.com/bounswe/bounswe2024group5/issues/402): Implement Image Upload Feature [PR #431](https://github.com/bounswe/bounswe2024group5/pull/431)
- [#395](https://github.com/bounswe/bounswe2024group5/issues/395): Introduce Tests to Frontend Project [PR #453](https://github.com/bounswe/bounswe2024group5/pull/453)

- [#375](https://github.com/bounswe/bounswe2024group5/issues/375): Implement Quiz Attempts and Progression [PR #376](https://github.com/bounswe/bounswe2024group5/pull/376)
- [#359](https://github.com/bounswe/bounswe2024group5/issues/359): Create Profile Page [PR #392](https://github.com/bounswe/bounswe2024group5/pull/392)
- [#350](https://github.com/bounswe/bounswe2024group5/issues/350): Implement and Document WAI-ARIA standard [PR #347](https://github.com/bounswe/bounswe2024group5/pull/347)

### Management-related significant issues

- [#347](https://github.com/bounswe/bounswe2024group5/issues/347): Lab 5 Content documentation and research
- [#463](https://github.com/bounswe/bounswe2024group5/issues/463): Individual Contribution Table documentation
- [#378](https://github.com/bounswe/bounswe2024group5/issues/378): Create Software Quality Plan
- [#348](https://github.com/bounswe/bounswe2024group5/issues/348): Add Lab Meeting Reports #5

### Pull Requests

#### Created

- [#455](https://github.com/bounswe/bounswe2024group5/pull/455): Update Results Page
- [#453](https://github.com/bounswe/bounswe2024group5/pull/453): Add Frontend Tests
- [#445](https://github.com/bounswe/bounswe2024group5/pull/445): Subtle UI Fixes
- [#439](https://github.com/bounswe/bounswe2024group5/pull/439): Autocomplete API Integration
- [#436](https://github.com/bounswe/bounswe2024group5/pull/436): Fix Quiz Difficulty Intervals
- [#434](https://github.com/bounswe/bounswe2024group5/pull/434): Fix Question Navigation Issue
- [#431](https://github.com/bounswe/bounswe2024group5/pull/431): Profile Photo Upload and Render
- [#420](https://github.com/bounswe/bounswe2024group5/pull/420): Add related forum posts to profile
- [#417](https://github.com/bounswe/bounswe2024group5/pull/417): Fix Google Credentials Source
- [#413](https://github.com/bounswe/bounswe2024group5/pull/413): Subtle UI and UX Improvements
- [#403](https://github.com/bounswe/bounswe2024group5/pull/403): Implement Quiz Images Upload
- [#392](https://github.com/bounswe/bounswe2024group5/pull/392): Profile Page Implementation
- [#376](https://github.com/bounswe/bounswe2024group5/pull/376): Add React Query Hooks for Attempts and Answers
- [#347](https://github.com/bounswe/bounswe2024group5/pull/347): Lab 5 Content PR
- [#352](https://github.com/bounswe/bounswe2024group5/pull/352): Worked on Mobile and Web UI Similarity

#### Reviewed/Merged

- [#451](https://github.com/bounswe/bounswe2024group5/pull/451): Implement Forum Search
- [#438](https://github.com/bounswe/bounswe2024group5/pull/438): Integrate Forum Into Quiz Solving Page
- [#379](https://github.com/bounswe/bounswe2024group5/pull/379): Lab 7 Tasks
- [#353](https://github.com/bounswe/bounswe2024group5/pull/353): Write User Stories
- [#346](https://github.com/bounswe/bounswe2024group5/pull/346): Implement Forum Post Component
- [#457](https://github.com/bounswe/bounswe2024group5/pull/457): Fix Reply Error
- [#454](https://github.com/bounswe/bounswe2024group5/pull/454): Display Related Posts in the Post Page
- [#418](https://github.com/bounswe/bounswe2024group5/pull/418): Save Username to Session on Registration
- [Issue #341](https://github.com/bounswe/bounswe2024group5/issues/341): Create Backend Meeting Notes

#### Challenges

I had real difficulty implementing the quiz progression feature, because I had already implemented the state on the client side, but converting the response from backend and mapping it to the required client state and rendering it was a huge pain point. While implementing, I broke the general flow and spent so much time coming up with a proper workflow.

Time to time, we had problems while having sync with backend team, since both teams were working hard to have their focus points finalized, we sometimes broke the parts needed by other teams.

#### Additional Information

I did the best I could trying to apply best frontend practices everywhere I could, also including the tests. At some points, using brand new/popular tools made it easy to achieve some features, like data fetching, or testing libraries for react. We were able to mock the hooks, functions at some parts, enabling us to write UI tests as well.

## 5.4 [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik)

### Responsibilities

Backend Development, Database Management, Deployment

### Main Contributions

As a member of the backend team, my primary contributions in this milestone revolved around the creation and optimization of the dictionary database, as well as implementing and enhancing critical API endpoints. I also deployed the application before the customer presentation. Below is a detailed summary of my work:

#### Database Contributions

1. **Dictionary Database Creation**:

   - Compiled English-to-Turkish translation data from a publicly available GitHub repository.
   - Imported WordNet data and used it to generate a **sense table**, linking words to their respective senses for semantic analysis.

2. **Word Scores Integration**:

   - Incorporated word scores into the English table. These scores were based on word usage frequency data provided by **Deniz** and **Süleyman**. My role involved integrating the scores seamlessly into the database.

3. **Optimization**:
   - Addressed performance issues in SQL queries fetching related posts by adding indexes to database tables, significantly improving query execution times.

#### API Contributions

1. **Endpoints Implementation**:

   - **Search Endpoint**:

     - Developed an endpoint to handle semantic search requests. This involved linking categories and synonyms from the database to provide more accurate and meaningful results.

   - **Related Posts Endpoint**:

     - Implemented an endpoint for fetching posts related to a given post. To enhance its performance:
       - Optimized slow SQL queries with additional indexing.
       - Introduced a caching mechanism to reduce response times from ~10 seconds to significantly faster subsequent executions.
     - The query takes the post id as a parameter and returns the related posts.

       - **GET `/api/posts/{postId}/relatedPosts`**:
       - Example Response:

       ```json
       [
         {
           "id": 5,
           "username": "a",
           "title": "An apple a day keeps the doctor away.",
           "content": "I was wondering what does \"an apple a day keeps the doctor away\" mean?",
           "tags": ["apple"],
           "noUpvote": 1,
           "noReplies": 3,
           "createdAt": "2024-11-25T17:00:02.000+00:00",
           "updatedAt": "2024-11-25T17:00:02.000+00:00"
         },
         {
           "id": 16,
           "username": "arinc",
           "title": "Journey, Trip, Voyage",
           "content": "I’m confused about the word 'journey.' How is it different from 'trip' or 'voyage'?",
           "tags": ["journey", "trip", "voyage"],
           "noUpvote": 1,
           "noReplies": 1,
           "createdAt": "2024-11-26T12:43:55.000+00:00",
           "updatedAt": "2024-11-26T12:43:55.000+00:00"
         }
       ]
       ```

     - Here is the SQL query that I used to fetch related posts:

     ```sql
        SELECT fp.*
        FROM (
            SELECT post_id, MIN(query_order) AS query_order, MAX(max_category_id) AS max_category_id
            FROM (
                SELECT
                    post_id,
                    1 AS query_order,
                    NULL AS max_category_id
                FROM post_tags
                WHERE english_id IN (
                    SELECT DISTINCT english_id
                    FROM post_tags
                    WHERE post_id = :postId
                )
                AND post_id != :postId
                UNION ALL
                SELECT
                    post_id,
                    2 AS query_order,
                    NULL AS max_category_id
                FROM post_tags
                WHERE english_id IN (
                    SELECT DISTINCT english_id
                    FROM word_to_sense
                    WHERE sense_id IN (
                        SELECT DISTINCT sense_id
                        FROM word_to_sense
                        WHERE english_id IN (
                            SELECT DISTINCT english_id
                            FROM post_tags
                            WHERE post_id = :postId
                        )
                    )
                )
                AND post_id != :postId
                UNION ALL
                SELECT pt2.post_id AS post_id, 3 AS query_order, MAX(t2.category_id) AS max_category_id
                FROM post_tags pt1
                JOIN translate t1 ON pt1.english_id = t1.english_id
                JOIN translate t2 ON t1.category_id = t2.category_id
                JOIN post_tags pt2 ON t2.english_id = pt2.english_id
                WHERE pt1.post_id = :postId
                AND pt2.post_id <> :postId
                GROUP BY pt2.post_id
            ) combined
            GROUP BY post_id
        ) AS related_posts
        LEFT JOIN forum_posts fp
        ON related_posts.post_id = fp.id
        ORDER BY related_posts.query_order ASC, related_posts.max_category_id DESC, related_posts.post_id DESC;
     ```

   - **Feed Endpoint**:
     - Created an endpoint that returns posts ordered by their creation timestamps.

2. **Pagination**:
   - Implemented pagination across all the endpoints mentioned above to reduce response sizes and avoid redundant posts in responses.

### Challenges Overcome

- Collaborated effectively with **Deniz** and **Süleyman** to integrate complex datasets and ensure accurate representation in the database.
- Tackled and resolved slow query execution issues through indexing and caching.
- Ensured efficient API performance by designing scalable and responsive database interactions.

These contributions significantly enhanced our application's backend functionality, ensuring smooth performance and improved user experience.

#### Code-related significant issues

- [#383](https://github.com/bounswe/bounswe2024group5/issues/383): Integrate WordNet Data and Scoring into Database
- [#390](https://github.com/bounswe/bounswe2024group5/issues/390): Implement Search and Related Posts Endpoints

#### Reviewed/Merged

- [#444](https://github.com/bounswe/bounswe2024group5/pull/444)
- [#443](https://github.com/bounswe/bounswe2024group5/pull/443)
- [#441](https://github.com/bounswe/bounswe2024group5/pull/441)
- [#406](https://github.com/bounswe/bounswe2024group5/pull/406)
- [#399](https://github.com/bounswe/bounswe2024group5/pull/399)
- [#386](https://github.com/bounswe/bounswe2024group5/pull/386)
- [#373](https://github.com/bounswe/bounswe2024group5/pull/373)

#### Pull Requests:

- [#410](https://github.com/bounswe/bounswe2024group5/pull/410): Add search endpoints to api doc
- [#407](https://github.com/bounswe/bounswe2024group5/pull/407): Implement Semantic Search
- [#382](https://github.com/bounswe/bounswe2024group5/pull/382):
  Add word senses and scores to database

#### Additional Information

I also deployed the application to the cloud before the customer presentation. After the deployment, I also tested the application and addressed the issues that occured after the deployment.

## 5.5 [ÖZGÜR DENİZ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir)

#### Responsibilities

Frontend Development, Algorithmic Research and Development, API Integration with Backend, Documentation

#### Main Contributions

For the second milestone, my main focus was on implementing the forum page for our application. I developed and refined the core components and pages of the forum page, such as post component, reply component, search bar etc...

I also integrated those components with the necessary backend API endpoints to create fully functional pages.

As well as writing a stand-alone forum page, I embedded forum posts into the quiz solving page to enable the users to see related posts without leaaving the quiz solving page.

I also implemented auto-complete feature for quiz creating page.

#### API Contributions

I integrated forum related API endpoints to the forum page. Two important one are as follows.

1. Related Posts Endpoint: This endpoints returns posts that are related to the post currently displayed. It helps users discover similar posts on the same topic.

- **GET `/api/posts/{postId}/relatedPosts`**:

```typescript
export const useFetchRelatedPosts = (postId: number | null) => {
  const TOKEN = sessionStorage.getItem("token");
  const hostUrl = useContext(HostContext);

  return useQuery({
    queryKey: ["related-posts", postId],
    queryFn: async () => {
      if (postId === null) return null;
      const response = await fetch(`${hostUrl}/api/posts/${postId}/related`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch replies!");
      }
      const body = await response.json();
      return body as ForumPost[];
    },
  });
};

// Response
[
  {
    id: 15,
    username: "arinc",
    title: "Ambition and Hope",
    content:
      "Can someone explain the difference between 'ambition' and 'hope'? They both seem to involve wanting something in the future.",
    tags: ["ambition", "hope"],
    noUpvote: 1,
    noReplies: 1,
    createdAt: "2024-11-26T12:42:43.000+00:00",
    updatedAt: "2024-11-26T12:42:43.000+00:00",
  },
  {
    id: 8,
    username: "ebrar",
    title: "The usage of “fight” vs. “battle” etc.",
    content:
      'Hi everyone! 😊\nI\'m curious about the word "fight" and its synonyms. For example, when should I use "fight" instead of words like "battle," "struggle," or "quarrel"? Are they interchangeable, or do they have specific contexts? I also wonder if "fight" always means something physical or if it can describe emotional or verbal conflicts too.\n\nCould you share examples of how these words are used in daily conversations or in writing? Thank you! 🙏',
    tags: ["fight", "battle"],
    noUpvote: 0,
    noReplies: 0,
    createdAt: "2024-11-26T11:11:51.000+00:00",
    updatedAt: "2024-11-26T11:11:51.000+00:00",
  },
];
```

2. Get posts that are related to a certain word. We used this endpoint to fetch posts that are related to the words in the quiz solving page. This helps user read posts about words that confuses them without leaving the quiz solving page.

- **GET `/api/posts?tag=<word>`**:

```typescript

export const useFetchPosts = (params?: { username?: string; tag?: string }) => {
    const TOKEN = sessionStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    return useQuery({
        queryKey: ['posts', params],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (params?.username) queryParams.append('username', params.username);
            if (params?.tag) queryParams.append('tag', params.tag);

            const url = `${hostUrl}/api/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const body = await response.json();
            return body as ForumPost[];
        }
    });
};

// Response


    {
        "id": 11,
        "username": "semir12",
        "title": "How Do I Use \"Ineffable\" Correctly?",
        "content": "I've recently come across the word ineffable and understand it means something too great or extreme to be expressed in words. Could someone provide examples of how this word might be used in sentences? Also, how does it compare to words like indescribable or unspeakable?",
        "tags": [
            "ineffable"
        ],
        "noUpvote": 0,
        "noReplies": 3,
        "createdAt": "2024-11-26T12:13:22.000+00:00",
        "updatedAt": "2024-11-26T12:13:22.000+00:00"
    },
    {
        "id": 14,
        "username": "semir12",
        "title": "\"Ineffable\" in Everyday Conversations",
        "content": "I’ve noticed that ineffable is often used in poetic or formal contexts, but can it also be applied in everyday conversations? For instance, could I use it to describe a delicious meal or a fun day with friends? I’d love examples or opinions on when it feels appropriate to use this word casually.",
        "tags": [
            "ineffable"
        ],
        "noUpvote": 0,
        "noReplies": 3,
        "createdAt": "2024-11-26T12:24:23.000+00:00",
        "updatedAt": "2024-11-26T12:24:23.000+00:00"
    }
]

```

#### Code-related significant issues

- [#345](https://github.com/bounswe/bounswe2024group5/issues/345): Implement forum frontend
- [#438](https://github.com/bounswe/bounswe2024group5/issues/438): Integrate forum into quiz solving page
- [#448](https://github.com/bounswe/bounswe2024group5/issues/448): Forum search

#### Management Related Significant Issues

- [#379](https://github.com/bounswe/bounswe2024group5/issues/379): Document the user experience decisions made in the previous lab.

#### Pull Requests:

- [346](https://github.com/bounswe/bounswe2024group5/pull/346): implement forum
- [406](https://github.com/bounswe/bounswe2024group5/pull/406): enable cors
- [418](https://github.com/bounswe/bounswe2024group5/pull/418): save username to session storage
- [447](https://github.com/bounswe/bounswe2024group5/pull/447): integrate forum to quiz solving page
- [451](https://github.com/bounswe/bounswe2024group5/pull/451): implement forum search
- [454](https://github.com/bounswe/bounswe2024group5/pull/454): related posts
- [457](https://github.com/bounswe/bounswe2024group5/pull/457): fix reply error

#### Additional Information

I documented ARIA standard [here](https://github.com/bounswe/bounswe2024group5/wiki/W3C-Standards).

## 5.6 [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)

### Responsibilities

Mobile Development

### Main Contributions

I collaborated with Arınç and Ebrar during lab sessions to implement a word validity check. This feature ensures users enter valid words by verifying their input against a predefined dictionary, providing a smoother and more reliable interaction with the app.

A significant part of my work focused on improving the mobile user interface to align more closely with the web application. I addressed discrepancies to enhance consistency and usability, creating a unified look and feel.

In addition, I took charge of the development of mobile profile and profile settings pages. This involved not only designing and implementing the pages but also integrating API calls that enabled full functionality, such as user data retrieval and updates.

Furthermore, I worked extensively on the forum page, implementing crucial API calls to manage features like post details, comments, and upvotes. This added interactivity to the forum, allowing users to engage meaningfully within the platform. These contributions were delivered through pull requests that also addressed bugs and improved the reliability of the home and forum screens.

###API Contributions

least 1 complex API endpoint you have developed if you worked as a back-end
developer, or at least 1 complex API endpoint you have used if you worked as a
front-end / mobile developer. Example call and response should be provided.
Document here in what context / scenario the specific API endpoint is used in the
project.

### Code-related Significant Issues

- Add Domain-Specific Check to the Mobile, for Ensuring the Users Enter Valid Words [#349](https://github.com/bounswe/bounswe2024group5/issues/349)
- Increase Similarity between Mobile and Web UI [#355](https://github.com/bounswe/bounswe2024group5/issues/355)
- Finalize Mobile Profile Pages for Milestone, add API Calls etc. [#360](https://github.com/bounswe/bounswe2024group5/issues/360)
- Initialize Profile and Profile Settings Page for Mobile [#361](https://github.com/bounswe/bounswe2024group5/issues/361)
- Add Mobile API Calls for Forum Page, Post Details, Comments and Upvotes [#423](https://github.com/bounswe/bounswe2024group5/issues/423)

### Management-related Significant Issues

No Issue.

### Pull Requests

- Created Adding mobile api calls for Profile and Forum Page, enhancing forum Page: [#426](https://github.com/bounswe/bounswe2024group5/pull/426)
- Initialize mobile Profile and Profile Settings Pages, fixing bugs in Home and Forum Screen: [#362](https://github.com/bounswe/bounswe2024group5/pull/362)

I faced no conflicts in my Pull Requests.

### Challenges

The main challenge I faced was some endpoints I already implemented was not working after the latests deployment in our backend, Ebrar helped and solved that issue by configuring the endpoint accordingly to changed version.

### Additional information

Generally I take the APK builds. For this milestone's final apk build, I led the process of using expo and taking apk builds.

## 5.7 [SEMİH YILMAZ](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz)

## 5.8 [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan)

### Responsibilities

Back-end team, Documentation and Implementation, Testing Implementation

### Main contributions

Since our application is based on the user improving their language skills by solving quizzes, one of the conditions that must be certain in our application is that there is a scoring system for words, quizzes and users. In this scoring system, I developed an algorithm to calculate the scores of the words in our database. Then, by calculating the average scores of the words, I calculated the scores of the quizzes and therefore their difficulty levels. Then, I developed a score system for how the user score changes after solving the quiz. Then, after various trials, I mapped the scores according to the CEFR levels. This was the longest, most tiring and, in my opinion, the most important job I did in this milestone.

Apart from these, I wrote the question and quiz favorite endpoints that we have not yet added to our application but prepared the backend side.

One of the features that I consider essential in our application is uploading images and GIFs. I added the file/upload feature for the use of mobile and frontend teams. Thus, images and GIFs uploaded by the user were allowed in user profiles and quizzes. This added color to our application.

One of the features we found necessary for users to be comfortable while using the application was the auto-complete feature. Thus, the user will be able to easily find a word that they do not fully remember in English and use it in quizzes and forums. I also developed this feature for Turkish.

Finally, I wrote unit tests for autocomplete, wordchecker controllers and favoritequiz service.

Apart from these, I tried to make the biggest contribution I could to the development of our application by coming to all labs and staying in constant communication with my friends via teams and whatsapp. Finally, I was one of the main writer of this report.

### API Contributions

As I mentioned above, I wrote the file-upload, autocomplete, favoriteQuiz, favoriteQuestion, difficulty algorithm and scoring system that we thought were very necessary for our application.

#### 1. File upload:

We let user to upload any image and GIF to quizzes and their profile pictures.

```java
//Controller:
@PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileUploadService.uploadFile(file);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not uploading file" + e.getMessage());
        }
    }
//Service:
public String uploadFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        storage.create(blobInfo, file.getBytes());

        return String.format("https://storage.googleapis.com/%s/%s", bucketName, fileName);
    }
```

Fail response:

```json
{
  "path": "/file/upload",
  "error": "Unauthorized",
  "message": "Full authentication is required to access this resource",
  "status": 401
}
```

Successful response:

```json
"https://storage.googleapis.com/quizzard-bucket/dcebfb60-f928-48c1-94a2-4c3cbad85080-example.png"
```

#### 2. Auto-complete:

```java
//Controller:
@GetMapping
    public List<String> autoCompleteSuggestions(@RequestParam String prefix, @RequestParam String language) {

        if (language.equals("turkish")) {
            return turkishRepository.findTop5ByWordStartingWith(prefix)
                    .stream()
                    .toList();
        } else if (language.equals("english")) {
            return englishRepository.findTop5ByWordStartingWith(prefix)
                    .stream()
                    .toList();
        } else {
            return List.of();
        }
    }
// Repository
@Query("SELECT e.word FROM English e WHERE e.word LIKE :prefix% AND e.score != 2000 ORDER BY e.score LIMIT 10")
    List<String> findTop5ByWordStartingWith(@Param("prefix") String prefix);
@Query(value = """
    SELECT word
    FROM (
        SELECT t.word, MIN(e.score) AS score
        FROM turkish t
        INNER JOIN translate tr ON t.id = tr.turkish_id
        INNER JOIN english e ON e.id = tr.english_id
        WHERE t.word LIKE :prefix%
          AND e.score != 2000
          AND t.word NOT LIKE '% %'
        GROUP BY t.word
    ) AS sub
    ORDER BY score
    LIMIT 10
    """,
            nativeQuery = true)
    List<String> findTop5ByWordStartingWith(@Param("prefix") String prefix);
```

Responses (for prefix "ne"):

```json
[
  "new",
  "need",
  "never",
  "next",
  "news",
  "needs",
  "near",
  "network",
  "nearly",
  "necessary"
]
```

#### 3. FavoriteQuiz:

```java
//Controller for Post /favorite-quiz
@PostMapping
    public ResponseEntity<FavoriteQuizResponse> addFavoriteQuiz(@RequestHeader("Authorization") String jwtToken,
                                                        @RequestBody FavoriteQuizRequest favoriteQuizRequest) {

        FavoriteQuizResponse favoriteQuiz = favoriteQuizService.addFavoriteQuiz(jwtToken, favoriteQuizRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(favoriteQuiz.getId())
                .toUri();
        return ResponseEntity.created(location).body(favoriteQuiz);
    }
//Service
public FavoriteQuizResponse addFavoriteQuiz(String jwtToken, FavoriteQuizRequest favoriteQuizRequest) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);

        FavoriteQuiz favoriteQuiz = favoriteQuizRepository.findByUserIdAndQuizId(user.getId(), favoriteQuizRequest.getQuizId())
                .orElse(null);
        if (favoriteQuiz != null) {
            throw new RuntimeException("You have already added this quiz to favorites.");
        }
        Quiz quiz = quizRepository.findById(favoriteQuizRequest.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + favoriteQuizRequest.getQuizId()));
        FavoriteQuiz favoriteQuiz2 = new FavoriteQuiz();
        favoriteQuiz2.setUser(user);
        favoriteQuiz2.setQuiz(quiz);
        favoriteQuiz2.setCreatedAt(new Date());
        favoriteQuizRepository.save(favoriteQuiz2);
        return new FavoriteQuizResponse(favoriteQuiz2);
    }

//Repository:
Optional<FavoriteQuiz> findByUserIdAndQuizId(Long userId, Long quizId);
```

Request:

```json
{
  "quizId": "2"
}
```

Failed responses:

```json
{
    "path": "/favorite-quiz",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
"Quiz not found with id: 3"
"You have already added this quiz to favorites."
```

Successful responses:

```json
{
  "id": 2,
  "userId": 7,
  "quizId": 2,
  "createdAt": "2024-11-29T17:24:03.650+00:00",
  "updatedAt": "2024-11-29T17:24:03.650+00:00"
}
```

### Code related significant issues

- [#424](https://github.com/bounswe/bounswe2024group5/issues/424): Revise for autocomplete
- [#391](https://github.com/bounswe/bounswe2024group5/issues/391): Favorite quiz and question endpoints
- [#387](https://github.com/bounswe/bounswe2024group5/issues/387): File upload
- [#372](https://github.com/bounswe/bounswe2024group5/issues/372): Difficulty algorithm and score system
- [#351](https://github.com/bounswe/bounswe2024group5/issues/351): Word checker

### Pull requests

#### Created

- [#443](https://github.com/bounswe/bounswe2024group5/pull/443): Error about quiz score calculation fixed
- [#440](https://github.com/bounswe/bounswe2024group5/pull/440): Implemented some unit tests
- [#425](https://github.com/bounswe/bounswe2024group5/pull/425): Autocomplete for English words and Turkish words
- [#422](https://github.com/bounswe/bounswe2024group5/pull/422): Favorite quiz and question endpoints
- [#388](https://github.com/bounswe/bounswe2024group5/pull/388): File upload functionality for backend
- [#373](https://github.com/bounswe/bounswe2024group5/pull/373): Difficulty algorithm and score system
- [#354](https://github.com/bounswe/bounswe2024group5/pull/354): Initial version of autocomplete
- [#347](https://github.com/bounswe/bounswe2024group5/pull/347): Word-checker endpoint

#### Merged/Reviewed

- [#429](https://github.com/bounswe/bounswe2024group5/pull/429): Small API correction
- [#428](https://github.com/bounswe/bounswe2024group5/pull/428): Correct answer suggestion endpoint
- [#421](https://github.com/bounswe/bounswe2024group5/pull/421): Update for /quizzes endpoints
- [#382](https://github.com/bounswe/bounswe2024group5/pull/382): Word senses and scores
- [#381](https://github.com/bounswe/bounswe2024group5/pull/381): Forum Post Related Endpoints
- [#363](https://github.com/bounswe/bounswe2024group5/pull/363): Implemented question answers backend
- [#357](https://github.com/bounswe/bounswe2024group5/pull/357): Implement quiz attempts backend

# 6. Deliverables

## 6.1 Project Repository

You can access our project [repository](https://github.com/bounswe/bounswe2024group5).

## 6.2 RAM (Responsibility Assignment Matrix)

You can access our project RAM [wiki](<https://github.com/bounswe/bounswe2024group5/wiki/RAM-(Responsibility-Assignment-Matrix)>).

## 6.3 A pre-release Version of our Software

You can access the customer-milestone-2 [release](https://github.com/bounswe/bounswe2024group5/releases/tag/customer-milestone-2).

## 6.4 UX Design

With the focus of domain specificity, we did some changes to our UX design, some of them including:

- When user tries to input a word both in the forum post creation and quiz creation, we provide them with the suggestions of english words with a dropdown. With this, even the users with low english word knowledge can type in their target words.

- We've implemented quiz progression tracking, which allows the users keep solving quizzes where they left off. So they don't have to type in the words they've already studied.

- Users can see the quizzes other players have solved, which enables users to learn about new and high quality quizzes.

- While solving quizzes, users can see the related posts for that word, which enables them to learn about the word at instant if they would like to have some guidance.

- Within a forum post, users can see related posts, which enables them to access other resources and knowledge easier with fewer clicks.

## 6.5 Utilized Standards

### ARIA

The ARIA (Accessible Rich Internet Applications) standard enhances web accessibility by adding roles, states, and properties to HTML elements. It helps assistive technologies (like screen readers) interpret complex UI components and make them accessible to users with disabilities.

Examples

- **role="main"**: Describes the main content area of the page for screen readers.

```html
<main role="main" aria-label="Quiz listing page"></main>
```

- **aria-label** for buttons and links

```html
<link to="/add-quiz" aria-label="Create a new quiz" />
```

- **aria-labelledby** for section headings

```html
<section aria-labelledby="all-quizzes-section">
  <h2 id="all-quizzes-section">All Quizzes</h2>
</section>
```

- **aria-label** for interactive components

```html
<select
  aria-label="Filter quizzes by difficulty level"
  aria-description="Filter quizzes by learning difficulty: beginner, intermediate, or advanced"
></select>
```

- **aria-label** for dynamic quiz listings

```html
<div
  role="listitem"
  aria-label="Educational quiz: Advanced Math - Advanced level quiz"
></div>
```

- **aria-label** for search input

```html
<input aria-label="Search quizzes" role="searchbox" />
```

- **aria-label** for pagination

```html
<div aria-label="Quiz pagination">
  <Pagination aria-label="Page 1 of 10" />
</div>
```

## 6.6 API Documentation

API documentation provides detailed information on how to interact with our system's endpoints. We have included a few examples below, and you can access the full API documentation [here](https://editor.swagger.io/?url=https://raw.githubusercontent.com/bounswe/bounswe2024group5/refs/heads/main/doc/api-design.yml).

### 6.6.1 Post /auth/login

- Example schema:

  - ![image](https://github.com/user-attachments/assets/01d62a30-6697-48f4-892d-c59b1a86584c)

- Responses:

  - 200:

    - ![image](https://github.com/user-attachments/assets/7cf9145e-7e62-420e-9e09-ff7dafcf22b9)

  - 401:
    - ![image](https://github.com/user-attachments/assets/d1e98b17-0bbe-4151-aa8d-1445487c664d)

### 6.6.2 Get /autocomplete?prefix={prefix}&language={language}

- Example schema:

  - ![image](https://github.com/user-attachments/assets/c8349a7a-5b62-438a-8163-d5a12d8c0c90)

- Responses:

  - 200:

    - ![image](https://github.com/user-attachments/assets/6a69dc51-9867-48d1-a5cd-d8b0dd60fc43)

  - 400:
    - ![image](https://github.com/user-attachments/assets/cea09acb-0ba3-4e6d-9574-82ff1342050b)

### 6.6.3 Get /quizzes

- Example schema (with optional parameters):

  - ![image](https://github.com/user-attachments/assets/6363c470-0e98-4f20-8aa4-0ec610d826f0)

- Response:
  - 200:
    - ![image](https://github.com/user-attachments/assets/1538c099-530a-4736-ba8c-1d5920f7eb4c)

### 6.6.4 Delete /quiz-attempts/{id}

- Example schema:

  - ![image](https://github.com/user-attachments/assets/ee4d37bb-4e1d-4eae-9627-6c46e86558f9)

- Response:

  - ![image](https://github.com/user-attachments/assets/d09777e7-6bab-44d4-b227-b2e37a67d33d)

Note that the delete request does not expect a response.

# 7. Testing

## 7.1 General Testing Plan

<details>
<summary>Toggle Plan</summary>

## 1. Test Coverage

- Unit Tests
- Integration Tests
- E2E Tests

## 2. Testing Scope

### Backend (Spring)

1. **Coverage Goals**

   - Service Layer: 80% coverage
   - Controller Layer: 80% coverage
   - Repository Layer: 70% coverage

2. **Testing Areas**
   - API endpoints
   - Database integration
   - Authentication flows
   - Business logic validation

### Frontend (React)

1. **Unit Testing**

   - Components testing
   - Hooks testing
   - Utility functions
   - State management

2. **Integration Testing**

   - React Router navigation
   - API integration
   - Form submissions
   - User flows

3. **Quality Metrics**
   - Code coverage: 75%
   - Build status
   - Browser compatibility
   - Performance metrics

### Mobile Application Testing (React Native)

1. **Coverage Goals**

   - Unit Testing: 75% coverage
   - Integration Testing: 75% coverage

2. **Testing Areas**

   - **Unit Testing**
     - Components testing
     - Native module integration
     - Platform-specific code
     - Offline functionality
   - **Integration Testing**
     - Navigation stack
     - Device API integration
     - Push notifications
     - Data persistence

3. **Quality Metrics**

   - Code coverage: 75%
   - App size and performance
   - Device compatibility
   - Crash-free rate: 99.9%
   - Battery efficiency testing

4. **End-to-End Testing**

   - Critical user flows:
     - User registration and login
     - Profile updates
     - Data synchronization

5. **Performance Benchmarks**
   - App launch time: < 2 seconds
   - Navigation responsiveness: < 100ms

</details>

## 7.2 Unit Tests

### 7.2.1 Backend

<details>
<summary>Report</summary>

#### 7.2.1.1 Test Execution Summary

- Total Test Files: 13 file (3 controllers and 10 services)
- Total Tests: 76 passed (88% pass rate)
- Execution Time: 3.256s

#### 7.2.1.2 Test Distribution

- AutoCompleteTest.java: 1 test (passed)
- PostControllerTest.java: 1 test (fail)
- WordCheckerTest.java: 5 tests (5 passed)
- AnswerSuggestionServiceTest.java: 6 tests (6 passed)
- FavoriteQuizServiceTest.java: 7 tests (7 failed)
- PostServiceTest.java: 14 tests (14 passed)
- QuestionAnswerServiceTest.java: 7 tests (6 passed)
- QuestionServiceTest.java: 4 tests (4 passed)
- QuizAttemptServiceTest.java: 8 tests (8 passed)
- QuizServiceTest.java: 8 tests (8 passed)
- ReplyServiceTest.java: 8 tests (8 passed)
- UpvoteServiceTest.java: 10 tests (9 passed)
- UserServiceTest.java: 6 tests (6 passed)

#### 7.2.1.3 Coverage Analysis

Overall Coverage:

- Classes: 40% (31/77)
- Methods: 27% (70/257)
- Lines: 39% (393/987)
- Branches: 27% (123/451)

Notable Coverage:

- controller

  - Classes: 7% (1/13)
  - Methods: 1% (1/54)
  - Lines: 6% (9/144)
  - Branches: 20% (8/40)

- service
  - Classes: 78% (11/14)
  - Methods: 69% (48/69)
  - Lines: 62% (303/485)
  - Branches: 48% (112/233)

#### 7.2.1.4 Next Steps

1. Create tests for untested components
2. Get %100 rate for tests
3. Improve coverage of services and controllers
</details>

### 7.2.2 Frontend

<details>
<summary>Report</summary>

#### 7.2.2.1 Test Execution Summary

- Total Test Files: 5 passed
- Total Tests: 32 passed (100% pass rate)
- Execution Time: 3.23s
  - Transform: 766ms
  - Setup: 2.37s
  - Collection: 1.17s
  - Tests: 351ms
  - Environment: 2.63s
  - Preparation: 585ms

#### 7.2.2.2 Test Distribution

- `add-quiz-page.test.tsx`: 4 tests
- `list-quiz-page.test.tsx`: 6 tests
- `profile-page.test.tsx`: 9 tests
- `solve-quiz-page.test.tsx`: 12 tests
- `components/forum/CreatePost.test.tsx`: 1 test

#### 7.2.2.3 Coverage Analysis

Overall Coverage:

- Statements: 4.94%
- Branches: 4.65%
- Functions: 6.17%
- Lines: 5.08%

Notable Coverage:

- CreatePost.tsx (forum component) shows good coverage:
  - Statements: 83.92%
  - Branches: 71.87%
  - Functions: 80%
  - Lines: 85.18%

#### 7.2.2.4 Issues

- React 18 compatibility warnings present
- Deprecated ReactDOM.render usage detected
- ReactDOMTestUtils.act deprecation warnings

#### 7.2.2.5 Next Steps

1. Create test plan for untested components
2. Update deprecated test methods
3. Improve coverage of critical user paths
4. Set up CI for coverage tracking
</details>

### 7.2.3 Mobile

<details>
<summary>Report</summary>

#### 7.2.3.1 Test Execution Summary

- **Total Test Files:** 1
- **Total Test Suites:** 1
  - **Passed:** 0
  - **Failed:** 1
- **Total Tests:** 3
  - **Passed:** 0 (0% pass rate)
  - **Failed:** 3
- **Execution Time:** 0.977s

#### 7.2.3.2 Test Distribution

- `ProfileSettingsScreen.test.js`: 3 tests
  - `successfully updates the profile without changing the profile picture`
  - `successfully updates the profile with changing the profile picture`
  - `handles API failure when updating the profile`

#### 7.2.3.3 Coverage Analysis

Overall Coverage:

- Statements: _Data not available_
- Branches: _Data not available_
- Functions: _Data not available_
- Lines: _Data not available_

_Note: Coverage data is unavailable due to test failures._

#### 7.2.3.4 Issues

- **Test Failures:**
  - All test cases in `ProfileSettingsScreen.test.js` are failing.
  - **Error Summary:**
    - No tests were executed successfully.
    - Possible reasons include:
      - Incorrect test setup or configurations.
      - Missing or improperly mocked dependencies.
      - Syntax or runtime errors in test files.
- **Environment Warnings:**
  - Potential issues with React Native testing environment setup.
  - Missing or outdated dependencies may contribute to test failures.

#### 7.2.3.5 Next Steps

1. **Investigate Test Failures:**
   - Review error logs to identify the root causes of the test failures.
   - Ensure all necessary dependencies and mocks are correctly configured.
2. **Fix Test Configurations:**
   - Verify the testing environment setup for React Native.
   - Update or correct any misconfigurations in test files.
3. **Implement Remaining Tests:**
   - Implement all remaining test coverage by adding more test cases for all mobile components.
   - Focus on critical user paths and functionalities.
4. **Improve Coverage Metrics:**
   - Once tests are passing, integrate coverage tools to monitor and improve test coverage.
5. **Allocate Time for Testing:**
   - Prioritize testing tasks in the project timeline to ensure comprehensive coverage in upcoming milestones.

</details>

# Main Authors

[Deniz](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir), [Ebrar](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu), [Semih](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz), [Süleyman](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan)
