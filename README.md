# Post-it-app
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://travis-ci.org/Charpell/post-it-app.svg?branch=Google_Signup_Refactor)](https://travis-ci.org/Charpell/post-it-app) [![Coverage Status](https://coveralls.io/repos/github/Charpell/post-it-app/badge.svg?branch=Google_Signup_Refactor)](https://coveralls.io/github/Charpell/post-it-app?branch=Badges)

PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

## Features
+ Sign Up
+ Log in
+ Create group
+ Add Member to group
+ Send broadcast message to group members
+ Retrieve all the messages posted to groups the user belongs to
+ Retrieve the groups a user belongs to
+ Retrieve the members of a group

## Requirements
+ Node Enviroment 
+ Git 
+ Firebase Database Account
+ Postman
+ Google Chrome 


## Deployment
 PostIt is hosted on heroku and can be accessed via this link
        https://post-it-app35.herokuapp.com/


## Setting up
+ Clone this project to a folder in your local machine
```bash
git clone https://github.com/Charpell/post-it-app.git
```
+ ```cd post-it-app```

## Installing Packages
+ To Install NPM package
```bash 
npm install
```

## To test the API with postman:
+ run ```npm start```
+ then visit ```http://localhost:3000```, you should see 'PostIt API running...' 

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

## Author
    Ebuka Umeh

## Acknowledgments
      Andela Bootcampers
      Andela Bootcamp Facilitators
      Family and Friends

## License & Copyright
MIT © [Ebuka Umeh](https://github.com/Charpell)

Licensed under the [MIT License](LICENSE).
