# node-crud-api
The aplication is a simple CRUD server for user handling:
  creating, updating, deleting and getting list of users.

App is implemented using Node.js v.v18.12.1 and webpack

Before starting create file **'.env'** in project root directory that contents:

    PORT=4000
    HOST="localhost"

### Scripts.  

To run application in development mode with nodemon use script:

    npm run start

To run application in development mode use script:

    npm run run:dev

To build application and run in production mode use script:

    npm run run:prod

To run tests use script:

    npm run test

### Endpoints.
 - /api/users - GET - get list of users
 - /api/users - POST - create user
request body:   

    {  
        username: string, required,  
        age: number, required,  
        hobbies: string[], required  
    }  
    
if some fields are absent error 400 occures.  
if some fields are not valid error 400 occures

 - /api/users/:id - GET - get user for id
 - /api/users/:id - PUT - update user with specified id. Note, there are the same requirements  to the input data as for creating user.
 - /api/users/:id - DELETE - update user with specified id.
if id is not valid uuid - error 400 occures
if id is valid but not found - error 404 occures.

 - /api/error - GET - endpoint for testing error 500

 - any other path and method - error 404 occures.
