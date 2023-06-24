# Blog API

Blog API was developed with Nodejs, Express, and Mongoose; Nodejs is a JavaScript runtime environment that allows developers to build server-side applications. Express is a Fast, unopinionated, minimalist web framework for Node.js.

It provides a set of features and tools to build robust APIs quickly and easily. Express simplifies routing, middleware integration, and request/response handling. Also, NoSQL database was used for storing and retrieving the data from the database, that’s why Mongoose came in handy; accepting the fact that MongoDB validation, casting, and business logic boilerplate can be daunting to write, that’s why Mongoose saved us from unnecessary hassle

With the use Swagger Editor, help us to be able to create and document the API for easy usage by both non-techy individuals and mostly Frontend developer that will be consuming the API according to OpenAPI specification.

## Authentication using JWT (JSON Web Tokens)

- JWT is a compact and self-contained way of transmitting information between parties as a JSON object. It consists of three parts: a header, a payload, and a signature. In the context of this blog API, JWT is used for authentication purposes.

- Here's a high-level overview of the authentication flow:

- User Registration: When a user registers for the blog API, their credentials (e.g., username and password) are securely stored in the database, usually after performing validations with the use of the most javascript validation package Joi and hashing the password with bcrypts so that it won't be stored plainly in the database

- User Login: When a registered user wants to access protected functionality, they provide their credentials (username/password) to the API's login endpoint. The API validates the credentials, and if they are correct, it generates a JWT token.

- JWT Generation: The API server uses a secret key to sign a JWT token containing relevant information about the user (e.g., user ID, roles, etc.). This token is then returned as a response to the user's login request.
