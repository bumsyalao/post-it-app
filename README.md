# Post-it-app
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://travis-ci.org/Charpell/post-it-app.svg?branch=Production-Build)](https://travis-ci.org/Charpell/post-it-app) [![Coverage Status](https://coveralls.io/repos/github/Charpell/post-it-app/badge.svg?branch=Production-Build)](https://coveralls.io/github/Charpell/post-it-app?branch=Production-Build)

PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.
To view the project visit this [link](https://post-it-app35.herokuapp.com/)

## Key Features of this Application
+ Users can Sign Up
+ Users can Log in
+ Users can Create group
+ Users can add other users to a group
+ Users can send broadcast message to group members
+ Users can retrieve all the messages posted to groups the user belongs to
+ Users can get in app notification, email notification and sms notification depending on the message prioriy
+ Users can Sign in with Google account
+ Users can reset thier Password


## Requirements
+ Node Enviroment 
+ Git 
+ Firebase Database Account
+ Postman
+ Google Chrome 

## Local Installation Guide
* Ensure Node is installed
* clone the repo with the following command `git clone https://github.com/Charpell/post-it-app.git`
* Run `npm install` to install all the dependencies needed to run the application
* Install `webpack` globally
* To test the application, run `npm test`
* On your local machine Run `npm start` to start the server and visit `http://localhost:3000`

## Technologies
 * [ECMAScript 6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
 * [REACT](https://facebook.github.io/react/): REACT is a JavaScript framework developed by Facebook and it is used for developing web application. REACT is the 'VIEW' in the MVC architecture.
 * [FLUX](http://facebook.github.io/flux/): Flux is an architecture used for building stable and efficient web applications. Flux design is a unidirectional flow of data.


## Limitations
+ Users cannot upload picture
+ Users cannot choose to accept invitation request
+ Users cannot leave a group
+ Users cannot delete a message when sent

## FAQ
### What if I want to use another port?
That's easy. In the root of the project. create a file named .env and add the following line to it:
`PORT=<your_desired_port>`
where <your_desired_port> is the port you want to use. So, if you want to use port 9000, you will write:
`PORT=9000`

### How can I contribute?
There are two major ways to contribute:
+ If you find bugs in the application, create a `New Issue` and let me know about it.
+ If you would like to add additional features to this application, fork this repository into your local machine, make necessary changes and create a Pull Request. Please make sure that all Hound suggestions are implemented and Travis CI passes.

## Author
    Ebuka Umeh

## License & Copyright
MIT © [Ebuka Umeh](https://github.com/Charpell)

Licensed under the [MIT License](LICENSE).
