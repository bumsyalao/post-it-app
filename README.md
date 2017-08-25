# Post-it-app

[![Build Status](https://travis-ci.org/Charpell/post-it-app.svg?branch=Google_Signup_Refactor)](https://travis-ci.org/Charpell/post-it-app)

[![Coverage Status](https://coveralls.io/repos/github/Charpell/post-it-app/badge.svg?branch=Google_Signup_Refactor)](https://coveralls.io/github/Charpell/post-it-app?branch=Badges)




PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

# Features
  1. Sign Up
  2. Log in
  3. Create group
  4. Add Member to group
  5. Send broadcast message to group members



## Prerequisites
    Node Enviroment 
    Git 
    Firebase Database Account
    Postman
    Google Chrome 


# Deployment
 PostIt is hosted on heroku and can be accessed via this link
        https://post-it-app35.herokuapp.com/


# Installation
  Kindly follow the steps below to setup a local development environment.
  1. Clone this repository from a terminal git clone https://github.com/Charpell/post-it-app.git.
  2. ```cd post-it-app```
  3. Install project dependencies npm install
  4. Run ```npm run dev```
  


# To Run Test
  The mocha framework and supertest module are used for testing our routes.   
  To test, Run "mocha"
 
### To test the API with postman:
- run ```npm start```
- then visit ```http://localhost:3000```, you should see 'PostIt API running...' 

It is also hosted on heroku at <a href="https://post-it-app35.herokuapp.com//" target="_blank">PostIt API</a>.

The API contains different endpoints with their respective payloads as stated below:

| Endpoints                    | Functions                                                               | Payloads                 | Request Methods |
|------------------------------|-------------------------------------------------------------------------|--------------------------|-----------------|
|1 /user/signup             | It allows users to register                                             | username, email and password    | POST            |
|2 /user/google             | It allows users to register                                             | google auth    | POST            |
|3 /user/signin             | It gives users access to login                                          | email and password    | POST            |
|4 /group                   | It allows users to create group for notifications                       | groupName and userName | POST            |
|5 /group/:groupName/:user     | It allows users to add another user to a created group of id groupID    | username                 | POST            |
| /groups/:groupName/:messages
/:emails/:numbers/:allUsers
/:notification/:priority/group
/:groupID/message  | It allows users to post message to a created group of id groupID        | message and postedBy     | POST            |
|6 /group/:groupID/messages | It allows users to retrieve messages from a created group of id groupID | No payload               | GET             |


 
   
## Npm Packages
     
     body-parser
     express
     firebase
     morgan
     object-assign
     react
     react-dom
     react-router
     react-router-dom
     reactify
     mocha
     

   DevDependecies Package

    eslint
    eslint-config-airbnb
    eslint-friendly-formatter
    eslint-plugin-import
    eslint-plugin-jsx-a11y
    eslint-plugin-react
    node-sass
    sass-loader
    should
    style-loader
    supertest
    tape
    vinyl-source-stream
    webpack
    babel-cli
    babel-core
    babel-eslint
    babel-loader
    babel-preset-es2015
      Andela Bootcamp BFAs
    babel-watch

 
## Author
    Ebuka Umeh

# Acknowledgments
      Andela Bootcampers
      Andela Bootcamp Facilitators
      Family and Friends

## License $ Copyright
MIT © Ebuka Umeh

Licensed under the [MIT License](LICENSE).
