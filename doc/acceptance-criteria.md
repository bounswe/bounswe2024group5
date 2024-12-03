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



## Main Authors

