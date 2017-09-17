# Post-it-app
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://travis-ci.org/Charpell/post-it-app.svg?branch=Production-Build)](https://travis-ci.org/Charpell/post-it-app) [![Coverage Status](https://coveralls.io/repos/github/Charpell/post-it-app/badge.svg?branch=Production-Build)](https://coveralls.io/github/Charpell/post-it-app?branch=Production-Build)

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

## API Documentation
The Api Documentaion of Post IT App can be found [here](http://docs.postit7.apiary.io/#)

## Limitations
+ Users can not upload picture
+ Users can not choose to accept invitation request

## FAQ
### What if I want to use another port?
That's easy. In the root of the project. create a file named .env and add the following line to it:
`PORT=<your_desired_port>`
where <your_desired_port> is the port you want to use. So, if you want to use port 9000, you will write:
`PORT=9000`

### How can I contribute?
There are two major ways to contribute:
+ If you find bugs in the application, create a `New Issue` and let me know about it.
+ If you would like to add additional features to this application, fork this repository, make necessary changes and create a Pull Request. Please make sure that all Hound suggestions are implemented and Travis CI passes.

## Author
    Ebuka Umeh

## Acknowledgments
      Andela Bootcampers
      Andela Bootcamp Facilitators
      Family and Friends

## License & Copyright
MIT © [Ebuka Umeh](https://github.com/Charpell)

Licensed under the [MIT License](LICENSE).
