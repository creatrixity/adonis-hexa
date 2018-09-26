# Adonis Hexa

Adonis Hexa is a software development paradigm for maintaining a scalable application architecture. Writing code is fun. _Writing code is easy_&mdash;writing code that will not muck up the codebase and is reusable&mdash;not so much.

With Adonis Hexa, we attempt to solve these problems. We abstract all code into three layers (available within the `src` directory):

- **Data**
- **Domains**
- **Services**
- **Foundation**

### Data Layer

Data layer level code deals only with data entities and pure business logic.
This means the data layer may only contain:

- Repositories.
- Data Transfer Objects (DTO).
- Algorithms.

### Domains Layer

We have a concept of domains. Typically, most tasks critical to applications fall into a set of domains. A regular e-commerce application may contain the following domains:

- `User` domain: Where all code concerning user management is housed.
- `Order` domain: May contain code that creates a new order, logs order information, notifies third parties e.t.c

### Services

Adonis Hexa promotes a micro-services architecture as we may think of our applications as being comprised of multiple small services as opposed to a single monolithic entity. Typically we could have services such as an API service that exposes a REST API or an Auth service that is especially handy for Single Sign On (SSO) architectures.

Services contain nearly everything that comes with a barebones Adonis installation as well as some new stuff we'll be introducing.

### Directory Structure

Below is the bare structure of an example Adonis Hexa application.

```
src
├── Data
    └── Repositories
            ├── UserRepository.js
            ├── Repository.js
    └── Algorithms
├── Domains
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
        ├── Console
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

This houses the internals of the Adonis Hexa framework. We

## Installation

Simply clone this repo as it provides a boilerplate to get you started.

```bash
git clone https://github.com/creatrixity/adonis-hexa.git
```

...then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
