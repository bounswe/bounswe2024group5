# Introduction
This is the final milestone report for our group project, group bounswe2024group5. We are a group of dedicated students of CmpE451, committed to building an English Learning app, Quizzard, that features posting and solving quizzes, and interacting with other language learners in the forums.

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
  * [1.3 Final Release Notes](#13-final-release-notes)
  * [1.4 Changes Made Since Last Milestone](#14-changes-made-since-last-milestone)
  * [1.5 Reflections on our Final Milestone Demo](#15-reflections-on-our-final-milestone-demo)
  * [1.6 Reflections on our Development Process](#16-reflections-on-our-development-process)
  * [1.7 Known Issues](#17-known-issues)
- [2. Progress Based on Teamwork](#2-progress-based-on-teamwork)
  * [2.1 Individual Work Table](#21-Individual-Work-Table)
  * [2.2 Status of Requirements](#22-Status-of-Requirements)
  * [2.3 API Endpoints](#23-API-Endpoints)
  * [2.4 UI - UX](#24-UI---UX)
  * [2.5 Standards](#25-Standards)
  * [2.6 Scenarios](#26-Scenarios)
- [3. Individual Contributions](#3-individual-contributions)
  * [3.1 ARINÇ DEMİR](#31-ARINÇ-DEMİR)
  * [3.2 ASUDE EBRAR KIZILOĞLU](#32-ASUDE-EBRAR-KIZILOĞLU)
  * [3.3 FAHREDDİN ÖZCAN](#33-FAHREDDİN-ÖZCAN)
  * [3.4 HALİL UTKU ÇELİK](#34-HALİL-UTKU-ÇELİK)
  * [3.5 ÖZGÜR DENİZ DEMİR](#35-ÖZGÜR-DENİZ-DEMİR)
  * [3.6 RAMAZAN ONUR ACAR](#36-Ramazan-Onur-Acar)
  * [3.7 SEMİH YILMAZ](#37-SEMİH-YILMAZ)
  * [3.8 SÜLEYMAN EMİR TAŞAN](#38-SÜLEYMAN-EMİR-TAŞAN)
- [4. Deliverables](#4-deliverables)
  * [4.1 User Manual](#41-user-manual)
  * [4.2 System Manual](#42-system-manual)
  * [4.3 Software Requirements Specifitaion](#43-software-requirements-specification)
  * [4.4 Software design documents](#44-software-design-documents)
  * [4.5 User scenarios and mockups](#45-user-scenarios-and-mockups)
  * [4.6 Project plan](#46-Project-plan)
  * [4.7 Unit Tests](#47-unit-tests)
  * [4.8 Database Content](#48-database-content)

</details>

# 1. Executive Summary 

## 1.1 Project Description
Quizzard is a language learning platform for Turkish speakers. It helps users acquire new vocabulary words by create and solve quizzes. Quizzes contain questions that are designed to help users commit new words to their long-term memory by matching words to their translations or meanings.

Users can either solve quizzes that they themselves have created or quizzes created by other users. This enables a community of language learners help each other through their learning journey. But quiz sharing isn't the only mechanism through which users can help each other. They can also answer questions related to specific words that are asked by other users on the forum.

Forum posts are also integrated with the quizzes, so that when the user solves a quiz question about the word "X", they can view the forum posts that are related to the word "X" in the same page, without ever needing to leave the quiz page.

Overall, Quizzard's quiz and forum features are the main drivers of language advancement for Turkish speaking individuals in our project.

## 1.2 Project Status

<!-- Provide a summary of your project status.
Explain the status of the deliverables. -->

During the final month, since Milestone 2, our team has successfully implemented several key features requested by our customer. We've enhanced the quiz-solving experience by integrating hint images from Wikidata and implementing personalized quiz recommendations based on difficulty levels. To improve user engagement and fairness, we've implemented mechanisms to prevent users from gaining points repeatedly from the same quiz and streamlined the profile view to show only one completed attempt per quiz. We've also added the ELO-CEFR conversion table to better measure user progress. 

Looking back at our previous milestone goals, we're pleased to report significant progress across all planned areas. We've successfully addressed bug fixes and improved test coverage. In terms of feature additions, in additions to the features mentioned above, we've completed CRUD operations for quizzes, added quiz upvote and question favorite features, and made substantial improvements to the difficulty algorithm in quiz creation. The implementation of follow actions, followers, and feed functionality has also been completed.

A notable achievement has been the completion of profile pages across both mobile and web clients, along with the implementation of following logic. We've also introduced a completely new leaderboard feature. Throughout this period, we've maintained a strong focus on UI/UX consistency between our mobile and web clients, ensuring a cohesive user experience across platforms.


## 1.3 Final Release Notes

<!-- Provide final release notes. -->

We are pleased to announce the release of Quizzard version 0.9.0, released on December 16, 2024. This final release represents the culmination of our development efforts, introducing several major features and improvements.

### Major Features added:
* Enhanced Quiz Creation: Implemented intelligent suggestion system for correct and wrong answers
* Interactive Quiz Solving: Added Wikidata-powered hint images and integration with related forum posts
* Advanced Forum Features:
    * Implemented semantic search functionality
    * Added related posts display
    * Improved post categorization and linking with quizzes
* User Engagement Features:
    * Comprehensive profile pages
    * User following system
    * Interactive leaderboard
* Quality Assurance: Implemented unit testing across all major components.

### Key Improvements

* Quiz Difficulty Assessment: Refined our algorithm for accurately determining quiz difficulty levels, and ELO-CEFR levels match.
* User Interface:
    * Enhanced overall UI design and user experience
    * Achieved consistency between mobile and web interfaces
    * Improved responsiveness and navigation

### System Requirements

* Mobile App:
    * Android 8.0 (API level 26) or higher
    * 100MB available storage space
    * Active internet connection

* Web Application:
    * Modern web browsers (Chrome 88+, Firefox 87+, Safari 14+)
    * JavaScript enabled
    * Minimum screen resolution: 320px width

### Installation Guide

* Mobile App:
    * Download the APK from our releases page
    * Enable installation from unknown sources if required
    * Install the application

* Web Application:
    * Access directly through: [url](http://34.121.241.21/)
    * No installation required

Register an account or log in to start using.

### Known Limitations

Please refer to the Known Issues section [1.7](#17-known-issues) for a detailed list of current limitations and their workarounds.

### Acknowledgments
Special thanks to:
* Our course instructors for their guidance
* The open-source community, particularly the contributors of the datasets we utilized: [tranlations dataset](https://github.com/firatkaya1/dictionary), [Wordnet dataset for english senses](https://wordnet.princeton.edu/download/current-version), [frequency dataset](https://pypi.org/project/wordfreq/).
* Wikidata for providing image resources

Our development team members for their dedication throughout the project.

## 1.4 Changes Made Since Last Milestone

<!-- Describe any changes your team has made or planned based on previous milestones to improve the development process. Explain how those changes impacted the overall project. -->

While we haven't implemented major structural changes to our development process since the last milestone, our focus has been on delivering the features requested by our customers. We've successfully implemented all planned functionality, including hint images in quiz solving, personalized quiz recommendations, and improvements to the scoring system. These implementations were carried out while maintaining our established development workflow, which has proven effective throughout the project lifecycle.


## 1.5 Reflections on our Final Milestone Demo

<!-- Provide reflections related to your Final Milestone Demo, including lessons learned. -->

For our final milestone presentation, we structured the demo around a realistic teacher-student scenario, effectively demonstrating how Quizzard functions in an actual educational setting. This approach allowed us to showcase both the practical applications and the user-friendly nature of our platform.

We received positive feedback from the customers, particularly regarding our user interface design. Our implementation of answer suggestions during quiz solving emerged as a highlight of the presentation. We provided a detailed explanation of our hybrid suggestion system, which combines a random algorithm with user-generated data. The system initially offers randomized suggestions but gradually improves its recommendations by learning from user inputs. When users modify the suggested options, our platform stores these modifications, creating a growing database of user-verified answer choices that enhances the quality of future suggestions for similar questions.

The interactive nature of our demo proved particularly valuable when Pofessor Uskudarli tested the application on her mobile device. This hands-on testing revealed several minor but important issues, including the absence of error messages during the login process and non-clickable profile sections in the web application. We appreciated this real-time feedback and responded promptly by releasing an update that addressed these concerns, demonstrating our commitment to continuous improvement and user experience.


## 1.6 Reflections on our Development Process

<!-- Describe what could have been done differently at the start of the project to finalize it, with reasons. -->

Looking back at our development journey, we identified several key areas of success and potential improvement. Our time management between milestones stands out as an important learning point. While we consistently took week-long breaks after each milestone, we realized that shorter breaks of 3-5 days would have been more effective. This adjustment would have helped us maintain momentum while still getting adequate rest between development phases.

When it comes to the technical side of things, we learned a lot about timing, especially with backend development. The mobile and web teams did a great job with the UI, but sometimes they had to wait around for backend endpoints to be ready before they could hook everything up. While we still hit all our deadlines, having those endpoints ready earlier would have given us more breathing room to polish the UI and run more thorough tests.

Testing proved to be an area where we could have improved our approach. Most of our testing efforts were concentrated toward the end of development, which wasn't optimal. If we had distributed our testing throughout the development cycle, we could have identified and addressed issues earlier, reducing pressure in the final stages of implementation.

One of our project's strongest aspects was team communication and collaboration. We maintained exceptional levels of interaction through our group chat, ensuring constant alignment and quick problem resolution. This robust communication framework proved invaluable in maintaining project momentum and addressing challenges promptly.

Finally, we're pretty proud of how we handled customer feedback. Whenever our customers suggested changes or new features, we found ways to work them into the project, even mid-development. This showed we could be flexible while still keeping the project on track and meeting our main goals.


## 1.7 Known Issues

Currently identified issues in the system include:

* Question Like Synchronization Issue: When users like a question and subsequently create a quiz containing that question, attempting to like the same question again results in a duplicate like being recorded in the system.
* Mobile Image Upload Limitation: The mobile application currently restricts image uploads to very small file sizes, which may impact user experience when attempting to upload higher resolution images.
* Web Tab State Persistence: The web application currently doesn't maintain state across tab changes, resulting in reset of user quiz creation.
* Web Profile Navigation Limitation: Profile sections in the web interface lack clickable functionality, limiting user navigation options.
* Mobile Network Resilience: The mobile application occasionally experiences errors under poor network conditions (when connected to eduroam), though it maintains basic page display functionality.
* Login and Registration warning messages were missing in the Web application. 

*** 

# 2. Progress Based on Teamwork

## 2.1 Individual Work Table

<!-- A summary of work performed by each team member (in tabular format). The reported work must be consistent with the individual reports.
-->

| Team Member | Tasks | Links  |
|----|----|----|
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Wrote acceptance criteria about domain specific features |[PR#465](https://github.com/bounswe/bounswe2024group5/pull/465) |
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Add autocomplete to quiz creation mobile| [Lab Report#9](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Report-9) |
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Fix quiz creation endpoints | [Issue#501](https://github.com/bounswe/bounswe2024group5/issues/501), [PR#534](https://github.com/bounswe/bounswe2024group5/pull/534)|
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Add hint image to quiz solving | [Issue#502](https://github.com/bounswe/bounswe2024group5/issues/502), [PR#538](https://github.com/bounswe/bounswe2024group5/pull/538) |
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Add favoriting questions to mobile | [Issue#504](https://github.com/bounswe/bounswe2024group5/issues/504), [PR#563](https://github.com/bounswe/bounswe2024group5/pull/563) |
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Modifications on show hint UI | [PR#564](https://github.com/bounswe/bounswe2024group5/pull/564) |
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) |  Fix quiz creation flatlist issue | [PR#566](https://github.com/bounswe/bounswe2024group5/pull/566) |
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Create quiz from favorites | [Issue#505](https://github.com/bounswe/bounswe2024group5/issues/505), [PR#572](https://github.com/bounswe/bounswe2024group5/pull/572) |
| [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) | Quiz creation fixes | [PR#590](https://github.com/bounswe/bounswe2024group5/pull/590) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Developed profile page | [PR #492](https://github.com/bounswe/bounswe2024group5/pull/492) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Completed other user profile screen and Created unified profile view with Ramazan | [#509](https://github.com/bounswe/bounswe2024group5/issues/509) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Added follow logic and follow list views | [PR #570](https://github.com/bounswe/bounswe2024group5/pull/570) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Fixed forum post upvoting bugs | [PR #545](https://github.com/bounswe/bounswe2024group5/pull/545) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Implemented related posts in forum | [PR #561](https://github.com/bounswe/bounswe2024group5/pull/561) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Added ELO-CEFR conversion table | [PR #546](https://github.com/bounswe/bounswe2024group5/pull/546) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Completed quiz favorite functionality | [PR #569](https://github.com/bounswe/bounswe2024group5/pull/569) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Integrated the `DELETE /favorite-question` endpoint | [PR #579](https://github.com/bounswe/bounswe2024group5/pull/579) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Wrote unit tests for forum features | [PR #604](https://github.com/bounswe/bounswe2024group5/pull/604) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Co-developed Teacher-Student scenario with Deniz and planned the final presentation | [Scenario](https://github.com/bounswe/bounswe2024group5/wiki/Teacher-%E2%80%90-Student-Scenario-%5BCustomer-Milestone-3%5D) |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Created user manual and system manual | [User](https://github.com/bounswe/bounswe2024group5/wiki/User-Manual) and [System](https://github.com/bounswe/bounswe2024group5/wiki/System-Manual) manuals |
| [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) | Organized milestone report preparation | [#605](https://github.com/bounswe/bounswe2024group5/issues/605) |
| [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik) | Enhance wrong answer suggestions with other questions. | [PR #584](https://github.com/bounswe/bounswe2024group5/issues/584) | 
| [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik) | Implement leaderboard endpoint. | [PR #547](https://github.com/bounswe/bounswe2024group5/issues/547) | 
| [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik) | Implement wrong answer suggestion endpoint. | [PR #496](https://github.com/bounswe/bounswe2024group5/issues/496) | 
| [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik) | Increase Test Coverage For Backend. | [PR #570](https://github.com/bounswe/bounswe2024group5/issues/570) | 
| [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik) | Deployment. | | 
| [ÖZGÜR DENİZ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir) | | | 
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Add quiz solving status to mobile                                                   | [Issue #476](https://github.com/bounswe/bounswe2024group5/issues/476) & [PR #507](https://github.com/bounswe/bounswe2024group5/pull/507)                            |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Fix Quiz attempt API call and add missing API calls                                 | [Issue #475](https://github.com/bounswe/bounswe2024group5/issues/475) & [PR #472](https://github.com/bounswe/bounswe2024group5/pull/472)                                               |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)  | Add Leaderboard page for mobile                                                    | [Issue #474](https://github.com/bounswe/bounswe2024group5/issues/474) & [PR #525](https://github.com/bounswe/bounswe2024group5/pull/525)                                               |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)| Other User's Profile Screen in Mobile                                              | [Issue #509](https://github.com/bounswe/bounswe2024group5/issues/509) & [PR #567](https://github.com/bounswe/bounswe2024group5/pull/567)                                               |
|[RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Add quiz suggestions after quiz finishes                                            | [Issue #478](https://github.com/bounswe/bounswe2024group5/issues/478) & [PR #525](https://github.com/bounswe/bounswe2024group5/pull/525)                                               |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Add related posts for the quiz solving screen on Mobile                             | [Issue #477](https://github.com/bounswe/bounswe2024group5/issues/477) & [PR #472](https://github.com/bounswe/bounswe2024group5/pull/472)                                               |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Add profile page and quiz creation tests for mobile                                 | [Issue #473](https://github.com/bounswe/bounswe2024group5/issues/473) & [PR #567](https://github.com/bounswe/bounswe2024group5/pull/567)                                               |
|[RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)  | Forum Testing                                                                      | [PR #604](https://github.com/bounswe/bounswe2024group5/pull/604)                                                                                                                        |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Mobile minor enhancements                                                           | [PR #574](https://github.com/bounswe/bounswe2024group5/pull/574)                                                                                                                        |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)  | Fix mobile bottom tab, duplicate delete quiz modal, home fetch                      | [PR #571](https://github.com/bounswe/bounswe2024group5/pull/571)                                                                                                                        |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Fix unit tests & quiz answer submitting, related posts, dummy leaderboard (addtl.)  | [PR #472](https://github.com/bounswe/bounswe2024group5/pull/472)                                                                                                                        |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Lab 8 content API and docs - testing strategies                                     | [PR #465](https://github.com/bounswe/bounswe2024group5/pull/465)                                                                                                                        |
| [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)   | Added Mobile Unit Test Report to Final Report                                                 | [Issue #605](https://github.com/bounswe/bounswe2024group5/issues/605)                                                                                                                   |
| [SEMİH YILMAZ](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz) | I developed backend endpoints and kept the API documentation up to date.  | | 
| [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) | Unit tests for backend | [PR #595](https://github.com/bounswe/bounswe2024group5/pull/595) | 
| [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) | Conversion favorite questions to quiz endpoint | [PR #575](https://github.com/bounswe/bounswe2024group5/pull/575) & [PR #527](https://github.com/bounswe/bounswe2024group5/pull/527) | 
| [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) | /hint endpoint | [PR #490](https://github.com/bounswe/bounswe2024group5/pull/490) & [PR #555](https://github.com/bounswe/bounswe2024group5/pull/555) | 
| [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) | Fix bugs | [PR #551](https://github.com/bounswe/bounswe2024group5/pull/551) & [PR #544](https://github.com/bounswe/bounswe2024group5/pull/544) & [PR #543](https://github.com/bounswe/bounswe2024group5/pull/543)| 
| [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) | Difficulty algorithm adjustment | [PR #484](https://github.com/bounswe/bounswe2024group5/pull/484) |
| [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) | Edit diagrams based on feedback | [Issue #613](https://github.com/bounswe/bounswe2024group5/issue/613) |
| [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) | Update RAM | [Issue #620](https://github.com/bounswe/bounswe2024group5/issue/620) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Added autofill functionality to quiz creation | [PR #536](https://github.com/bounswe/bounswe2024group5/pull/536) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Implemented leaderboard categories | [PR #530](https://github.com/bounswe/bounswe2024group5/pull/530) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Added quiz deletion feature | [PR #529](https://github.com/bounswe/bounswe2024group5/pull/529) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Implemented quiz recommendations | [PR #524](https://github.com/bounswe/bounswe2024group5/pull/524) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Enhanced question hint system by type | [PR #523](https://github.com/bounswe/bounswe2024group5/pull/523) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Added quiz completion warning | [PR #518](https://github.com/bounswe/bounswe2024group5/pull/518) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Implemented quiz link sharing | [PR #516](https://github.com/bounswe/bounswe2024group5/pull/516) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Added difficulty tooltip | [PR #515](https://github.com/bounswe/bounswe2024group5/pull/515) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Implemented question tip modal | [PR #514](https://github.com/bounswe/bounswe2024group5/pull/514) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Enhanced quiz results page | [PR #455](https://github.com/bounswe/bounswe2024group5/pull/455) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Increased test coverage for frontend features | [Issue #586](https://github.com/bounswe/bounswe2024group5/issues/586) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Fixed CEFR level intervals | [Issue #580](https://github.com/bounswe/bounswe2024group5/issues/580) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Updated IP configuration for deployment | [PR #602](https://github.com/bounswe/bounswe2024group5/pull/602) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Fixed answer randomization issues | [Issue #553](https://github.com/bounswe/bounswe2024group5/issues/553) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Added loading state indicator to profile page | [Issue #554](https://github.com/bounswe/bounswe2024group5/issues/554) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Fixed try again button functionality | [Issue #552](https://github.com/bounswe/bounswe2024group5/issues/552) |
| [Fahreddin Özcan](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan) | Wrote frontend test coverage reports | [Issue #605](https://github.com/bounswe/bounswe2024group5/issues/605) |


## 2.2 Status of Requirements

<!--- Progress according to requirements (not started, in progress, or completed). Completed means implemented, tested, documented, and deployed. -->

The status of our Software Requirements are also updated at their [wiki page](https://github.com/bounswe/bounswe2024group5/wiki/Requirements). The emojis symbolize three different state:

* ✅ is for requirements that we finished implementing it.
*  ⚠️ is for requirements that we have started working on but not finished.
* ❌ is for requirements that we have not started.

Note that we added the missing requirements according to the feedback we received from the TA.

| Requirement Number |	Progress |
|----|----|
1.1.1.1 | ✅ completed |  
1.1.1.2 | ✅ completed |  
1.1.1.3 | ✅ completed |  
1.1.1.4 | ✅ completed |  
1.1.1.5 | ✅ completed |  
1.1.1.6 | ✅ completed | 
1.1.1.7 | ✅ completed | 
1.1.1.8  | ⚠️ in progress|  
1.1.1.9  | ⚠️ in progress|  
1.1.1.10  | ❌ not started|  
1.1.2.1 | ✅ completed |  
1.1.2.2  | ❌ not started|  
1.1.2.3 | ✅ completed |  
1.1.3.1.1 | ✅ completed |  
1.1.3.1.2 | ✅ completed |  
1.1.3.1.3 | ✅ completed |  
1.1.3.1.4 | ✅ completed |  
1.1.3.1.5  | ❌ not started|  
1.1.3.1.6 | ✅ completed |  
1.1.3.1.7 | ✅ completed |  
1.1.3.1.8 | ✅ completed |  
1.1.3.1.9 | ✅ completed |  
1.1.3.1.10 | ✅ completed |  
1.1.3.1.11 | ⚠️ in progress|  
1.1.3.1.12 | ✅ completed |  
1.1.3.2.1 | ✅ completed | 
1.1.3.2.2 | ✅ completed |  
1.1.3.2.3 | ✅ completed |  
1.1.3.2.4 | ✅ completed |  
1.1.3.2.5 | ✅ completed |  
1.1.3.2.6 | ✅ completed |  
1.1.3.2.7 | ✅ completed |  
1.1.3.2.8 | ✅ completed |  
1.1.4.1 | ✅ completed |  
1.1.4.2  | ⚠️ in progress|  
1.1.4.3 | ✅ completed |  
1.1.5.1 | ✅ completed |  
1.1.5.2 | ✅ completed |  
1.1.5.3  | ❌ not started| 
1.1.5.4  | ❌ not started| 
1.1.5.5  | ❌ not started| 
1.2.1.1  | ⚠️ in progress|  
1.2.1.2.1 | ✅ completed |  
1.2.1.2.2 | ✅ completed |  
1.2.1.2.3 | ✅ completed |  
1.2.1.3 | ✅ completed |  
1.2.1.4 | ✅ completed |  
1.2.1.5  | ❌ not started|  
1.2.1.6 | ✅ completed |  
1.2.2.1  | ⚠️ in progress|  
1.2.2.2 | ✅ completed |  
1.2.2.2.1  | ❌ not started|  
1.2.2.3  | ❌ not started|  
1.2.2.4  | ⚠️ in progress|  
1.2.2.4.1  | ❌ not started|  
1.2.2.5  | ❌ not started|  
1.2.3.1 | ✅ completed |  
1.2.3.2  | ❌ not started|  
1.2.3.3 | ✅ completed |  
1.2.3.4 | ✅ completed |  
1.2.3.5 | ✅ completed | 
1.2.3.6 | ✅ completed | 
2.1.1 | ✅ completed | 
2.1.2 | ✅ completed | 
2.1.3 | ✅ completed | 
2.1.4 | ✅ completed | 
2.2.1 | ✅ completed | 
2.2.2 | ✅ completed | 
2.2.3  | ⚠️ in progress| 
2.2.4  | ⚠️ in progress| 
2.3.1  | ❌ not started| 
2.3.2 | ✅ completed | 
2.3.3  | ❌ not started| 
2.3.4 | ✅ completed |  
2.4.1  | ❌ not started| 
2.4.2  | ❌ not started| 
2.4.3 | ✅ completed | 
2.4.4  | ❌ not started| 


## 2.3 API Endpoints

* The API documentation can be directly accessed from [our repo](https://github.com/bounswe/bounswe2024group5/blob/main/doc/api-design.yml) or can be rendered from [swagger editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/bounswe/bounswe2024group5/refs/heads/main/doc/api-design.yml).
* Link to the API: http://34.121.241.21/api
* Example API calls:
    * Postman collection export can be reach [here](https://github.com/bounswe/bounswe2024group5/blob/main/doc/quizzard.postman_collection.json). 
    * Please note that you need to include bearer token to your header for API requests other than `POST /auth/register` and `POST /auth/login`.
    * You can add the token to Authorization tab under the collection. The requests inherit from there.

    ### 1. User Registration
    **Endpoint:** `POST /auth/register`  
    **Base URL:** `http://34.121.241.21:80/api`  
    **Description:** Registers a new user with the system.  

    #### Required Body Content:
    - `username` (string): The unique username for the user.  
    - `name` (string): The full name of the user.  
    - `email` (string): Email address of the user.  
    - `password` (string): Password for the user account.  
    - `englishProficiency` (string): English proficiency level (e.g., `a1`, `b2`).  

    #### Request Example:
    ```http
    POST http://34.121.241.21:80/api/auth/register
    Content-Type: application/json

    {
    "username": "johndoe",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securePassword123",
    "englishProficiency": "b1"
    }
    ```

    #### Response Example

    ``` json
    {
        "id": 1,
        "username": "johndoe",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "profile_picture": null,
        "englishProficiency": "b1",
        "points": 750,
        "created_quizzes": 0,
        "created_at": "2024-12-20T10:00:00Z",
        "updated_at": "2024-12-20T10:00:00Z"
    }
    ```

    ### 2. Create a Quiz
    **Endpoint:** `POST /quizzes`  
    **Base URL:** `http://34.121.241.21:80/api`  
    **Description:** Creates a new quiz.

    #### Required Body Content:
    - `title` (string): Title of the quiz.
    - `description` (string): A short description of the quiz.  
    - `questions` (array): List of questions, each with details.
    
    #### Request Example:
    ``` http
    POST http://34.121.241.21:80/api/quizzes
    Authorization: Bearer <your_jwt_token>
    Content-Type: application/json

    {
    "title": "English Vocabulary Quiz",
    "description": "A quiz to test your English vocabulary skills.",
    "image": "https://storage.googleapis.com/quizzard-bucket/19042e06-bfff-49c0-adce-49901b6dc726-upload.jpg",
    "questions": [
        {
        "questionType": "english_to_turkish",
        "word": "apple",
        "correctAnswer": "elma",
        "wrongAnswers": ["armut", "muz", "kiraz"]
        },
        {
        "questionType": "turkish_to_english",
        "word": "kedi",
        "correctAnswer": "cat",
        "wrongAnswers": ["dog", "bird", "fish"]
        }
    ]
    }
    ```

    #### Response Example
    ```json
    {
        "id": 89,
        "title": "English Vocabulary Quiz",
        "description": "A quiz to test your English vocabulary skills.",
        "image": "https://storage.googleapis.com/quizzard-bucket/19042e06-bfff-49c0-adce-49901b6dc726-upload.jpg",
        "difficulty": 800.0,
        "username": "johndoe",
        "createdAt": "Fri Dec 20 14:22:29 UTC 2024",
        "updatedAt": "Fri Dec 20 14:22:29 UTC 2024",
        "noFavorites": 0,
        "questions": [
            {
                "id": 245,
                "quizId": 89,
                "questionType": "english_to_turkish",
                "word": "apple",
                "correctAnswer": "elma",
                "wrongAnswers": [
                    "armut",
                    "muz",
                    "kiraz"
                ],
                "difficulty": 811.0
            },
            {
                "id": 246,
                "quizId": 89,
                "questionType": "turkish_to_english",
                "word": "kedi",
                "correctAnswer": "cat",
                "wrongAnswers": [
                    "dog",
                    "bird",
                    "fish"
                ],
                "difficulty": 789.0
            }
        ]
    }

    ```

    ### 3. Get Correct Answer Suggestions

    **Endpoint:** `GET /get-correct-answers`  
    **Base URL:** `http://34.121.241.21:80/api`  
    **Description:** Returns correct answer suggestions for a word and question type.  

    #### Required Query Parameters:
    - `word` (string): The word for which suggestions are needed.  
    - `questionType` (string): The type of question. Must be one of:
       * `english_to_sense`
       * `english_to_turkish`
       * `turkish_to_english`

    #### Request Example:
    ```http
    GET http://34.121.241.21:80/api/get-correct-answers?fast=house&questionType=english_to_turkish
    Authorization: Bearer <your_jwt_token>
    ```

    #### Response Example:
    ```json
    [
        "süratli",
        "çabuk",
        "hızlı",
        "yapışmak",
        "oruç tutmak",
        "dayanmak",
        "perhiz yapmak",
        "tez canlı",
        "çıkmaz",
        "sımsıkı"
    ]
    ```

    ### 4. Reply a Post

    **Endpoint:** `POST /posts/{postId}/replies`  
    **Base URL:** `http://34.121.241.21:80/api`  
    **Description:** Creates a new reply to a specific forum post.  

    #### Path Parameters:
    - `postId` (integer): The ID of the post to which the reply belongs.  

    #### Required Body Content:
    - `content` (string): The content of the reply.  

    #### Request Example:
    ```http
    POST http://34.121.241.21:80/api/posts/12/replies
    Content-Type: application/json
    Authorization: Bearer <your_jwt_token>

    {
        "content": "This is my reply to the post."
    }
    ```

    #### Response Example:
    ```json
    {
        "id": 456,
        "postId": 12,
        "username": "johndoe",
        "content": "This is my reply to the post.",
        "createdAt": "2024-12-20T14:30:00Z",
        "updatedAt": "2024-12-20T14:30:00Z"
    }
    ```


## 2.4 UI - UX


### Code Repository Links
- Mobile UI Implementation for Pages: [repo](https://github.com/bounswe/bounswe2024group5/tree/main/mobile/Quizzard/screens)
- Web UI Implementation for Pages: [repo](https://github.com/bounswe/bounswe2024group5/tree/main/frontend/src/pages)
- Color theme for Mobile and Web: [Violet palette](https://tailwindcss.com/docs/customizing-colors#color-object-syntax)

The following sections include links to the screenshots and the implementation per interface for mobile and web.

We created a wiki [page](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces) for the screenshots of each UI interface pages and we linked them here as well.

### Mobile Interface
      
#### Authentication
- [Login Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#1-login-screen)
  * Description of key features: Login functionalities
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/LoginScreen.tsx)
- [Registration Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#2-registration-screen)
  * Description of key features: Register functionalities
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/RegisterScreen.tsx)

#### General 
- [Home Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#3-home-screen)
  * Description of key features: Displays Quizzes for different levels
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/HomeScreen.tsx)
- [Elo-CEFR Conversion Table](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#31-elo---cefr-conversion-table)
  * Description of key features: Displays the ELO to CEFR levels conversion logic.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/components/EloCefrInfoTable.tsx)
- [Profile Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#4-profile-screen)
  * Description of key features: Displays personal information as well as personal stats.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/ProfileScreen.tsx)
- [Other Users' Profile Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#41-other-users-profile)
  * Description of key features: Displays other user's personal information as well their own quizzes and posts.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/ProfileScreen.tsx)
- [Profile Settings Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#5-profile-settings-screen)
  * Description of key features: Allows editing some personal details.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/ProfileSettingsScreen.tsx)
- [Leaderboard Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#6-leaderboard-screen)
  * Description of key features: Displays weekly and monthly high achieving users.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/LeaderboardScreen.tsx)
- [Follow List Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#7-follow-list-screen)
  * Description of key features: 
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/FollowListScreen.tsx )

#### Quiz Pages
- [Quiz Creation Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#8-quiz-creation-screen)
  * Description of key features: Allows users to create their own quizzes.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/QuizCreationScreen.tsx)
- [Quiz Welcome Page](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#9-quiz-welcome-page)
  * Description of key features: Displays some details of a quiz.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/QuizWelcomePage.tsx)
- [Quiz Solving Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#10-quiz-solving-screen)
  * Description of key features: Allows users to solve any quiz, question by question.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/QuizSolvingScreen.tsx)
- [Quiz Finish Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#11-quiz-finish-screen)
  * Description of key features: Displays end of quiz information, including the user's score and recommended quizzes.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/QuizFinishScreen.tsx)

#### Forum Pages
- [Forum Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#12-forum-screen)
  * Description of key features: Displays forum posts in a feed.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/ForumScreen.tsx)
- [Search Words Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#13-search-words-screen)
  * Description of key features: Allows users to search words for forum posts.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/SearchWordsScreen.tsx)
- [Search Results Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#14-search-results-screen)
  * Description of key features: Displays the forum search results.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/SearchResultsScreen.tsx)
- [Create Question Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#15-create-question-screen)
  * Description of key features: Allows users to post their questions in forum.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/CreateQuestionScreen.tsx)
- [Question Detail Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#16-question-detail-screen)
  * Description of key features: Displays one forum post, as well as its replies and related posts. Also allows users to add a reply to the post.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/mobile/Quizzard/screens/QuestionDetailScreen.tsx)


### Web Interface

#### Authentication
- [Login Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#1-login-screen-1)
  * Description of key features: Login functionalities
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/login-page.tsx)
- [Registration Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#2-registration-screen-1)
  * Description of key features: Register functionalities
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/sign-up.tsx)

#### General 
- [Home Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#3-home-screen-1)
  * Description of key features: Displays Quizzes for different levels
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/main-page.tsx), [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/list-quiz-page.tsx)
- [Elo-CEFR Conversion Table](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#31-elo---cefr-conversion-table-1)
  * Description of key features: Displays the ELO to CEFR levels conversion logic.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/layouts/root-layout.tsx)
- [Profile Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#4-profile-screen-1)
  * Description of key features: Displays personal information as well as personal stats.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/profile-page.tsx)
- [Other Users' Profile Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#41-other-users-profile-1)
  * Description of key features: Displays other user's personal information as well their own quizzes and posts.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/profile-page.tsx)
- [Profile Settings Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#5-profile-settings-screen-1)
  * Description of key features: Allows editing some personal details.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/components/profile/update-modal.tsx)
- [Leaderboard Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#6-leaderboard-screen-1)
  * Description of key features: Displays weekly and monthly high achieving users.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/leaderboard.tsx)

#### Quiz Pages
- [Quiz Creation Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#7-quiz-creation-screen)
  * Description of key features: Allows users to create their own quizzes. 
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/add-quiz-page.tsx)
- [Quiz Solving Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#8-quiz-solving-screen)
  * Description of key features: Allows users to solve any quiz, question by question.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/solve-quiz-page.tsx)
- [Quiz Finish Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#9-quiz-finish-screen)
  * Description of key features: Displays end of quiz information, including the user's score and recommended quizzes.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/components/solve-quiz/quiz-result.tsx)

#### Forum Pages
- [Forum Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#10-forum-screen)
  * Description of key features: Displays forum posts in a feed.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/forum-page.tsx)
- [Search Words Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#11-search-words-screen)
  * Description of key features: Allows users to search words for forum posts.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/forum-page.tsx)
- [Create Question Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#12-create-question-screen)
  * Description of key features: Allows users to post their questions in forum.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/components/forum/CreatePost.tsx)
- [Question Detail Screen](https://github.com/bounswe/bounswe2024group5/wiki/UI-Interfaces#13-question-detail-screen)
  * Description of key features: Displays one forum post, as well as its replies and related posts. Also allows users to add a reply to the post.
  * Link to implementation: [code](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/post-details-page.tsx)

Also refer to our User Experience [plan](https://github.com/bounswe/bounswe2024group5/wiki/User-Experience-Plans-and-Actions).


## 2.5 Standards

We chose ARIA as our web standard. To achieve it we used various ARIA attributes in our HTML to offer more accesibility. You can see examples of those attributes in our quiz listing page. There, we labeled element with regards to their roles so that screen readers can easily identify which element serves what purpose. We also gave ARIA labels and decriptions to certain elements so that they can be read out loud by screen readers.

## 2.6 Scenarios

We crafted an elaborate scenario encompassing all core functionalities of our project. We followed this scenario during our final presentation as well (but we had to keep it short to fit into the time we were given in the presentation). You can view our Teacher-Student scenario outline from the [wiki](https://github.com/bounswe/bounswe2024group5/wiki/Teacher-%E2%80%90-Student-Scenario-%5BCustomer-Milestone-3%5D).

The following core features were included in the scenario:
* Logging in to the app.
* Creating a quiz by entering a title and a description, uploading an image, choosing a question type and creating several questions by entering a valid word (e.g. a valid English word for Eng->Tr and Meaning question types and a valid Turkish word for the Tr->Eng question type).
* Benefiting from autocomplete functionality, when entering the question word. 
* Choosing a correct answer among the suggested answers for the provided word and question type.
* Using the suggested 3 wrong answer choices, or alternatively, inputing your own wrong choices. 
* Creating a forum post to ask questions about some words.
* Checking your current ELO - CEFR level from profile page.
* Searching for the quiz title in the home page to find a specific quiz. (only on web) 
* Navigating to the quiz creator user's profile.
* Following other users.
* Solving quizzes.
* Benefitting from the hint images (coming from Wikidata) while solving the quiz.
* If left the quiz unfinished, coming back to the same quiz later to find your previous answers retrieved.
* Liking certain quiz questions.
* Creating quizzes from liked questions. 
* Checking related posts to the quiz questions, while solving the quiz.
* Viewing how many points you gained in the Quiz Finish screen.
* Viewing recommended quizzes (based on quiz difficulty) in the Quiz Finish screen.
* Searching for forum posts in the Forum feed (semantic search is available. E.g. when "furious" is searched, posts on the word "angry" are also displayed).
* Viewing a forum post detail.
* Replying to a forum post.
* Liking forum posts.
* Viewing related posts under the forum post (based on semantic relation).
* Viewing your own quizzes, forum posts, and previous quiz attempts on your profile page.
* Changing the profile details such as profile picture, name and email.
* Viewing the accounts you follow and your followers. (only on mobile)
* Viewing the leaderboard and weekly and monthly top users under the categories "most points earned", "most quizzes solved", and "most quizzes created".
* Viewing the ELO-CEFR conversion table from the top of the app (the question mark "?"), to remember the correspondence between the ELO scores and CEFR language levels.

***

# 3. Individual Contributions

<!---
Each member must add a section to the group report, including hyperlinks and references to
their work on GitHub. This section must highlight personal contributions to the project and align
with software engineering concepts.

Required Format:
* Member: Name, group, and subgroup (e.g., backend, frontend, Android).
* Responsibilities: Overall description of assigned responsibilities.
* Main Contributions: Description of personal contributions to the project, including:
    * Code-Related Significant Issues: Issues contributing to the code base
demonstrated during the demo.
    * Management-Related Significant Issues: Issues contributing to the management of the software project.
* Pull Requests: Personal pull requests.
* Unit Tests: All unit tests written personally.
* Additional Information: Further relevant information about contributions (optional).
-->

## 3.1 [ARINÇ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir)
### Member
Arınç Demir - Group 5 (Quizzard) - Android
### Responsibilities
Android Development, UI Improvement
### Main Contributions
Here is what I did in the labs:
- I Wrote the acceptance criteria about domain-spesific features. [Lab Report #8](https://github.com/bounswe/bounswe2024group5/pull/465)
- I added the autocomplete feature to quiz creation in mobile. [Lab Report #9](https://github.com/bounswe/bounswe2024group5/wiki/Lab-Report-9)

In addition to that, I discussed features and progress with my group mates in the labs.

Here is what I implemented in my own time:

- Fix quiz creation endpoints. [#501](https://github.com/bounswe/bounswe2024group5/issues/501), [PR#534](https://github.com/bounswe/bounswe2024group5/pull/534)
- Add hint image to quiz solving. [#502](https://github.com/bounswe/bounswe2024group5/issues/502), [PR#538](https://github.com/bounswe/bounswe2024group5/pull/538)
- Add favoriting questions. [#504](https://github.com/bounswe/bounswe2024group5/issues/504), [PR#563](https://github.com/bounswe/bounswe2024group5/pull/563)
- Create quiz from favorite questions. [#505](https://github.com/bounswe/bounswe2024group5/issues/505), [PR#572](https://github.com/bounswe/bounswe2024group5/pull/572)
- Reviewed bunch of pull requests.

Also, I navigated the web and mobile apps in the presentation on my computer.

### Pull Requests
#### Own PR's
- Fix quiz creation endpoints. [PR#534](https://github.com/bounswe/bounswe2024group5/pull/534)
- Add hint image to quiz solving. [PR#538](https://github.com/bounswe/bounswe2024group5/pull/538)
- Add favoriting questions to mobile. [PR#563](https://github.com/bounswe/bounswe2024group5/pull/563)
- Modifications on show hint. [PR#564](https://github.com/bounswe/bounswe2024group5/pull/564)
- Fix quiz creation flatlist issue. [PR#566](https://github.com/bounswe/bounswe2024group5/pull/566)
- Create quiz from favorites. [PR#572](https://github.com/bounswe/bounswe2024group5/pull/572)
- Quiz creation fixes. [PR#590](https://github.com/bounswe/bounswe2024group5/pull/590)
#### Reviews
- [PR#546](https://github.com/bounswe/bounswe2024group5/pull/546)
- [PR#561](https://github.com/bounswe/bounswe2024group5/pull/561)
- [PR#565](https://github.com/bounswe/bounswe2024group5/pull/565)
- [PR#579](https://github.com/bounswe/bounswe2024group5/pull/579)
- [PR#585](https://github.com/bounswe/bounswe2024group5/pull/585)
#### Unit Tests
Unfortunately, my unit tests have not made it into the milestone 3 release. I started it but because they were not functional, I didn't publish them.
#### Additional Information
I update my [personal page](https://github.com/bounswe/bounswe2024group5/wiki/Ar%C4%B1n%C3%A7-Demir) regularly. You can see there when I made my contributions and how long they took.

## 3.2 [ASUDE EBRAR KIZILOĞLU](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu)

### Member: 
Asude Ebrar Kiziloglu, Group 5, Android.

### Responsibilities: 

Group Communicator, Mobile (Android) Developer, Documenter.

### Main Contributions: 

#### Mobile Development:

* Implemented comprehensive profile page functionality including "My Quizzes", "My Posts", and "My Quiz Attempts" sections.
* Created unified profile view system for both personal and other users' profiles with [Ramazan](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar).
* Added following/follower functionality with user navigation.
* Fixed forum post upvoting bugs and implemented related posts feature.
* Enhanced UI with collapsible sections for replies and related posts.
* Coordinated with frontend team for consistent color palette across platforms.

#### Feature Implementation:

* Added ELO-CEFR conversion table as per customer request.
* Completed quiz favorite functionality.
* Implemented unit tests for forum features.
* Collaborated on testing with [Ramazan](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar).

#### Project Management & Documentation:

* Co-developed Teacher-Student [scenario](https://github.com/bounswe/bounswe2024group5/wiki/Teacher-%E2%80%90-Student-Scenario-%5BCustomer-Milestone-3%5D) for the presentation with [Deniz](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir).
* Managed lab agendas and task distribution.
* Maintained [Project Plan](https://github.com/orgs/bounswe/projects/67/views/4).
* Led this milestone report organization.
* Wrote the [Executive Summary](#1-executive-summary), [4. Deliverables](#4-deliverables) sections, and specific subsections ([2.2](#22-Status-of-Requirements), [2.4](#24-UI---UX), and [2.6](#26-Scenarios)) of the report.
* Created [user](https://github.com/bounswe/bounswe2024group5/wiki/User-Manual) and [system](https://github.com/bounswe/bounswe2024group5/wiki/System-Manual) manuals.
* Updated software requirements by adding the missing ones and updating the requirement status based on TA feedback.
* Participated in all team gatherings, in the lab and outside. Kept constant communication with the team. Was grateful for our united hard work!

The following sections include the issues I worked on:

#### Code-Related Significant Issues: 

- [#485](https://github.com/bounswe/bounswe2024group5/issues/485): "Related posts" feature in viewing a forum post. [PR #561](https://github.com/bounswe/bounswe2024group5/pull/561)
- [#486](https://github.com/bounswe/bounswe2024group5/issues/486): Bugfix: Forum posts upvote/downvote. [PR #545](https://github.com/bounswe/bounswe2024group5/pull/545)
- [#487](https://github.com/bounswe/bounswe2024group5/issues/487): ELO/CEFR conversion table in Mobile app. [PR #546](https://github.com/bounswe/bounswe2024group5/pull/546)
- [#488](https://github.com/bounswe/bounswe2024group5/issues/488): Complete Profile Page. [PR #492](https://github.com/bounswe/bounswe2024group5/pull/492)
- [#489](https://github.com/bounswe/bounswe2024group5/issues/489): Forum Testing in Mobile. [PR #545](https://github.com/bounswe/bounswe2024group5/pull/545), [PR #604](https://github.com/bounswe/bounswe2024group5/pull/604).
- [#509](https://github.com/bounswe/bounswe2024group5/issues/509): Other User's Profile Screen in Mobile. [PR #550](https://github.com/bounswe/bounswe2024group5/pull/550), [PR #565](https://github.com/bounswe/bounswe2024group5/pull/565). Follow logic && Follow lists. [PR #570](https://github.com/bounswe/bounswe2024group5/pull/570), [PR #573](https://github.com/bounswe/bounswe2024group5/pull/573).
- [#568](https://github.com/bounswe/bounswe2024group5/issues/568): Favorite Quizzes in Mobile. [PR #569](https://github.com/bounswe/bounswe2024group5/pull/569)

#### Management-Related Significant Issues: 

- [#612](https://github.com/bounswe/bounswe2024group5/issues/612): Plan for the final presentation scenario.
- [#605](https://github.com/bounswe/bounswe2024group5/issues/605): Organizing to preparing this report.
- [#614](https://github.com/bounswe/bounswe2024group5/issues/614): Preparing the User Manual.
- [#615](https://github.com/bounswe/bounswe2024group5/issues/615): Preparing the System Manual.
- [#317](https://github.com/bounswe/bounswe2024group5/issues/317): Arrange the Project plan [Roadmap view](https://github.com/orgs/bounswe/projects/67/views/4).

### Pull Requests: 

#### Created

- [PR #492](https://github.com/bounswe/bounswe2024group5/pull/492): Profile Page.
- [PR #545](https://github.com/bounswe/bounswe2024group5/pull/545): Forum upvoting bugfix.
- [PR #546](https://github.com/bounswe/bounswe2024group5/pull/546): Elo-Cefr conversion table.
- [PR #561](https://github.com/bounswe/bounswe2024group5/pull/561): Related posts in forum
- [PR #565](https://github.com/bounswe/bounswe2024group5/pull/565): Navigation to others profile
- [PR #569](https://github.com/bounswe/bounswe2024group5/pull/569): Favorite quizzes mobile
- [PR #570](https://github.com/bounswe/bounswe2024group5/pull/570): Following follower pages
- [PR #579](https://github.com/bounswe/bounswe2024group5/pull/579): Integrate the `(DELETE /favorite-question)`endpoint to remove questions from favorites.
- [PR #604](https://github.com/bounswe/bounswe2024group5/pull/604): Forum Testing.
- [PR #550](https://github.com/bounswe/bounswe2024group5/pull/550), [PR #573](https://github.com/bounswe/bounswe2024group5/pull/573), [PR #585](https://github.com/bounswe/bounswe2024group5/pull/585), [PR #593](https://github.com/bounswe/bounswe2024group5/pull/593): Minor Hotfixes


#### Reviewed/Merged

- [PR #472](https://github.com/bounswe/bounswe2024group5/pull/472).
- [PR #507](https://github.com/bounswe/bounswe2024group5/pull/507).
- [PR #513](https://github.com/bounswe/bounswe2024group5/pull/513).
- [PR #525](https://github.com/bounswe/bounswe2024group5/pull/525).
- [PR #564](https://github.com/bounswe/bounswe2024group5/pull/564).
- [PR #567](https://github.com/bounswe/bounswe2024group5/pull/567).
- [PR #571](https://github.com/bounswe/bounswe2024group5/pull/571).
- [PR #590](https://github.com/bounswe/bounswe2024group5/pull/590).
- [PR #597](https://github.com/bounswe/bounswe2024group5/pull/597).


### Unit Tests: 
I wrote unit tests for the forum functionalities. See `ForumScreen.test.js`, `QuestionDetailScreen.test.tsx` and  `QuizCreationScreen.test.js` in the [test directory](https://github.com/bounswe/bounswe2024group5/tree/main/mobile/Quizzard/__tests__). [PR #604](https://github.com/bounswe/bounswe2024group5/pull/604)


## 3.3 [FAHREDDİN ÖZCAN](https://github.com/bounswe/bounswe2024group5/wiki/Fahreddin-%C3%96zcan)

### Member
Fahreddin Özcan, Grup 5, Frontend

### Responsibilities
Frontend Development, Testing Implementation, Feature Development, UI/UX Improvements, Documentation

### Main Contributions

In this milestone, I worked on making our platform more user-friendly and stable. I built several new features and fixed important bugs to improve how users interact with our quizzes.

I built the leaderboard feature, which lets users see top performers in different categories. I also added quiz recommendations that show up after users finish a quiz, helping them find new content to practice with. To make quizzes more engaging, I added features like favoriting quizzes and questions, and made it easy to share quiz links with others.

For user alerts and feedback, I added warning messages that tell users when they've already completed a quiz, and hints that help during quiz-taking. I also built the follow/follower system so users can connect with each other.

I spent a lot of time fixing problems with our quiz system. I fixed how difficulty levels are calculated, made sure questions appear in the right order, and fixed issues with the try-again button. I also added loading spinners so users know when the page is working, and made the profile pages work better.

To keep our code quality high, I added more tests to catch bugs early. I also worked closely with our backend team to make sure all our features worked smoothly with their APIs.

### Code-related significant issues

- [#586 [Frontend] Increase Test Coverage](https://github.com/bounswe/bounswe2024group5/issues/586)
- [#580 Fix Difficulty Intervals](https://github.com/bounswe/bounswe2024group5/issues/580)
- [#554 [Frontend] Show Spinner on Profile Load](https://github.com/bounswe/bounswe2024group5/issues/554)
- [#553 [Frontend] Fix Answer Randomization Issue](https://github.com/bounswe/bounswe2024group5/issues/553)
- [#552 [Frontend] Fix Try Again Button on Results Page](https://github.com/bounswe/bounswe2024group5/issues/552)
- [#532 [Frontend] Get Correct/Wrong Answer Suggestions From Backend](https://github.com/bounswe/bounswe2024group5/issues/532)
- [#528 [Frontend] Delete Quiz Feature](https://github.com/bounswe/bounswe2024group5/issues/528)
- [#522 [Frontend] Retrieve Question Hint Based On Question Type](https://github.com/bounswe/bounswe2024group5/issues/522)
- [#521 [Frontend] Show Quiz Recommendations after solving quiz](https://github.com/bounswe/bounswe2024group5/issues/521)
- [#517 [Frontend] Add Warning for Already Completed Quiz](https://github.com/bounswe/bounswe2024group5/issues/517)
- [#503 [Frontend] Implement Leaderboard](https://github.com/bounswe/bounswe2024group5/issues/503)
- [#500 [Frontend] Follow Event/Follower Features](https://github.com/bounswe/bounswe2024group5/issues/500)
- [#499 [Frontend] Quiz Link Copy and Share Feature](https://github.com/bounswe/bounswe2024group5/issues/499)
- [#497 [Frontend] Create tooltip for difficulty explanation](https://github.com/bounswe/bounswe2024group5/issues/497)
- [#495 [Frontend] Add Quiz Hints to Quiz Solving Page](https://github.com/bounswe/bounswe2024group5/issues/495)
- [#494 Implement Quiz and Question Favourite feature](https://github.com/bounswe/bounswe2024group5/issues/494)
- [#493 Fix Profile Page Routing](https://github.com/bounswe/bounswe2024group5/issues/493)
- [#602 Update IP](https://github.com/bounswe/bounswe2024group5/pull/602)

### Management-related significant issues

- [#502 [MILESTONE 2] Individual Contribution Table (everyone writes for their own)](https://github.com/bounswe/bounswe2024group5/issues/502)

### Pull Requests

#### Created

- [Update IP](https://github.com/bounswe/bounswe2024group5/pull/602)
- [Increase Test Coverage](https://github.com/bounswe/bounswe2024group5/pull/587)
- [Fix CEFR Level Intervals](https://github.com/bounswe/bounswe2024group5/pull/581)
- [Fix: Remove Option Randomization](https://github.com/bounswe/bounswe2024group5/pull/559)
- [Feat: Spinner on Profile Page](https://github.com/bounswe/bounswe2024group5/pull/558)
- [Fix: Enable Try Again Button Function](https://github.com/bounswe/bounswe2024group5/pull/557)
- [Feat: Autofill Button on Quiz Creation Page](https://github.com/bounswe/bounswe2024group5/pull/536)
- [Feat: Leaderboard with Different Categories and Intervals](https://github.com/bounswe/bounswe2024group5/pull/530)
- [Delete Quiz Feature](https://github.com/bounswe/bounswe2024group5/pull/529)
- [Quiz Recommendations on Result Page](https://github.com/bounswe/bounswe2024group5/pull/524)
- [Consider Question Type When Fetching Question Hint](https://github.com/bounswe/bounswe2024group5/pull/523)
- [Feat: "You have already solved this quiz" warning](https://github.com/bounswe/bounswe2024group5/pull/518)
- [Feat: Copy and Share Quiz Link](https://github.com/bounswe/bounswe2024group5/pull/516)
- [Feat: Difficulty Levels Explanation Tooltip](https://github.com/bounswe/bounswe2024group5/pull/515)
- [Feat: Add Question Tip Modal](https://github.com/bounswe/bounswe2024group5/pull/514)
- [Add Milestone Report 2](https://github.com/bounswe/bounswe2024group5/pull/462)
- [Update Results Page](https://github.com/bounswe/bounswe2024group5/pull/455)

#### Reviewed
- [Review PR #512](https://github.com/bounswe/bounswe2024group5/pull/512) - 494 implement quiz favorite
- [Review PR #511](https://github.com/bounswe/bounswe2024group5/pull/511) - 494 implement favorite question
- [Review PR #531](https://github.com/bounswe/bounswe2024group5/pull/531)
- [Review PR #537](https://github.com/bounswe/bounswe2024group5/pull/537)
- [PR #600](https://github.com/bounswe/bounswe2024group5/pull/600) - Update instructions.md
- [PR #597](https://github.com/bounswe/bounswe2024group5/pull/597) - fix plus sign
- [PR #589](https://github.com/bounswe/bounswe2024group5/pull/589) - 562 follow unit test
- [PR #578](https://github.com/bounswe/bounswe2024group5/pull/578) - fix search endpoint
- [PR #577](https://github.com/bounswe/bounswe2024group5/pull/577) - implement create quiz from favorites
- [PR #560](https://github.com/bounswe/bounswe2024group5/pull/560) - 549 fix favorite
- [PR #537](https://github.com/bounswe/bounswe2024group5/pull/537) - implement quiz update
- [PR #531](https://github.com/bounswe/bounswe2024group5/pull/531) - 500 implement follow
- [PR #513](https://github.com/bounswe/bounswe2024group5/pull/513) - change profile route parameter name to fix the bug
- [PR #512](https://github.com/bounswe/bounswe2024group5/pull/512) - 494 implement quiz favorite
- [PR #511](https://github.com/bounswe/bounswe2024group5/pull/511) - 494 implement favorite question


### Unit tests

I've introduced some tests in [PR #587](https://github.com/bounswe/bounswe2024group5/pull/587), which covers the features below:

- Copy quiz link to clip board -> [related test](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/components/copy-quiz-link-button.test.tsx)
- Quiz hints -> [related tests](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/components/solve-quiz/quiz-action-buttons.test.tsx)
- Quiz recommendations -> [related tests](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/components/solve-quiz/quiz-recommendations.test.tsx)
- Leaderboard -> [related tests](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/leaderboard.test.tsx)

### Additional Information

During this milestone, I focused on making our app more reliable and easier to use. I spent time testing features thoroughly and fixing bugs that users reported. The hardest part was getting all the quiz features to work together smoothly, especially when users are taking quizzes or checking their results. I also made sure that the pages load faster and show helpful information while users wait.

Working with the backend team was sometimes tricky when we were building new features, but we managed to sort out any issues through regular communication. I'm particularly proud of how the leaderboard and quiz recommendation systems turned out - they make the app more engaging for users.


## 3.4 [HALİL UTKU ÇELİK](https://github.com/bounswe/bounswe2024group5/wiki/Halil-Utku-%C3%87elik)


### Responsibilities: 

- Backend development
- Deployment

### Main Contributions: 

In this milestone, I focused on enhancing the backend functionality of our platform. I worked on improving the quiz creation system, and fixing bugs.

I implemented wrong answer suggestion endpoint. This feature suggests wrong answers to the user while creating a quiz for given question. The wrong answer suggestion algorithm is based on the semantic links between the words. The endpoint suggests the most relevant wrong answers to the user.

I also implemented the leaderboard endpoint which returns the top users in different categories. The leaderboard endpoint is used to display the top users in the frontend.

### Code-Related Significant Issues:  

- [#584:](https://github.com/bounswe/bounswe2024group5/issues/584) Enhance wrong answer suggestions with other questions.  
- [#547:](https://github.com/bounswe/bounswe2024group5/issues/547) Implement leaderboard endpoint   
- [#496:](https://github.com/bounswe/bounswe2024group5/issues/496) Implement wrong answer suggestion endpoint  
- [#470:](https://github.com/bounswe/bounswe2024group5/issues/470) Increase Test Coverage For Backend  

### Management-Related Significant Issues:  

- [#607:](https://github.com/bounswe/bounswe2024group5/issues/607) Individual Contributions (everyone)  
- [#606:](https://github.com/bounswe/bounswe2024group5/issues/606) 2.1 Individual Work Table (everyone)  

### Pull Requests:  

#### Created  

- [PR #596:](https://github.com/bounswe/bounswe2024group5/pull/596) Fix answer suggestion tests  
- [PR #594:](https://github.com/bounswe/bounswe2024group5/pull/594) Limit leaderboard with 10 users  
- [PR #591:](https://github.com/bounswe/bounswe2024group5/pull/591) Fix duplicate wrong answer suggestions  
- [PR #588:](https://github.com/bounswe/bounswe2024group5/pull/588) Enhance wrong answer suggestions and write unit tests  
- [PR #583:](https://github.com/bounswe/bounswe2024group5/pull/583) Implement answer suggestion endpoints
- [PR #526:](https://github.com/bounswe/bounswe2024group5/pull/526) Implement leaderboard functionality with service and controller 

#### Reviewed/Merged  

- [PR #492:](https://github.com/bounswe/bounswe2024group5/pull/603) improved posts endpoint   
- [PR #534:](https://github.com/bounswe/bounswe2024group5/pull/598) feed improvement
- [PR #538:](https://github.com/bounswe/bounswe2024group5/pull/595) test(back): added some unit tests  
- [PR #545:](https://github.com/bounswe/bounswe2024group5/pull/520) implement related quizzes endpoint  


### Tests: 
- I wrote unit tests for answer suggestion endpoints.
- I also tested the integration of backend and frontend after each deployment and reported the issues to the team.

### Additional Information:

- While the latest deployment was being done, I encountered an issue with the storage of the VPS and I had to fix it. I increased the disk space of the VPS and rebooted the server. After that, the deployment was successful, but since the IP address of the server was not static, we needed to update the IP address in the frontend and mobile.


## 3.5 [ÖZGÜR DENİZ DEMİR](https://github.com/bounswe/bounswe2024group5/wiki/%C3%96zg%C3%BCr-Deniz-Demir)

Role: Frontend Web Application

### Responsibilities

I implemented several of the features that we added to our application in this milestone. I was responsible for creating the user interfaces that enable our users to take advantage of those new features.

### Main Contributions

I implemented the following features:

* Question favorite: [#494](https://github.com/bounswe/bounswe2024group5/issues/494)
* Quiz favorite: [#494](https://github.com/bounswe/bounswe2024group5/issues/494)
* Follow: [#500](https://github.com/bounswe/bounswe2024group5/issues/500)
* Quiz update: [#533](https://github.com/bounswe/bounswe2024group5/issues/533)
* Create quiz from favorites: [#535](https://github.com/bounswe/bounswe2024group5/issues/535)

### Pull Requests

* [Implement favorite Question](https://github.com/bounswe/bounswe2024group5/pull/511)
* [Implement Favorite Quiz](https://github.com/bounswe/bounswe2024group5/pull/512)
* [Fix Profile Routing](https://github.com/bounswe/bounswe2024group5/pull/513)
* [Implement Follow](https://github.com/bounswe/bounswe2024group5/pull/531)
* [Implement Quiz Update](https://github.com/bounswe/bounswe2024group5/pull/537)
* [Small Fix](https://github.com/bounswe/bounswe2024group5/pull/560)
* [Implement Create Quiz From Favorites](https://github.com/bounswe/bounswe2024group5/pull/577)
* [Small Fix](https://github.com/bounswe/bounswe2024group5/pull/578)
* [Unit Test](https://github.com/bounswe/bounswe2024group5/pull/589)
* [Small Fix](https://github.com/bounswe/bounswe2024group5/pull/597)
* [Instructions for Running App](https://github.com/bounswe/bounswe2024group5/pull/600)

### Unit Tests

I wrote one unit test to see if the follow button that I implemented earlier was working correctly. You can see the source code [here](https://github.com/bounswe/bounswe2024group5/blob/main/frontend/src/pages/follow-button.test.tsx).

### Additional Information

I, along with Ebrar, came up with the presentation scenario.

## 3.6 [RAMAZAN ONUR ACAR](https://github.com/bounswe/bounswe2024group5/wiki/Ramazan-Onur-Acar)

### Member: 
Ramazan Onur Acar, Group 5, Android.

### Responsibilities: 

-  Mobile Developer

### Main Contributions: 

In this milestone, I focused on enhancing the mobile platform's usability and stability by building new features, fixing critical bugs, and improving the overall user experience.

I added a quiz-solving status feature, allowing users to track their progress more easily. The leaderboard page was also implemented, letting users view top performers in real-time with different metrics. To improve quiz engagement, I added quiz suggestion feature that recommends new content after users finish a quiz, and added related posts on the quiz-solving screen to provide deeper insights, allowing users to see all related posts and their replies.

I worked on improving the mobile quiz system by fixing the quiz attempt API calls and adding missing APIs. I also fixed mobile unit tests and added new tests for profile pages and quiz creation, ensuring robust functionality. Additionally, I enhanced the UI with custom confirmation and information modals, pagination for the forum post screen, better navigation for completed quizzes, and updated fetching logic for the Home Screen to improve performance.


### Code-Related Significant Issues:  

- [#476:](https://github.com/bounswe/bounswe2024group5/issues/476) Add quiz solving status to mobile  
- [#475:](https://github.com/bounswe/bounswe2024group5/issues/475) Fix Quiz attempt API call and add missing API calls for this screen  
- [#474:](https://github.com/bounswe/bounswe2024group5/issues/474) Add Leaderboard page for mobile  
- [#509:](https://github.com/bounswe/bounswe2024group5/issues/509) Other User's Profile Screen in Mobile  
- [#478:](https://github.com/bounswe/bounswe2024group5/issues/478) Add quiz suggestions after quiz finishes  
- [#477:](https://github.com/bounswe/bounswe2024group5/issues/477) Add related posts for the quiz solving screen on Mobile  
- [#473:](https://github.com/bounswe/bounswe2024group5/issues/473) Add profile page and quiz creation tests for mobile  

### Management-Related Significant Issues:  

- [#607:](https://github.com/bounswe/bounswe2024group5/issues/607) Individual Contributions (everyone)  
- [#606:](https://github.com/bounswe/bounswe2024group5/issues/606) 2.1 Individual Work Table (everyone)  
- [#605:](https://github.com/bounswe/bounswe2024group5/issues/605) Prepare the Final Milestone Report  

### Pull Requests:  

#### Created  

- [PR #604:](https://github.com/bounswe/bounswe2024group5/pull/604) Forum Testing  
- [PR #574:](https://github.com/bounswe/bounswe2024group5/pull/574) Mobile minor enhancements  
- [PR #571:](https://github.com/bounswe/bounswe2024group5/pull/571) Fix mobile bottom tab, duplicate delete quiz modal, home screen fetch logic  
- [PR #567:](https://github.com/bounswe/bounswe2024group5/pull/567) Mobile/profile tests and forum  
- [PR #525:](https://github.com/bounswe/bounswe2024group5/pull/525) Add/mobile quiz recommendations, enhance UI, add leaderboard  
- [PR #507:](https://github.com/bounswe/bounswe2024group5/pull/507) Fix status and last activity time and enhance UI for quiz attempts of mobile  
- [PR #472:](https://github.com/bounswe/bounswe2024group5/pull/472) Fix unit tests & quiz answer submitting and add related post functionality and dummy leaderboard  
- [PR #465:](https://github.com/bounswe/bounswe2024group5/pull/465) Lab 8 content API and its documentation - testing strategies  

#### Reviewed/Merged  

- [PR #492:](https://github.com/bounswe/bounswe2024group5/pull/492) Implement Profile Page Sections in Mobile  
- [PR #534:](https://github.com/bounswe/bounswe2024group5/pull/534) Fix quiz creation endpoints  
- [PR #538:](https://github.com/bounswe/bounswe2024group5/pull/538) Add hint image to quiz solving  
- [PR #545:](https://github.com/bounswe/bounswe2024group5/pull/545) Forum upvoting bugfix and UI modifications for mobile  
- [PR #550:](https://github.com/bounswe/bounswe2024group5/pull/550) Hotfix delete quiz functionality  
- [PR #563:](https://github.com/bounswe/bounswe2024group5/pull/563) Favorite questions mobile  
- [PR #566:](https://github.com/bounswe/bounswe2024group5/pull/566) Fix quiz creation flatlist  
- [PR #569:](https://github.com/bounswe/bounswe2024group5/pull/569) Favorite quizzes mobile  
- [PR #570:](https://github.com/bounswe/bounswe2024group5/pull/570) Following follower pages in Mobile  
- [PR #572:](https://github.com/bounswe/bounswe2024group5/pull/572) Quiz from favorites mobile  
- [PR #573:](https://github.com/bounswe/bounswe2024group5/pull/573) Hotfix: Handle 0 following & 0 follower cases  
- [PR #593:](https://github.com/bounswe/bounswe2024group5/pull/593) Hotfix quiz solve & forum reply  
- [PR #601:](https://github.com/bounswe/bounswe2024group5/pull/601) Change IP  


### Unit Tests: 
- **Testing Stratagies**: I worked on testing stratagies with [Semih](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz) and [Süleyman](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan) in LAB 8.
- **Forum Testing**: I collaborated with [Ebrar](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) to fix and refine some of her unit tests for forum functionalities. [PR #604](https://github.com/bounswe/bounswe2024group5/pull/604)
- **Profile Page and Quiz Creation Tests**: Implemented unit tests to ensure the reliability of profile pages and quiz creation features. [Issue #473](https://github.com/bounswe/bounswe2024group5/issues/473)

### Additional Information:

- In this milestone, other than the issues on functionality and performance of the app, I tried to fix any ill-looking component and page, and provide a modernistic look in the mobile. Therefore, I added some modals, changed some styles etc. Most of them are not mentioned in the issues and PR's, but mentioned in the commits inside them.


## 3.7 [SEMİH YILMAZ](https://github.com/bounswe/bounswe2024group5/wiki/Semih-Y%C4%B1lmaz)

### Member: 
Semih Yılmaz, Group 5, Backend

### Responsibilities

Backend Development, API Documentor, Database Designer

### Main Contributions

My main responsibility was to develop backend endpoints.

#### Code-related significant issues

- [#466: Restrict quiz scoring to first attempt](https://github.com/bounswe/bounswe2024group5/issues/466)
- [#467: Prevent scoring on self-created quizzes](https://github.com/bounswe/bounswe2024group5/issues/467)
- [#468: Add like counts to quiz responses](https://github.com/bounswe/bounswe2024group5/issues/468)
- [#470: Increase Test Coverage For Backend](https://github.com/bounswe/bounswe2024group5/issues/470)
- [#471: Implement follower functionality](https://github.com/bounswe/bounswe2024group5/issues/471)
- [#519: Implement related quizzes endpoint](https://github.com/bounswe/bounswe2024group5/issues/519)
- [#541: Fix GET Response of Favorite Quiz Endpoint](https://github.com/bounswe/bounswe2024group5/issues/541)
- [#617: Fix the bug related to Quiz Creation with Favorite Questions](https://github.com/bounswe/bounswe2024group5/issues/617)
- [#618: Enhance forum feed endpoint](https://github.com/bounswe/bounswe2024group5/issues/618)


#### Management-related significant issues

- [#469: Prepare General Meeting Notes #4](https://github.com/bounswe/bounswe2024group5/issues/469): Prepared [meeting notes](https://github.com/bounswe/bounswe2024group5/wiki/General-Meeting-%234-%7C-06.12.2024)


### Pull Requests

#### Created

- [#479: Restrict quiz scoring to only first attempt](https://github.com/bounswe/bounswe2024group5/pull/479)
- [#480: Prevent scoring on self created quizzes](https://github.com/bounswe/bounswe2024group5/pull/480)
- [#481: Add like counts to quiz responses](https://github.com/bounswe/bounswe2024group5/pull/481)
- [#482: Endpoints for following functionality](https://github.com/bounswe/bounswe2024group5/pull/482)
- [#520: Endpoints for related quizzes](https://github.com/bounswe/bounswe2024group5/pull/520)
- [#582: Fixed a bug in create quiz from favorites endpoint](https://github.com/bounswe/bounswe2024group5/pull/582)
- [#598: Feed improvement](https://github.com/bounswe/bounswe2024group5/pull/598)
- [#603: Improved posts endpoint](https://github.com/bounswe/bounswe2024group5/pull/603)

#### Collaborated

- [#484: Difficulty algorithm adjustment ](https://github.com/bounswe/bounswe2024group5/pull/484) I worked with Süleyman to optimize difficulty level intervals and fixed its dependencies in the code.
- [#490: Wikidata usage for hint](https://github.com/bounswe/bounswe2024group5/pull/490) I optimized the results of the endpoint developed by Süleyman. 
- [#526: Implement leaderboard functionality](https://github.com/bounswe/bounswe2024group5/pull/526) I documented the API for the endpoint developed by Utku.

#### Reviewed/Merged

- [#527: Conversion favorite questions into a quiz](https://github.com/bounswe/bounswe2024group5/pull/527)
- [#543: Fixed wrong response of /auth/login ](https://github.com/bounswe/bounswe2024group5/pull/543)
- [#544: Fixed the response of GET favorite quiz](https://github.com/bounswe/bounswe2024group5/pull/544)
- [#555: Getting 4 images from wikidata](https://github.com/bounswe/bounswe2024group5/pull/555)
- [#576: Update from favorites endpoint](https://github.com/bounswe/bounswe2024group5/pull/576)
- [#583: Answer suggestion endpoints](https://github.com/bounswe/bounswe2024group5/pull/583)

### Unit Tests

I wrote tests for the following classes: `AnswerSuggestionService`, `PostService`, `QuestionService`, `QuizAttemptService`, `AnswerSuggestionService`, `QuestionAnswerService`, `QuizService`, `ReplyService`, `UpvoteService`, and `UserService`  

The unit tests are located [here](https://github.com/bounswe/bounswe2024group5/tree/main/backend/src/test/java/com/quizzard/quizzard/service). 

### Additional Information

I moderated the meeting which we plan what to do for this milestone. I tested backend, web and mobile app and then reported/fixed the bugs. Also I wrote API endpoints part of this report.

## 3.8 [SÜLEYMAN EMİR TAŞAN](https://github.com/bounswe/bounswe2024group5/wiki/S%C3%BCleyman-Emir-Ta%C5%9Fan)
### Member: 
Süleyman Emir Taşan, Group 5, Backend.

### Responsibilities: 

Backend Developer, Database, API-DOC.

### Main Contributions: 

My priority in this Milestone was to fix the score system and score calculation algorithm that we did not like from the 2nd milestone. I also received significant help from Semih here. Currently, we have a much better score calculation system in our application than the previous ones. In the next stage, I wrote the /hint endpoint to be able to add the wikidata we received as feedback from the 2nd milestone and to add hints to the questions. First of all, there are wikidata entries by word here and I select the most relevant (correct) entries and create 2 image URLs from there (if any) and send them to the web and mobile teams. Then Semih did some optimizations in this endpoint, after that I changed number of URLs to 4 (previously 3).

In the next stage, I wrote the endpoint to create an automatic quiz from favorited questions. In this way, I ensured a very positive experience for the user.

Later, I realized that the responses of the "GET /favorite-questions" and "GET /favorite-quizzes" endpoints were wrong and I corrected this.

After completing the code part, I worked to complete the unit tests of the service layer. I wrote unit tests for FavoriteQuestionService, FeedServiceTest, FileUploadService, FollowingService, LeaderboardService and WikidataService.

I edited the diagrams based on feedback from MS1. Then I updated the RAM. 
I participated in all labs and had open communication with the team. This allowed the problems to be solved very quickly with my team and the backend group. This is how I completed my last milestone with my team. I was very happy to be with this team.

The following sections include the issues I worked on:

#### Code-Related Significant Issues: 

- [#470](https://github.com/bounswe/bounswe2024group5/issues/470): Unit tests for backend
- [#483](https://github.com/bounswe/bounswe2024group5/issues/483): Adjust score system
- [#491](https://github.com/bounswe/bounswe2024group5/issues/491): Hint for Questions
- [#498](https://github.com/bounswe/bounswe2024group5/issues/498): Conversion favorite questions to quizzes
- [#508](https://github.com/bounswe/bounswe2024group5/issues/508): Revision for point calculation
- [#541](https://github.com/bounswe/bounswe2024group5/issues/541): Fix GET Response of Favorite Quiz and Question Endpoint
- [#542](https://github.com/bounswe/bounswe2024group5/issues/542): Fix response of "POST /auth/login" details in api-doc
- [#556](https://github.com/bounswe/bounswe2024group5/issues/556): Prevent irrelevant images in response of /hint 
- [#575](https://github.com/bounswe/bounswe2024group5/issues/575): Add Description and Image Fields to Favorite Questions Endpoint

#### Management-Related Significant Issues: 

- [#620](https://github.com/bounswe/bounswe2024group5/issues/620): Update RAM
- [#613](https://github.com/bounswe/bounswe2024group5/issues/613): Edit diagrams based on feedback

### Pull Requests: 

#### Created

- [PR #595](https://github.com/bounswe/bounswe2024group5/pull/595): Unit tests
- [PR #575](https://github.com/bounswe/bounswe2024group5/pull/576): Update from favorites endpoint 
- [PR #555](https://github.com/bounswe/bounswe2024group5/pull/555): Getting 4 images from wikidata (previously we get 3)
- [PR #551](https://github.com/bounswe/bounswe2024group5/pull/551): Fix bug in FavoriteQuestionResponse
- [PR #544](https://github.com/bounswe/bounswe2024group5/pull/544): Fix bug in GET favorite quiz and question endpoints
- [PR #543](https://github.com/bounswe/bounswe2024group5/pull/543): Fixed wrong response of /auth/login
- [PR #527](https://github.com/bounswe/bounswe2024group5/pull/527): Conversion favorite questions into a quiz
- [PR #490](https://github.com/bounswe/bounswe2024group5/pull/490): Wikidata usage for hint
- [PR #484](https://github.com/bounswe/bounswe2024group5/pull/484): Difficulty algorithm adjustment


# 4. Deliverables

## 4.1 User Manual

<!--- User Manual: Instructions for using the system. -->

You can view our detailed user manual in [wiki](https://github.com/bounswe/bounswe2024group5/wiki/User-Manual).

The manual contains the following information:
* Getting started guide
* Account creation and management
* Navigation through the app
* Creating and solving quizzes
* Forum participation
* Profile management
* Scoring system explanation
* FAQ section
* Troubleshooting guide

## 4.2 System Manual

<!--- System Manual: System requirements and installation instructions for the web and mobile applications, including Docker installation. For mobile applications, include instructions for emulator usage. -->

You can view our detailed system manual in [wiki](https://github.com/bounswe/bounswe2024group5/wiki/System-Manual).

The manual contains the following information:
* System requirements (hardware/software)
* Build and Deploy instructions
* Database setup instructions
* API configuration
* Environment configuration
* Backup and recovery procedures
* Security configurations
* Maintenance procedures
* Troubleshooting

## 4.3 Software Requirements Specification

Software Requirements Specification can be reached from [here](https://github.com/bounswe/bounswe2024group5/wiki/Requirements).

## 4.4 Software design documents

Note that we improved our UML diagrams based on the feedback we received from the TA.

* [Sequence Diagrams](https://github.com/bounswe/bounswe2024group5/wiki/451-Sequence-Diagrams)
* [Class Diagram](https://github.com/bounswe/bounswe2024group5/wiki/Class-Diagram)
* [Use-case Diagram](https://github.com/bounswe/bounswe2024group5/wiki/UML-Use%E2%80%90Case-Diagram-451)

## 4.5 User scenarios and mockups

* [User Scenario 1 - Quiz generation](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-1-%E2%80%90-Quiz-Generation)
* [User Scenario 2 ‐ Find forum from the Quiz](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-2-%E2%80%90-Find-Forum-from-the-Quiz)
* [User Scenario 3 ‐ Ask Question in the Forum](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-3-%E2%80%90-Ask-Question-in-the-Forum)
* [User Scenario 4 - Solve a Quiz Sent by Another User](https://github.com/bounswe/bounswe2024group5/wiki/User-Scenario-4-%E2%80%90-Solve-a-quiz-sent-by-another-user)

Note that we improved our user scenarios after receiving feedback about them, after Milestone 1.

* [The Scenarios we planned for the Customer Milestone 2](https://github.com/bounswe/bounswe2024group5/wiki/General-Plan#customer-presentation-2-planning)

* [The Teacher-Student scenario we outlined for the Customer Milestone 3](https://github.com/bounswe/bounswe2024group5/wiki/Teacher-%E2%80%90-Student-Scenario-%5BCustomer-Milestone-3%5D)

* [Mockups](https://github.com/bounswe/bounswe2024group5/wiki/451-Mock%E2%80%90ups)

## 4.6 Project plan

We utilize Github's Projects [Roadmap](https://github.com/orgs/bounswe/projects/67/views/4) feature to manage our project plan effectively. This visual representation allows us to monitor our progress according to the upcoming deadlines, such as the milestones. Additionally, it facilitates communication between sub-teams (backend, frontend, and mobile), ensuring that everyone is informed of each other's progress. [Ebrar](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu) is responsible to update the Project plan frequently, and other team members also review and revise it often. You can view the screenshot of our project plan from the [wiki page](https://github.com/bounswe/bounswe2024group5/wiki/Project-Plan).


## 4.7 Unit Tests

### 4.7.1 Mobile Unit Test Report

Mobil unit tests are located [here](https://github.com/bounswe/bounswe2024group5/tree/main/mobile/Quizzard/__tests__).

#### Scope and Coverage

**Achieved:**
- **Core UI Components:**  
  - **Example:** `CustomButton.tsx`  
    - Coverage: ~100% lines covered.
    - Explanation: Straightforward rendering and press event tests ensure stable and fully covered code.

- **Question Type Dropdown:**
  - **File:** `BaseDropdown.tsx`  
    - Coverage: ~66.66% lines covered.
    - Explanation: Testing basic dropdown functionality and state changes confirms that selecting different question types works as intended, partially validating quiz creation workflows.

- **Basic Utility Hooks:**
  - **Example:** `useColorScheme.ts`  
    - Coverage: ~25% lines covered.
    - Explanation: Limited scenarios tested, but demonstrates at least partial verification of UI theming logic.

**Aimed but Not Fully Achieved:**
- **Registration & Login (`LoginScreen.tsx`, `RegisterScreen.tsx`):**  
  - Coverage: 0%  
  - Explanation: No tests verify credential handling or form validation, leaving these critical paths unchecked.

- **Profile Updates & Image Upload (`ProfileSettingsScreen.tsx`):**  
  - Coverage: ~0%-5% 
  - Explanation: Tests needed to ensure updating user info and images works correctly. Without them, errors in this feature could go unnoticed.

- **Quiz Creation & Scoring (`QuizCreationScreen.tsx`, `QuizSolvingScreen.tsx`):**  
  - Coverage: ~0%-10%  
  - Explanation: Complex quiz logic (e.g., scoring, validating question inputs) remains under-tested, risking undetected issues in the user experience.

- **Forum Interaction (`ForumScreen.tsx`, `CreateQuestionScreen.tsx`):**  
  - Coverage: ~0%-5%  
  - Explanation: Interactive features (posts, replies, upvotes) are minimally tested, leaving these functionalities prone to hidden bugs.

- **Search Functionality:**  
  - Coverage: 0%  
  - Explanation: -

#### Test Files and Outcomes

The following test files were executed:

1. `CreateQuestionScreen.test.tsx`
2. `ForumScreen.test.tsx`
3. `ProfileScreen.test.js`
4. `ProfileSettingsScreen.test.js`
5. `QuestionDetailScreen.test.tsx`
6. `QuizCreationScreen.test.js`

**Assigned Outcomes:**
- **Passed:**
  - `CreateQuestionScreen.test.tsx`  
    - Explanation: The provided code checks basic UI elements (placeholders, submit button) and does not rely on complex data fetching or user input scenarios. The simplicity leads to consistent passing tests.
  
  - `ProfileScreen.test.js`  
    - Explanation: The "can be rendered" test ensures the component mounts without errors. Since more complex tests are skipped, the remaining simple checks pass reliably.
  
  - `QuestionDetailScreen.test.tsx`  
    - Explanation: Fetch mocks return expected data, and the test verifies basic text rendering. Straightforward network responses and UI checks result in passing tests.

- **Failed:**
  - `ForumScreen.test.tsx`  
    - Explanation: While the code attempts to fetch forum posts and verify their presence, the low coverage and complexity (e.g., multiple await/waitFor calls, mock data) lead to unstable results. Tests that rely on asynchronous data handling fail if responses or UI updates do not align perfectly with expectations.
  
  - `ProfileSettingsScreen.test.js`  
    - Explanation: Although this file includes a success scenario for updating the profile, the complexity of handling profile data, PUT requests, and error states might lead to failures. When a test expects certain outcomes (like a successful alert and navigation) but the underlying logic or API calls don’t match perfectly, the test fails.
  
  - `QuizCreationScreen.test.js`  
    - Explanation: The test triggers a submit event and expects API responses. Complexities in quiz creation, such as handling multiple questions and image uploads, may not be fully accounted for. If responses or mock implementations differ from expected behavior, tests fail.

**Test Statistics:**
- **Test Suites:**  
  - Total: 6  
  - Passed: 3  
  - Failed: 3  
  - Pass Rate: 50%

- **Individual Tests:**  
  - Total: 12  
  - Passed: 5 (~41.6% pass rate)  
  - Failed: 6  
  - Skipped: 1

**Coverage Overview (All Files):**
- Statements: ~4.67% covered
- Branches: ~5.31% covered
- Functions: ~5.31% covered
- Lines: ~5.31% covered

Except some core components and the question type dropdown, most critical features remain at very low coverage.


#### Conclusion

Current test coverage and reliability vary greatly. Basic UI components and question type selection are partially validated, but essential user paths—authentication, profile management, quizzes, forum features, and search lack sufficient tests. The provided code for each test file shows both simple successes and complex failures, reflecting a need for more targeted, robust testing strategies.


<details>
  <summary>Below, screenshots from the test results could be seen for further insight.</summary>

  ![Test Result 1](https://github.com/user-attachments/assets/b812e21c-f901-4762-ac1a-d2b386e277ec)
  ![Test Result 2](https://github.com/user-attachments/assets/9b9c856c-0208-4f30-b53c-b714903c7d8c)

</details>

### 4.7.2 Frontend Unit Tests
<details>
<summary>Report</summary>

#### 7.2.2.1 Test Execution Summary
- Total Test Files: 10 (9 passed, 1 failed)
- Total Tests: 50 (49 passed, 1 failed)
- Execution Time: 8.02s
  - Transform: 2.05s
  - Setup: 4.34s
  - Tests: 1.41s

#### 7.2.2.2 Coverage Metrics
- Statements: 12.68% (173/1364)
- Branches: 10.46% (75/717)
- Functions: 10% (37/370)
- Lines: 12.93% (168/1299)

#### 7.2.2.3 Component Analysis
High Coverage (>80%):
- CreatePost.tsx: 83.92% statements, 71.87% branches
- HostContext.tsx: 100% all metrics
- copy-quiz-link-button.tsx: 100% all metrics
- quiz-recommendations.tsx: 100% all metrics

Medium Coverage (30-80%):
- profile-page.tsx: 72.72% statements
- profile-photo.tsx: 55.55% lines

Low Coverage (<30%):
- Most API hooks showing <20% coverage
- App.tsx: 0% all metrics
- quiz-result.tsx: 0% all metrics
- forum-integration.tsx: 0% all metrics

#### 7.2.2.4 Failed Tests
- quiz-recommendations.test.tsx: Unable to find element with text "C1"

#### 7.2.2.5 Next Steps
1. Fix failed test in quiz-recommendations.test.tsx
2. Address React 18 compatibility warnings
3. Prioritize testing of API hooks
4. Increase coverage of core components
</details>

### 4.7.3 Backend Unit Tests

Backend Unit Tests are located at [the tests directory](https://github.com/bounswe/bounswe2024group5/tree/main/backend/src/test/java/com/quizzard/quizzard) at the repo.

#### Coverage Report

| element | class, %| method, %| line, %|
| --- | --- | --- | --- |
| all classes | 49% | 36% | 39% |
| service layer | 100% | 77% | 58% | 43% |

The coverage seems low when we look at all classes. However, when we exclude classes which does not have any business logic the coverage is good enough.

## 4.8 Database Content

Mock Database Content can be reached from [here](https://github.com/bounswe/bounswe2024group5/blob/main/database/backup.sql).

# Main Authors
[Ebrar](https://github.com/bounswe/bounswe2024group5/wiki/Asude-Ebrar-K%C4%B1z%C4%B1lo%C4%9Flu)
