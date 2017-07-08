const { usersRef, groupRef, firebase } = require('../config');

class Group {
  static createGroup(req, res) {
    const groupName = req.body.groupName; 
    const db = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        const userName = user.displayName;
        groupRef.child(groupName).once('value', (snapshot) => {
      if (!snapshot.exists()) { 
   // Create  and Group and Insert Username
          groupRef.child(groupName).child('Users').child(userName).set(userName)

        //Push the user's details into Group/ Users
        db.ref(`/users/${userName}/groups`).child(groupName).set(groupName).then(() => {

          res.send(`Group ${groupName} created`);
        }).catch((err) => {
          res.send(err);
        });
      } else {
        res.send('Group already exists');
      }
    }).catch((err) => {
            res.status(401).send({
              message: `Something went wrong ${err.message}`,
            });
          });
      } else {
        res.status(403).send({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
      }
    });

  }

static addUser(req, res) {
		const groupName = req.params.groupName;
		const user = req.params.user;

     const db = firebase.database();
 
		usersRef.child(user).once('value', (snapshot) => {
				const userName= snapshot.exists() ? snapshot.val().username : null;

        // //Push the user's details into Group/ Users
        db.ref(`/users/${user}/groups`).child(groupName).set(groupName);

        //Push the user's details into Group
				groupRef.child(groupName).child('Users').child(userName).set(userName)
        
       
        .then(() => {
						res.send('User added successfully');
					});
			})
			.catch((err) => {
				res.send('Error');
			});
	}


  static addMessage(req, res) {
		const groupName = req.params.groupName;
    // const user = req.params.user;
    const message = req.params.message;

       firebase.auth().onAuthStateChanged((user) => {
      if (user) {
     
        //Push the message into Group
				groupRef.child(groupName).child("Messages").push(
        {  
          User: user.displayName,
          Message,
          Priority: 'Normal' 
        }
        ).then(() => {
						res.send('Message added successfully');
					}).catch((err) => {
				res.send('Error');
			});

      } else {
        res.status(403).send({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
      }
    });


  

	}

  
    static database(req, res){
      const groupName = req.params.groupName

    const rootRef = firebase.database().ref().child('Groups').child(groupName);
     rootRef.once('value', (snapshot) => {
        res.send(snapshot)

      })  
    }
     static messageDatabase(req, res){
       const groupID = req.params.groupID
    const rootRef = firebase.database().ref().child('Groups').child(groupID).child('Messages');

    rootRef.once('value', snap => {
      const key = snap.key
      const data = snap.val()
      const messages = []
      let message = {}

      for (var i in data){
        message = {
          id: i,
          user: data[i].user,
          text: data[i].text,
        }
        messages.push(message)
       }      
       res.send(messages) 
    })
   
  }



}


module.exports = Group;

