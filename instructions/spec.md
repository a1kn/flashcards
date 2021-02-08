## Context

BigSpring is a global learning platform, and has learners consuming educational content in a [wide variety of languages](https://en.wikipedia.org/wiki/Languages_of_India#Official_languages). One of the types of educational content we deliver is a [flashcard](https://en.wikipedia.org/wiki/Flashcard). Currently, content is developed in a single language. As [literacy is an issue](https://en.wikipedia.org/wiki/Literacy_in_India) in several parts of the world, ensuring that content is fully [localized](https://en.wikipedia.org/wiki/Language_localisation) into regional languages would increase overall platform engagement in addition to improving individual learning outcomes.

## Requirements

Design and implement a Flash Card content management system. This can be an iOS, Android or web app. This will be a “backend” app, used by content administrators in order to begin developing a localized library of flash card content.

Our content library will have a concept of “supported” or “targeted” languages: Given the entire universe of languages, we will only aim to localize our content into a subset in order to support the most popular languages within the regions that BigSpring’s users are located in.

In Scope Features:
- Add a new “supported” language
- Create a flash card
- Localize flash card into all “supported” languages (acceptable if happens as part of creation)
- View localized flash cards

Out of Scope Features:
- Update and Deletion of flash cards (we’re very good at localization!)
- If a new “supported” language is added, any existing flash cards localized into the previous set of “supported” languages can remain as-is, i.e. there is no need to propagate the update.

There are no requirements about specific implementation technologies or frameworks. We use some of the following tools, but feel free to use whatever is most comfortable:
- TypeScript
- React
- Node.js
- Apollo / GraphQL
- PostgreSQL

## User Stories

- As a content administrator, I want to create a flash card and localize it into some of the BigSpring “supported” languages.
- As a content administrator, I want to add a new “supported” language in order to localize new content into new regions that the business is expanding into.

## Deliverables

Commit your implementation directly to this repository. Your implementation should contain documentation on how to execute the project.
