# Acceptance Criteria


## Primary features (e.g. semantic search, user management)

## Domain-specific features (e.g. why they're specific, how they're implemented)

Here, we list 4 domain-specific points we implement. We implemented the first 3 points and plan to implement the last one in the future.

- [x] Quiz creationg question type: has to follow structure 
- [x] Quiz creation word check
- [x] Tag Constraint in the Forum posts
- [ ] Bad word detection in the Forum posts

### 1. 

### 2. 

### 3. Forum Post Creation 

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


### 4. Forum word input: block bad words. 

In addition to the tags restriction above, 


## API and its documentation (e.g. endpoints, expected inputs, outputs)

## Standard(s) being followed (e.g. its documentation, implementation)

## Testing strategies (e.g. unit test coverage, integration testing, tools)



## Main Authors
