# Introduction
This is the first milestone report for our group project, group bounswe2024group5. We are a group of enthusiastic students of CmpE451, committed to building an English Learning app that features posting and solving quizzes, interacting with other language learners in the forums.

Our team members that have contributed to the project:
* [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir)
* [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu)
* [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik)
* [ÖZGÜR DENİZ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir)
* [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)
* [SEMİH YILMAZ](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz)
* [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan)
* [FAHREDDİN ÖZCAN](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan)

*** 

<details>
  <summary>Table of Contents</summary>

- [1. Executive Summary](#1-executive-summary)
  * [1.1 Project Description](#11-project-description)
  * [1.2 Project Status](#12-project-status)
- [2. Customer Feedback and Reflections](#2-customer-feedback-and-reflections)
- [3. List and Status of Deliverables](#3-list-and-status-of-deliverables)
  * [3.1 Evaluation of the status of Deliverables](#31-evaluation-of-the-status-of-deliverables)
  * [3.2 Addressed Requirements](#32-addressed-requirements)
- [4. Evaluation of Tools](#4-evaluation-of-tools)
  * [4.1 GitHub](#41-github)
  * [4.2 Discord](#42-discord)
  * [4.3 WhatsApp](#43-whatsapp)
  * [4.4 Figma](#44-figma)
- [5. Individual Contribution Table](#5-individual-contribution-table)
  * [5.1 ARINÇ DEMİR](#51-ARINÇ-DEMİR)
  * [5.2 ASUDE EBRAR KIZILOĞLU](#52-ASUDE-EBRAR-KIZILOĞLU)
  * [5.3 FAHREDDİN ÖZCAN](#53-FAHREDDİN-ÖZCAN)
  * [5.4 HALİL UTKU ÇELİK](#54-HALİL-UTKU-ÇELİK)
  * [5.5 ÖZGÜR DENİZ DEMİR](#55-ÖZGÜR-DENİZ-DEMİR)
  * [5.6 RAMAZAN ONUR ACAR](#56-Ramazan-Onur-Acar)
  * [5.7 SEMİH YILMAZ](#57-SEMİH-YILMAZ)
  * [5.8 SÜLEYMAN EMİR TAŞAN](#58-SÜLEYMAN-EMİR-TAŞAN)
- [6. Deliverables](#6-deliverables)
  * [6.1 Project Repository](#61-project-repository)
  * [6.2 Requirements](#62-requirements)
    * [6.2.1 Software Requirement Specification](#621-software-requirement-specification)
    * [6.2.2 Software Design - UML Diagrams](#622-software-design---uml-diagrams)
    * [6.2.3 Scenarios](#623-scenarios)
    * [6.2.4 Mockups](#624-mockups)
  * [6.3 Project Plan](#63-project-plan)
  * [6.4 Communication Plan](#64-communication-plan)
  * [6.5 RAM (Responsibility Assignment Matrix)](#65-ram-responsibility-assignment-matrix)
  * [6.6 Weekly Lab Reports](#66-weekly-lab-reports)
  * [6.7 Meeting Notes](#67-meeting-notes)
  * [6.8 A pre-release Version of our Software](#68-a-pre-release-version-of-our-software)
</details>


# 1. Executive Summary 

## 1.1 Project Description
Quizzard is a language learning platform for Turkish speakers. It helps users acquire new vocabulary words by letting them solve quizzes. Those quizzes contain questions that are designed to help users commit new words to their long-term memory by matching words to their translations or meanings.

Users can either solve quizzes that they themselves have created or quizzes created by other users. This enables a community of language learners help each other through their learning journey. But quiz sharing isn't the only mechanism through which users can help each other. They can also answer questions related to specific words that are asked by other users on the forum.

On the whole, Quizzard's quiz and forum features are the main drivers of language advancement for Turkish speaking individuals in our project.

## 1.2 Project Status
We were able to implement the user interfaces for web and mobile platforms of our application. On the web, users can create quizzes as well as solve them. On the mobile devices, users can not only create and solve quizzes, but they can also ask questions on the forum page and get answers.

Those initial implementations are, of course, visual demonstrations of what the end product will look like. So they might lack session persistency and data sharing between different users, as our backend infrastructure hasn't been fully developed yet.

*** 

# 2. Customer Feedback and Reflections
Our customer feedback was really helpful and motivating for us, beacuse we were mostly positively received, but were also given insightful feedback.

Our quiz creation and solving interface was liked in general by the customer, however there was a comment about not having any pictures on the UI. We are going to be implementing cover picture for quizzes feature soon. Other than that, we were also acclaimed for using high-quality mock data for this demo session, because it allowed the customer to really imagine what the end product will look like.

We were also told that not showing the correct answer right away when the user chooses the wrong answer and allowing multiple attempts might be a good idea. We will consider that.

However the most significant feedback we got, pertaining to the functionality of the app, was that it should focus not only on translations and sense matching, but also on helping the user to pick up on how to actually use the word. Because being able to match a word to its meaning doesn't necessarily mean that word can be effectively used in a sentence by the language learner. For this, we might consider showing the user posts from the forum related to the question they are solving when the user is solving a quiz. This way they can see how this word is used in sentences in posts or in post comments. Serving posts and comments from forum when solving a quiz might be implemented in the quiz solving page UI in various ways. We might also consider/explore other ways of helping user pick up usages of words.

*** 

# 3. List and Status of Deliverables

Deliverable | Status | Related Link
-- | -- | --
Project Repository | Delivered | [repo](https://github.com/bounswe/bounswe2024group5)
Software Requirement Specification | Completed & Documented | [jump](#621-software-requirement-specification)
Software Design (UML diagrams) | Completed & Delivered | [jump](#622-software-design---uml-diagrams)
Scenarios | Completed & Delivered | [jump](#623-scenarios)
Mockups | Completed & Delivered | [jump](#624-mockups)
Project plan | Completed & Delivered | [jump](#63-project-plan)
Communication plan | Completed & Delivered | [jump](#64-communication-plan)
RAM (Responsibility Assignment Matrix) | Completed & Delivered | [jump](#65-ram-responsibility-assignment-matrix)
Weekly Lab reports | Completed & Documented | [jump](#66-weekly-lab-reports)
Meeting notes | Completed & Documented | [jump](#67-meeting-notes)
Pre-release Version of our Software | Implemented & Released | [jump](https://github.com/bounswe/bounswe2024group5/releases/tag/customer-milestone-1)
Individual Contributions (see section below) | Completed & Documented | [jump](#5-individual-contribution-table)
Milestone Report | Completed & Delivered | this report


## 3.1 Evaluation of the status of Deliverables

<!--- Evaluation of the status of deliverables and its impact on your project plan (reflection). -->

* **Software Requirement Specification**: We initiated this project with a comprehensive brainstorming session around the software requirements. This collaborative process allowed us to establish clear expectations for our project and to effectively plan our timeline for implementation. Our discussions regarding the use of linked data, particularly WordNet, were particularly significant. We gathered a list of [questions](https://github.com/bounswe/bounswe2024group5/issues/264) concerning these requirements and sought clarification from our TA. Overall, this deliverable was effective in enhancing our understanding of project expectations, aligning our team's efforts, and determining our project plan.

* **Scenarios**: During the 2nd lab session, we engaged in an in-depth discussion regarding the quiz question generation feature of our app. While we talk on how to implement this feature, team members naturally came up with some user scenarios. Such scenarios played a crucial role in refining our design and implementation strategies. For example, we debated on whether to allow users to select the question type for each question or for the entire quiz. Through exploring various user scenarios, we decided to provide maximum flexibility by allowing users to choose the question type on a per-question basis. This approach not only enhanced our design choices but also ensured that our application meets user expectations, thereby positively impacting user satisfaction and engagement.

* **Mockups**: The creation of mockups was vital in visualizing the UI for both our mobile and web app. Prior to this deliverable, we had not fully considered the detailed layout of our home screen. However, during the mockup process, we identified the need for two sections: one to display quizzes in the same level with the user and another to filter quizzes based on difficulty. Such UI design decisions, which were finalized during the mockup phase, have influenced our implementation, ensuring that our app meets users' needs.

* **Software Design (UML diagrams)**: In the 4th lab session, we conducted a thorough discussion around the API design, particularly concerning the Quiz Creation, since it is the most significant and challenging aspect of our app. This discussion was significant in synchronizing our understanding of the necessary features for the project. This enabled us to outline the sequence diagrams, use cases, and classes required for our implementation. With a clear understanding of the features and functionalities, we were able to design the UML diagrams efficiently, distributing the work among team members.

* **Project plan**: We utilize Github's Projects [Roadmap](https://github.com/orgs/bounswe/projects/67/views/4) feature to manage our project plan effectively. This visual representation allows us to monitor our progress according to the upcoming deadlines, such as the milestones. Additionally, it facilitates communication between sub-teams (backend, frontend, and mobile), ensuring that everyone is informed of each other's progress. [Ebrar](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) is responsible to update the Project plan frequently, and other team members also review and revise it often. 

* **Meeting notes**: Meeting notes are beneficial in terms of keeping track of what we discussed and function as a reference point for us to go back whenever we need to remind of the specific discussions from the team meetings. We follow the template we produced in the last semester to take the notes, and we try to keep these notes as detailed as possible for the purpose of decent documentation. 

* **Weekly Lab reports**: Similar to the meeting notes, lab reports are a great proof of the works we completed, during the labs. We take meeting notes during the lab and then prepare a report from the meeting notes. We follow a template to preserve consistency. Lab reports are also significant for us to show our accomplishments to the instructors. 

* **Communication plan**: We determined the communication plan for the semester in the first week. Such planning allowed us to be clear on the means of communication among the team. We sometimes change the meeting day to meet the team's momentary availability. We also use our WhatsApp group for instant communication whenever we seek it.

* **RAM (Responsibility Assignment Matrix)**: We keep track of our individual task distributions in this matrix, and we often review it. This semester, [Semih](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz) volunteered for the RAM revision duty. Other team members also review the matrix to arrange their responsibilities. RAM is particularly important in terms of task distributions in the sub temas (mobile, backend, frontend). With this visualization, we find it easier to distribute the tasks fairly among us.

## 3.2 Addressed Requirements

The status of requirements is updated at their [page](https://github.com/bounswe/bounswe2024group5/wiki/Requirements). The emojis symbolize three different state:

* ✅ is for requirements that we finished implementing it.
* ⚠️ is for requirements that we have started working on but not finished.
* ❌ is for requirements that we have not started.

***

# 4. Evaluation of Tools

We used four major tools for team communication, and planning and design of our project.

## 4.1 GitHub
GitHub has been the primary platform for planning and tracking of our project. We constantly used issues to collaborate on and track project tasks and it enabled all team members to exactly know the status of our project and diffuse confusion as to who's supposed to do what.

We used wiki section to share requirements, diagrams and design files. This easy access to project files helped us keep in sight what our final objective is at all times. We also used discussion section to determine the name of our project.

Finally we used pull requests to ensure only high quality code makes it to our codebase. For this we only commmited reviewed and approved code to our main branch.

## 4.2 Discord
We used discord to host our weekly meetings and also for brainstorming and file sharing. We think it is a great tool for real-time communication with voice and video sharing. Also different channels on this platform helped us keep our conversations organized.

## 4.3 WhatsApp
We used WhatsApp for texting related to issues that needed to be resolved fast. Because it was the platform that everyone received their messages in the shortest time compared to other platforms

## 4.4 Figma
We used Figma to draw and design the user experience and the visual interface of our project. This is where we thought about what users are going to be doing when they open our application on the web or their mobile devices.

Visualizing the different views from our application helped everyone have a better idea of what the final application will look like. Also it made us more excited about starting to create the actual application.

***

# 5. Individual Contribution Table

<!--- Required Format:
Member: (Your name)
Responsibilities: A general description of the responsibilities assigned to you.
Main contributions: The overall description of your contributions to the project for
Customer Milestone 1.
Code-related significant issues: The issues that you have personally resolved or reviewed
that contribute to the code base demonstrated during the demo. You must provide the
relevant PRs and commits.
Non-code-related significant issues: The issues that you have personally resolved or
reviewed. With brief explanations.
Pull requests that you have created, merged, and reviewed. If you experienced any
conflicts regarding the pull requests you have engaged in, briefly summarize the conflicts
along with how they were resolved.
Additional information: Mention any additional task you have performed that is not listed
above.
The qualities of good issues, commits, and pull/merge requests have been covered and
reiterated numerous times throughout Cmpe352 and this semester. They must be well-written.
Those that are closed must be done so appropriately (i.e. with links to relevant outcomes). -->

## 5.1 [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir)

### Responsibilities:
<!--- A general description of the responsibilities assigned to you. -->
Mobile Development, Requirements Elicitation, Use-case Diagrams

### Main contributions:
<!--- The overall description of your contributions to the project for Customer Milestone 1. -->
My biggest contribution was to implement the quiz solving page for mobile. I created and linked a quiz solving page that looks similar to our mockups and has functionalities such as seeing the right and wrong answers when you choose one. In addition to that, I collaborated with Fahreddin on writing the User Requiremets. I also worked on the use-case diagrams with Süleyman and Ramazan. Those being my main contributions, I also worked on a lab report and a few issue and PR rewievs.

### Code-related significant issues:
<!--- The issues that you have personally resolved or reviewed that contribute to the code base demonstrated during the demo. You must provide the relevant PRs and commits -->

- [#294](https://github.com/bounswe/bounswe2024group5/issues/294) I created the quiz solving page in mobile.[PR #299](https://github.com/bounswe/bounswe2024group5/pull/299)
- [#295](https://github.com/bounswe/bounswe2024group5/issues/295) The issue for implementing the home page by Ebrar got closed automatically when I reviewed and merged [PR #296](https://github.com/bounswe/bounswe2024group5/pull/296)

### Non-code-related significant issues:
<!--- The issues that you have personally resolved or reviewed. With brief explanations.-->

- [#263](https://github.com/bounswe/bounswe2024group5/issues/263) I researched the data sources for english words.
- [#270](https://github.com/bounswe/bounswe2024group5/issues/270) I wrote the User Requirements with Fahreddin.
- [#281](https://github.com/bounswe/bounswe2024group5/issues/281) I wrote the lab report #3.
- [#282](https://github.com/bounswe/bounswe2024group5/issues/282) I reviewed the user scenarios.
- [#308](https://github.com/bounswe/bounswe2024group5/issues/308) I worked on the use-case diagrams.
- [#289](https://github.com/bounswe/bounswe2024group5/issues/289) I did a review on Meeting Notes 3.

### Pull requests:
<!--- Pull requests that you have created, merged, and reviewed. If you experienced any conflicts regarding the pull requests you have engaged in, briefly summarize the conflicts along with how they were resolved.-->

- [PR #299](https://github.com/bounswe/bounswe2024group5/pull/299) I added a functioning quiz solving screen that fits our requirements.
- [PR #296](https://github.com/bounswe/bounswe2024group5/pull/296) I reviewed and merged Ebrar's PR that included many Mobile additions.

### Additional information:
<!--- Mention any additional task you have performed that is not listed above. -->

- [#248](https://github.com/bounswe/bounswe2024group5/issues/248) I modified my personal page for 451.
- [#276](https://github.com/bounswe/bounswe2024group5/issues/276) I created the structure for the requirements wiki page.
- I tried learning Figma to help with the mockups. I worked on turning one of the pages to web layout.
- [wiki](https://github.com/bounswe/bounswe2024group5/wiki/UML-Use%E2%80%90Case-Diagram-451) I put the use-case diagram in its wiki page.


## 5.2 [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu)

### Responsibilities

Group Communicator, Mobile Development, Conceptual Research, Graphical Design.

### Main Contributions

I often document lab reports. Also, I keep track of our [Project Plan](https://github.com/orgs/bounswe/projects/67/views/4). In the first weeks, I contribute to the research on LinkedData and initiated the discussion around the Proof of Concept on how to utilize linked data to generate quiz questions. I worked on a basic [script](https://github.com/bounswe/bounswe2024group5/issues/265#issuecomment-2395336067) to fetch similar words and word's meanings from WordNet. Then, I designed the [mockups](https://github.com/bounswe/bounswe2024group5/wiki/451-Mock%E2%80%90ups) with [Deniz](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir). I also created sequence diagrams for create forum post and commenting on a forum post functionalities.

For our Mobile app, I set up the project, implemented the Login/Registration and Create Quiz functionalities, as well as the Home Screen. I also implemented the API requests from Mobile for solving Quizzes. I collaborated with [Ramazan](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar) to finalize the initial version of our Mobile app, which has the Solve Quiz feature fully implemented and connected to backend, along with Create Quiz and Forum functionalities with mock data. 

### Code-related significant issues

- [#272](https://github.com/bounswe/bounswe2024group5/issues/272): Initialized the mobile project with Login, Register and Home screens. [PR #273](https://github.com/bounswe/bounswe2024group5/pull/273)
- [#293](https://github.com/bounswe/bounswe2024group5/issues/293): Implemented the Create Quiz screen and added the Create Quiz button to the Home screen. [PR #296](https://github.com/bounswe/bounswe2024group5/pull/296)
- [#295](https://github.com/bounswe/bounswe2024group5/issues/295): Implemented the Quiz View component for the Home page, prepared mock quiz data to display and finish up the Home screen view, with navigation bar. [PR #296](https://github.com/bounswe/bounswe2024group5/pull/296)
- [#319](https://github.com/bounswe/bounswe2024group5/issues/319): Implemented the API requests for user authentication, POST /quizzes and GET /quizzes. [PR #336](https://github.com/bounswe/bounswe2024group5/pull/336)

### Non-code-related significant issues

- [#317](https://github.com/bounswe/bounswe2024group5/issues/317): Arrange the Project plan [Roadmap view](https://github.com/orgs/bounswe/projects/67/views/4).
- [#306](https://github.com/bounswe/bounswe2024group5/issues/306): Designed the "Commenting on a forum post sequence diagram".
- [#305](https://github.com/bounswe/bounswe2024group5/issues/305): Designed the "Creating a forum post sequence diagram".
- [#283](https://github.com/bounswe/bounswe2024group5/issues/283): Designed the mockups with [Deniz](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir).
- [#265](https://github.com/bounswe/bounswe2024group5/issues/265): Worked on the Proof of Concept for Quiz Question generations. 
- [#263](https://github.com/bounswe/bounswe2024group5/issues/263): Did research about linked data resources.
- [#258](https://github.com/bounswe/bounswe2024group5/issues/258), [#267](https://github.com/bounswe/bounswe2024group5/issues/267), [#277](https://github.com/bounswe/bounswe2024group5/issues/277), [#310](https://github.com/bounswe/bounswe2024group5/issues/310), [#311](https://github.com/bounswe/bounswe2024group5/issues/311): Prepared the lab reports, documented the project plan and general plan, initiated the milestone and keeping track of its issues. 

### Pull Requests

#### Created

- [#273](https://github.com/bounswe/bounswe2024group5/pull/273): Initialize the Mobile Project (Login & Register). 
- [#296](https://github.com/bounswe/bounswe2024group5/pull/296): Implement Home and Create Quiz Screen and add the Quiz View for home screen.
- [#336](https://github.com/bounswe/bounswe2024group5/pull/336): API requests for user authentication and GET /quizzes (with [Ramazan](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)).
- [#337](https://github.com/bounswe/bounswe2024group5/pull/337): Solve Quiz screen buttons and some fixes for Home Screen.

#### Reviewed/Merged

- [#299](https://github.com/bounswe/bounswe2024group5/pull/299): Implement Solve Quiz Screen with mock data.
- [#316](https://github.com/bounswe/bounswe2024group5/pull/316): Database Migrations and API Documentation.
- [#318](https://github.com/bounswe/bounswe2024group5/pull/318): Implement Forum Page with mock data.
- [#334](https://github.com/bounswe/bounswe2024group5/pull/334): Write build and deploy instructions.

### Additional Information

I value the quality of documentation. Thus, I frequently review our wiki pages, specifically the home page and sidebar. I add links to missing recent meeting notes and lab reports. I also add the group's issues to the Github [Project](https://github.com/orgs/bounswe/projects/67), and add missing labels to the issues whenever I locate them. 

## 5.3 [FAHREDDİN ÖZCAN](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan)

### Responsibilities

Frontend Development, Conceptual Research, Meeting Notes Organiser and Documentation (Requirements and Diagrams)

### Main Contrubutitons

I actively noted down the topics covered in the meetings and created the meeting notes files for our lab sessions to keep the team synced and on track. I researched LinkedData tools to find the best fits for the project. I colloborated with Arınç on writing our project requirements and organising our wiki pages. For our frontend, I set up the project, implemented the quiz solving, quiz listing and authentication pages and contributed to overall structures. I also created sequence diagrams for key functionalities such as solving a quiz and searching a post in the forum.

### Code-related significant issues

- [#274](https://github.com/bounswe/bounswe2024group5/issues/274): Initialized the frontent project with detailed configuration [PR #275](https://github.com/bounswe/bounswe2024group5/pull/275)
- [#290](https://github.com/bounswe/bounswe2024group5/issues/290): Created the quiz solving page and general project structure [PR #291](https://github.com/bounswe/bounswe2024group5/pull/291)
- [#298](https://github.com/bounswe/bounswe2024group5/issues/298): Implemented quiz listing page [PR #314](https://github.com/bounswe/bounswe2024group5/pull/314)
- [#323](https://github.com/bounswe/bounswe2024group5/issues/323): Implemented the frontend authentication pages [PR #325](https://github.com/bounswe/bounswe2024group5/pull/325)
- [#324](https://github.com/bounswe/bounswe2024group5/issues/324): Update/Refactor Quiz Creation Page UI [PR #327](https://github.com/bounswe/bounswe2024group5/pull/327)
- [#331](https://github.com/bounswe/bounswe2024group5/issues/331): Integrate Backend APIs with frontend [PR #332](https://github.com/bounswe/bounswe2024group5/pull/332)
- [#342](https://github.com/bounswe/bounswe2024group5/issues/342): Prerelease the application [release](https://github.com/bounswe/bounswe2024group5/releases/tag/customer-milestone-1)

### Non-code-related significant issues

- [#313](https://github.com/bounswe/bounswe2024group5/issues/313): Search in the forum, sequence diagram
- [#312](https://github.com/bounswe/bounswe2024group5/issues/312): Solve a quiz, sequence diagram
- [#260](https://github.com/bounswe/bounswe2024group5/issues/260), [#269](https://github.com/bounswe/bounswe2024group5/issues/269), [#284](https://github.com/bounswe/bounswe2024group5/issues/284), [#309](https://github.com/bounswe/bounswe2024group5/issues/304): Taking notes in the meeting and writing the meeting notes files.
- [#270](https://github.com/bounswe/bounswe2024group5/issues/270): Writing User Requirements
- [#263](https://github.com/bounswe/bounswe2024group5/issues/263): Doing a research about linked data resources

### Pull Requests

#### Created

- [#275](https://github.com/bounswe/bounswe2024group5/pull/275): Initialize Frontend Project
- [#325](https://github.com/bounswe/bounswe2024group5/pull/325): Implement Authentication Pages
- [#314](https://github.com/bounswe/bounswe2024group5/pull/314): Implementing quiz listing page
- [#291](https://github.com/bounswe/bounswe2024group5/pull/291): Implement Quiz Solving Page
- [#332](https://github.com/bounswe/bounswe2024group5/pull/332): Integrate Backend APIs with frontend
- [#327](https://github.com/bounswe/bounswe2024group5/pull/327): Update quiz creation page UI

#### Reviewed/Merged

- [#322](https://github.com/bounswe/bounswe2024group5/pull/322): Dockerizing Frontend Application
- [#292](https://github.com/bounswe/bounswe2024group5/pull/303): Implement Quiz Creation Page
- [#316](https://github.com/bounswe/bounswe2024group5/pull/316): Database Migrations and API Documentation
- [#330](https://github.com/bounswe/bounswe2024group5/pull/330): Integrating auth APIs with frontend
- [#341](https://github.com/bounswe/bounswe2024group5/issues/341): Review Backend Meeting Notes

#### Conflicts

We haven't really faced any git conflicts, but while working asyncronously on the frontend project, each of us created our own Quiz/Question types considering different requirements. In one of the next PR's, we merged the types into one and solved the conflict.


## 5.4 [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik)


### Responsibilities

Backend development, Conceptual Research, Database Design, API design.

### Main Contributions
I researched quiz creation, word suggestions, and generating incorrect answers to improve quiz quality. I also designed the database and created migration scripts for smooth data handling. I wrote user scenarios to guide and improve the user experience.

For the API, I planned out the endpoints and documented them using Swagger to keep everything clear. I helped set up the backend, and got the main framework running. Additionally, I helped dockerize the project to make deployment easier.

Before the customer presentation, I deployed the application on Google Cloud with Suleyman and tested web features to ensure everything worked well.

### Code-related significant issues
- [#288](https://github.com/bounswe/bounswe2024group5/issues/288): Helped initialization and dockerization of backend [PR #301](https://github.com/bounswe/bounswe2024group5/pull/301)

### Non-code-related significant issues
- [#263](https://github.com/bounswe/bounswe2024group5/issues/263): Researched data sources for english-turkish translations.
- [#265](https://github.com/bounswe/bounswe2024group5/issues/265): Worked on the Proof of Concept for Quiz Question generations. 
- [#282](https://github.com/bounswe/bounswe2024group5/issues/282): Wrote 2 user scenarios.
- [#285](https://github.com/bounswe/bounswe2024group5/issues/285): Made database design and implemented migration script.
- [#286](https://github.com/bounswe/bounswe2024group5/issues/286): Made API design and documented.
- [#304](https://github.com/bounswe/bounswe2024group5/issues/304): Documented sequence diagrams for login and register.
- [#335](https://github.com/bounswe/bounswe2024group5/issues/335): Deployed the application and tested.


### Pull Requests

#### Created
- [#334](https://github.com/bounswe/bounswe2024group5/pull/334): Wrote build/deploy documentation.
- [#316](https://github.com/bounswe/bounswe2024group5/pull/316): API and database design.

#### Reviewed/Merged
- [#338](https://github.com/bounswe/bounswe2024group5/pull/338): Reviewed mobile build instructions.

### Additional Information
- 

## 5.5 [ÖZGÜR DENİZ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir)

Responsibilities: Conceptual Research, Graphical Design, Frontend Implementation
<!--- A general description of the responsibilities assigned to you. -->

Main contributions: I researched various linked data resources to figure out how we can realize our project and wrote several scripts to prove that we could generate quiz question with those resources. Then I helped design the user interface out application in Figma.  Finally I implemented the quiz creation page of our web app and also dockerized the web app.
<!--- The overall description of your contributions to the project for Customer Milestone 1. -->

Code-related significant issues:
<!--- The issues that you have personally resolved or reviewed that contribute to the code base demonstrated during the demo. You must provide the relevant PRs and commits -->

- [#292](https://github.com/bounswe/bounswe2024group5/issues/292): I implemented quiz creation page. [PR #303](https://github.com/bounswe/bounswe2024group5/pull/303)
- [#321](https://github.com/bounswe/bounswe2024group5/issues/321): I dockerized frontend web app. [PR #322](https://github.com/bounswe/bounswe2024group5/pull/322)

Non-code-related significant issues:
<!--- The issues that you have personally resolved or reviewed. With brief explanations.-->

- [#263](https://github.com/bounswe/bounswe2024group5/issues/263): I researched linked data resources.
- [#265](https://github.com/bounswe/bounswe2024group5/issues/265): I wrote several scripts to use linked data resources for question generation.
- [#283](https://github.com/bounswe/bounswe2024group5/issues/283): I designed visual interface of our app with Figma.

Pull requests:
<!--- Pull requests that you have created, merged, and reviewed. If you experienced any conflicts regarding the pull requests you have engaged in, briefly summarize the conflicts along with how they were resolved.-->

Created: 

- [#322](https://github.com/bounswe/bounswe2024group5/pull/322): Dockerizing Frontend Application
- [#292](https://github.com/bounswe/bounswe2024group5/pull/303): Implement Quiz Creation Page

Reviewed:

- [#316](https://github.com/bounswe/bounswe2024group5/pull/316): Database Migrations and API Documentation
- [#275](https://github.com/bounswe/bounswe2024group5/pull/275): Initialize Frontend Project
- [#325](https://github.com/bounswe/bounswe2024group5/pull/325): Implement Authentication Pages
- [#314](https://github.com/bounswe/bounswe2024group5/pull/314): Implementing quiz listing page
- [#291](https://github.com/bounswe/bounswe2024group5/pull/291): Implement Quiz Solving Page

There was small conflict because of a lock file. The reason was I was using npm and [Fahreddin](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) was using pnpm. I switched to pnpm and conflict was resolved.

## 5.6 [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)


### Responsibilities:
<!--- A general description of the responsibilities assigned to you. -->
Mobile Development, Use-case Diagrams, Conceptual Research

### Main contributions:
<!--- The overall description of your contributions to the project for Customer Milestone 1. -->
My main contribution was implementing Forum Page and related Question Screens. With respect to our choice for the 1st customer presentation, we were supposed to deliver Forum Page, Search Screen, Question Generation Screen and Question Details Screen with mock data from the app. 
Previously, I worked on PoC of Quiz Generation and moderated one of our general meeting. For the planning part of the milestone, I worked on User Scenarios and Use Case Diagrams. Lastly, I implemented the API calls that are actively working with the assistance of Ebrar.

### Code-related significant issues:
<!--- The issues that you have personally resolved or reviewed that contribute to the code base demonstrated during the demo. You must provide the relevant PRs and commits -->

- [#319](https://github.com/bounswe/bounswe2024group5/issues/319) Implementing API calls for mobile [PR #336](https://github.com/bounswe/bounswe2024group5/pull/336)
- [#315](https://github.com/bounswe/bounswe2024group5/issues/315) Implementing Forum Page and relating pages [PR #318](https://github.com/bounswe/bounswe2024group5/pull/318)
- [#265](https://github.com/bounswe/bounswe2024group5/issues/265) Quiz Generation PoC

### Non-code-related significant issues:
<!--- The issues that you have personally resolved or reviewed. With brief explanations.-->

- [#308](https://github.com/bounswe/bounswe2024group5/issues/308) UML Use Case Diagrams
- [#282](https://github.com/bounswe/bounswe2024group5/issues/282) User Scenarios
- [#278](https://github.com/bounswe/bounswe2024group5/issues/278) Moderating Meeting and Taking Notes

### Pull requests:
<!--- Pull requests that you have created, merged, and reviewed. If you experienced any conflicts regarding the pull requests you have engaged in, briefly summarize the conflicts along with how they were resolved.-->

#### Created

- [#318](https://github.com/bounswe/bounswe2024group5/pull/318) Implementation of Forum, Search, and related Question Pages
- [#336](https://github.com/bounswe/bounswe2024group5/pull/336) Implementation of API requests from Mobile

#### Reviewed/Merged
- [#272](https://github.com/bounswe/bounswe2024group5/pull/272) Initialization of Mobile
- [#336](https://github.com/bounswe/bounswe2024group5/pull/336) Implementation of API requests from Mobile

### Additional information:
<!--- Mention any additional task you have performed that is not listed above. -->

-

## 5.7 [SEMİH YILMAZ](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz)

### Responsibilities

Backend Development, Class Design, API Design

### Main Contributions

I took responsibility to write [system requirements](https://github.com/bounswe/bounswe2024group5/wiki/Requirements#12-system-requirements) and [non-functional requirements](https://github.com/bounswe/bounswe2024group5/wiki/Requirements#2-non-functional-requirements). I designed [class diagram](https://github.com/bounswe/bounswe2024group5/wiki/Class-Diagram). I also keep the [responsibility assignment matrix](https://github.com/bounswe/bounswe2024group5/wiki/RAM-(Responsibility-Assignment-Matrix)) up to date.  
I reviewed and edited [API design](https://editor.swagger.io/?url=https://raw.githubusercontent.com/bounswe/bounswe2024group5/refs/heads/main/doc/api-design.yml) according to feedbacks from client side teams. I reviewed our database design and implemented quiz related endpoints with [Süleyman](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan).

### Code-related significant issues

- [#340](https://github.com/bounswe/bounswe2024group5/issues/340): Implemented backend endpoints for quiz operations. [PR #328](https://github.com/bounswe/bounswe2024group5/pull/328)

### Non-code-related significant issues

- [#307](https://github.com/bounswe/bounswe2024group5/issues/307): Designed [Class Diagram](https://github.com/bounswe/bounswe2024group5/wiki/Class-Diagram)
- [#302](https://github.com/bounswe/bounswe2024group5/issues/302): Prepared [Responsibility-Assignment-Matrix](https://github.com/bounswe/bounswe2024group5/wiki/RAM-(Responsibility-Assignment-Matrix))
- [#279](https://github.com/bounswe/bounswe2024group5/issues/279): Wrote [Non-functional Requirements](https://github.com/bounswe/bounswe2024group5/wiki/Requirements#2-non-functional-requirements)
- [#268](https://github.com/bounswe/bounswe2024group5/issues/268): Wrote [System Requirements](https://github.com/bounswe/bounswe2024group5/wiki/Requirements#12-system-requirements) with [Süleyman](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan)
- [#259](https://github.com/bounswe/bounswe2024group5/issues/259): Prepared [Lab Report 1](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Report-1)
- [#257](https://github.com/bounswe/bounswe2024group5/issues/257): Revised Wiki Sidebar Page

### Pull Requests

#### Created

- [#328](https://github.com/bounswe/bounswe2024group5/pull/328): Backend Quiz POST and GET Endpoints.

#### Reviewed/Merged

- [#301](https://github.com/bounswe/bounswe2024group5/pull/301): Backend initialization for Quizzard
- [#316](https://github.com/bounswe/bounswe2024group5/pull/316): Database Migrations and API Documentation.

## 5.8 [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan)
Responsibilities: Backend Development, Conceptual Research, Meeting Moderator and Note Taker 

Main Contribution: I attended all labs and meetings, even managed and took notes of the 1st and 3rd general meetings. I maintained positive communication with my team throughout the process. I researched LinkedData resources and introduced and suggested BabelNet to my team. I wrote the system requirements together with Semih. I made the use-case diagrams together with Arınç and Ramazan. I also edited them in detail according to Ebrar's feedback. I also provided important feedback to my team as a reviewer of the sequence and class diagrams. We edited the API-doc prepared by Utkun together with Semih and finalized it. I made the first version of the backend (dockerization and initialization). I also wrote the Quiz endpoints. Later, Semih finalized them. I also constantly edited the API while writing the endpoints. Finally, I deployed our application together with Utku.

Code-Related Issues: 
- [#288](https://github.com/bounswe/bounswe2024group5/issues/288): Initialization and dockerization of backend [PR #301](https://github.com/bounswe/bounswe2024group5/pull/301)
- [#300](https://github.com/bounswe/bounswe2024group5/issues/300): Preparing Login/Register [PR #301](https://github.com/bounswe/bounswe2024group5/pull/301)
- [#340](https://github.com/bounswe/bounswe2024group5/issues/340): Backend Quiz Endpoints [PR #328](https://github.com/bounswe/bounswe2024group5/pull/328)
- [#335](https://github.com/bounswe/bounswe2024group5/issues/335): Deploy the application

Non-Code-Related Important Issues:
- [#308](https://github.com/bounswe/bounswe2024group5/issues/308): UML Use-Case Diagram
- [#268](https://github.com/bounswe/bounswe2024group5/issues/268): System Requirements
- [#262](https://github.com/bounswe/bounswe2024group5/issues/262),[#289](https://github.com/bounswe/bounswe2024group5/issues/289), [#261](https://github.com/bounswe/bounswe2024group5/issues/261): Take, create, update notes
- [#263](https://github.com/bounswe/bounswe2024group5/issues/263): Research about LinkedData resources

Reviewed Important Issues:
- [#307](https://github.com/bounswe/bounswe2024group5/issues/307): UML Class Diagram
- [#304](https://github.com/bounswe/bounswe2024group5/issues/304): UML Sequence Diagrams
- [#286](https://github.com/bounswe/bounswe2024group5/issues/286): API Design

Pull Requests:
Created:
- [#328](https://github.com/bounswe/bounswe2024group5/pull/328): Quiz endpoints 
- [#301](https://github.com/bounswe/bounswe2024group5/pull/301): Backend Initialization

Reviewed:
- [#316](https://github.com/bounswe/bounswe2024group5/pull/316): Database migration and API design
- [#328](https://github.com/bounswe/bounswe2024group5/pull/328): Semih did last changes so I reviewed them.

***

# 6. Deliverables

## 6.1 Project Repository
* [Our repository](https://github.com/bounswe/bounswe2024group5)
## 6.2 Requirements
### 6.2.1 Software Requirement Specification
* [Requirements](https://github.com/bounswe/bounswe2024group5/wiki/Requirements)
### 6.2.2 Software Design - UML Diagrams
* [Sequence Diagrams](https://github.com/bounswe/bounswe2024group5/wiki/451-Sequence-Diagrams)
* [Class Diagram](https://github.com/bounswe/bounswe2024group5/wiki/Class-Diagram)
* [Use-case Diagram](https://github.com/bounswe/bounswe2024group5/wiki/UML-Use%E2%80%90Case-Diagram-451)
### 6.2.3 Scenarios
* [User Scenario 1](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-1-%E2%80%90-Quiz-Generation)
* [User Scenario 2](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-2-%E2%80%90-Find-Quiz-from-the-Forum)
* [User Scenario 3](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-3-%E2%80%90-Ask-Question-in-the-Forum)
* [User Scenario 4](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-4-%E2%80%90-Solve-a-quiz-sent-by-another-user)
### 6.2.4 Mockups
* [Mockups](https://github.com/bounswe/bounswe2024group5/wiki/451-Mock%E2%80%90ups)
## 6.3 Project Plan
* [Project Plan](https://github.com/orgs/bounswe/projects/67/views/4)
## 6.4 Communication Plan
* [Communication Plan](https://github.com/bounswe/bounswe2024group5/wiki/Communication-Plan)
## 6.5 RAM (Responsibility Assignment Matrix)
* [RAM](https://github.com/bounswe/bounswe2024group5/wiki/RAM-(Responsibility-Assignment-Matrix))
## 6.6 Weekly Lab Reports
* [Lab Report #1 | 24.09.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Report-1)
* [Lab Report #2 | 01.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Report-2)
* [Lab Report #3 | 08.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Report-%233)
* [Lab Report #4 | 15.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Report-4)
## 6.7 Meeting Notes
### 6.7.1 Lab Meeting Notes
* [Lab Meeting #1 | 24.09.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Meeting-%231-%7C-24.09.2024)
* [Lab Meeting #2 | 01.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Meeting-%232-%7C-01.10.2024)
* [Lab Meeting #3 | 08.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Meeting-%233-%7C-08.10.2024)
* [Lab Meeting #4 | 15.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Meeting-%234-%7C-15.10.2024)
### 6.7.2 Team Meeting Notes
* [General Meeting #1 | 27.09.2024](https://github.com/bounswe/bounswe2024group5/wiki/General-Meeting-%231)
* [General Meeting #2 | 06.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/General-Meeting-%232)
* [General Meeting #3 | 11.10.2024](https://github.com/bounswe/bounswe2024group5/wiki/General-Meeting-%233)
* [Backend Meeting Notes](https://github.com/bounswe/bounswe2024group5/wiki/Back%E2%80%90End-Meeting-Notes-for-451)
## 6.8 A pre-release Version of our Software
* [Pre-release](https://github.com/bounswe/bounswe2024group5/releases/tag/customer-milestone-1)

# Main Authors
[Deniz](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir), [Ebrar](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu), [Semih](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz)