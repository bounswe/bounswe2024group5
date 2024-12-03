# Acceptance Criteria


## Primary features (e.g. semantic search, user management)

## Domain-specific features (e.g. why they're specific, how they're implemented)

Quiz creation word check

Forum post -> tags, eng word. 

Forum word input: block bad words. 

Quiz creationg question type: has to follow structure 

## API and its documentation (e.g. endpoints, expected inputs, outputs)

## Standard(s) being followed (e.g. its documentation, implementation)

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
