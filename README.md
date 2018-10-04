# Adonis Hexa

## Index

- [Introduction](#introduction)
- [Layers](#layers)
  - [Data](#data)
  - [Domains](#domains)
  - [Service](#service)
  - [Foundation](#foundation)
- [Components](#components)
  - [Feature](#feature)
  - [Job](#job)
  - [Validator](#validator)
- [Installation](#installation)
- [Getting Started](#getting-started)

## Introduction

### Directory Structure

```
src
└── Data
    └── Repositories
            ├── UserRepository.js
            ├── Repository.js
    ├── Algorithms
└── Domains
    └── User
            └── Jobs
                ├── CreateUserJob.js
                ├── FetchUserJob.js
                ├── ListUsersJob.js
            └── Validators
                ├── UserValidator.js
├── Foundation
└── Services
    └── Api
        └── Features
            ├── CreateUserFeature.js
            ├── FetchUserFeature.js
            ├── ListUsersFeature.js
        └── Http
            └── Controllers
                ├── UserController.js
        └── Providers
            ├── ApiServiceProvider.js
        ├── Routes.js
```

### What is Adonis Hexa?

Adonis Hexa is a software development paradigm for maintaining a scalable application architecture. Writing code is fun. _Writing code is easy_&mdash;writing code that will not muck up the codebase, pile technical debt and is reusable&mdash;not so much.

With Adonis Hexa, we attempt to solve these problems. We abstract all business code into four layers (available within the `src` directory):

- **Data**
- **Domains**
- **Services**
- **Foundation**

### Layers

#### Data

Data layer level code deals only with data entities and pure business logic. This layer deals with pure data-related classes.
This means the data layer may only contain:

- Repositories.
- Data Transfer Objects (DTO).
- Algorithms.

#### Domains

We have a concept of domains. Typically, most tasks critical to applications fall into a set of domains. A regular e-commerce application may contain the following domains:

- `User` domain: Where all code concerning user management is housed.
- `Order` domain: May contain code that creates a new order, logs order information, notifies third parties e.t.c

Within each domain is contained little units of execution called _jobs_. A Job is a class that is responsible for carrying out a single task and _nothing else_. This keeps our Jobs completely reusable and shareable within multiple projects.

We also keep domain-specific classes like Validators within Domains layer.

#### Services

Adonis Hexa promotes a micro-services architecture as we may think of our applications as being comprised of multiple small services as opposed to a single monolithic entity. Typically we could have services such as an API service that exposes a REST API or an Auth service that is especially handy for Single Sign On (SSO) architectures.

Services contain nearly everything that comes with a barebones Adonis installation as well as some new stuff we'll be introducing.

#### Service Directory Structure

Below is the bare structure of an example Adonis Hexa service.

```
src
└── Services
    └── Api
        └── Features
            ├── CreateUserFeature.js
            ├── FetchUserFeature.js
            ├── ListUsersFeature.js
        └── Http
            └── Controllers
                ├── UserController.js
        └── Providers
            ├── ApiServiceProvider.js
        ├── Routes.js
```

### Foundation

This houses the internals of the Adonis Hexa framework. You might never need or use this directory for anything else, but in case you encountered a case where a class needs to be shared across all components and does belong in any, feel free to use this one.

### Components

Adonis Hexa contains the following components:

- **Feature**
- **Job**
- **Validator**

#### Feature

Features are usually what make up our applications. Usually, in many applications we have features such as search profiles feature, or login feature. Features are used by controllers in our Service layer. This helps us keep our controllers super-lean as our controllers will only contain _a single line of code!_.

#### Job

A Job is a class that is responsible for carrying out a single task and _nothing else_. They play an important part in our Feature classes and also keep our code reusable.

We keep Jobs within Domains which means Jobs must be isolated and independent from other Jobs. _A Job must never call another Job&mdash;even if they are both within the same Domain._

They can be called by any Feature within a Service, and this is the _only way_ of communication between services and domains.

#### Validators

A Validator is a single responsibility class that bears validation rules for data being processed within a Domain. We usually use Validators within a specialized job. A `User` Domain may contain a `validators` directory housing all Validator classes and a specialized job like say a `ValidateUserCreationDataJob` that runs the core validation logic.

Below is an example Validator class.

```javascript
/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseValidator = use("Src/Foundation/BaseValidator");

/**
 * Validates data for the creation of a new user.
 *
 * **Namespace**: `Src/Domains/User/Validators/UserValidator` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class UserValidator
 */
class UserValidator extends BaseValidator {
  /**
   * Contains validation rules for creating a user.
   *
   * @method rules
   *
   * @return {Object} JSON
   */
  rules() {
    return {
      username: "min:6|unique:users",
      email: "required|email|unique:users",
      password: "required|min:6|max:30"
    };
  }
}

module.exports = UserValidator;
```

## Installation

Simply clone this repository as it provides a boilerplate to get you started.

```bash
git clone https://github.com/creatrixity/adonis-hexa.git
```

...then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Getting Started

We'll demo a sample application now. We'll be building an Adonis Hexa application that requires us to be able to create users by sending data to an API endpoint, retrieving information for a single user, returning all users within the system and also searching for users through query strings.

First of all, we clone the Adonis Hexa repository as our base boilerplate.

```bash
git clone https://github.com/creatrixity/adonis-hexa.git
```

We'll be using the wonderful `adonis-search` package to help with our search feature. We'll need to add a dependency to our `package.json` file. Add this line to the `dependencies` object in `package.json`.

```js
"dependencies": {
    "adonis-search": "^1.0.3",
    // ....
}
```

We'll also add its service provider to our service providers. Add this service provider to `start/app.js`.

```javascript
const providers = [
  "adonis-search/providers/QueryProvider"
  //...
];
```

We then install all dependencies.

```bash
npm install
```

Thankfully, our base boilerplate already performs all the tasks listed above except adding searching for users. Let's fix that. We'll need to create a special search endpoint which will be `/users/search`. Add this route to `src/Services/Api/Routes.js`.

```javascript
{
  route: "users/search",
  controller: "UserController.getSearchUsers",
  method: "get"
},
```

Our route syntax is a little different from regular Adonis routes as it is terser and more compact. Our controller `UserController.getSearchUsers` means we are using the `getSearchUsers` method of the `UserController` class and we are listening for `GET` requests.

We'll add the `getSearchUsers` method to `src/Services/Api/Http/Controllers/UserController.js`

```javascript
getSearchUsers ({ request, params }) {
    return this.serve('Api/Features/SearchUsersFeature', {
        request
    });
}
```

This is a one-liner method that simply serves the `SearchUsersFeature`. The `SearchUsersFeature` will assemble the jobs that do the actual user searching. We'll create `src/Services/Api/Features/SearchUsersFeature.js`.

```js
/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseFeature = use("Src/Foundation/BaseFeature");
const UserRepository = use("Src/Data/Repositories/UserRepository");

/**
 * Searches through and returns users with their username or email matching provided queries.
 *
 * **Namespace**: `Src/Services/Api/Features/SearchUsersFeature` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class SearchUsersFeature
 */
class SearchUsersFeature extends BaseFeature {
  constructor(params) {
    super(params);
  }
  /**
   * Contains code that will be ran when this feature is invoked.
   *
   * @method handle
   *
   * @return {Object} JSON
   */
  async handle() {
    const { request } = this.params;

    const query = await this.run("User/Jobs/CreateUserSearchQueryJob", {
      request
    });

    const users = await this.run("User/Jobs/RetrieveUsersJob", {
      query: query.search(["username", "email"])
    });

    return {
      users
    };
  }
}

module.exports = SearchUsersFeature;
```

We get the `request` object (available within `this.params`) and then pass it as an argument to the `CreateUserSearchQueryJob`. This job will create a search query object that we'll pass to the `RetrieveUsersJob` as a query. The `RetrieveUsersJob` will return users matching the search query provided.

Let's create `src/Domains/User/Jobs/CreateUserSearchQueryJob.js`.

```javascript
/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseJob = use("Src/Foundation/BaseJob");
const UserRepository = use("Src/Data/Repositories/UserRepository");
const Query = use("Query");

/**
 * Creates a user search query.
 *
 * **Namespace**: `Src/Domains/User/CreateUserSearchQueryJob` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class CreateUserSearchQueryJob
 * @constructor
 */
class CreateUserSearchQueryJob extends BaseJob {
  constructor(params) {
    super(params);
  }

  /**
   * Contains code that will be ran when this job is invoked.
   *
   * @method handle
   *
   * @return {Object} Lucid/ORM
   */
  async handle() {
    const query = new Query(this.params.request, {
      order: "id"
    });

    return query;
  }
}

module.exports = CreateUserSearchQueryJob;
```

We use the `adonis-search` package to process our search query. We make sure our search results are ordered according to their `id` property.

Let's create `src/Domains/User/Jobs/RetrieveUsersJob.js`.

```javascript
/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseJob = use("Src/Foundation/BaseJob");
const UserRepository = use("Src/Data/Repositories/UserRepository");

/**
 * Retrieves users matching query.
 *
 * **Namespace**: `Src/Domains/User/RetrieveUsersJob` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class RetrieveUsersJob
 * @constructor
 */
class RetrieveUsersJob extends BaseJob {
  constructor(params) {
    super(params);
  }

  /**
   * Contains code that will be ran when this job is invoked.
   *
   * @method handle
   *
   * @return {Object} Lucid/ORM
   */
  async handle() {
    const { query } = this.params;
    const userRepo = new UserRepository();

    const users = await userRepo.pageWhere(query);

    return users;
  }
}

module.exports = RetrieveUsersJob;
```

We use the `pageWhere` method freely available to us thanks to the core Repository class bundled with Adonis Hexa. This allows us to return a fixed number of results in pages just like a search engine would.

We've been able to add a reusable feature alongside two completely reusable jobs. This is the power of Adonis Hexa.
