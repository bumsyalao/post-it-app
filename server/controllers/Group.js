const { usersRef, groupRef, firebase } = require('../config');



class Group {
  static createGroup(req, res) {
    const groupID = req.body.groupname; 
    groupRef.child(groupID).once('value', (snapshot) => {
      if (!snapshot.exists()) {
          
          groupRef.child(groupID).set({
            ID: groupID,
            users: null
        }).then(() => {
          res.send(`Group ${groupID} created`);
        }).catch((err) => {
          res.send(err);
        });
      } else {
        res.send('Group already exists');
      }
    });
  }

static addUser(req, res) {
		const groupID = req.params.groupID;
		const uid = req.params.uid;
 
		usersRef.child(uid).once('value', (snapshot) => {
				const userName= snapshot.exists() ? snapshot.val().username : "No Username";

				groupRef.child(groupID).child("Users").push(userName).then(() => {
						res.send('User added successfully');
					});
			})
			.catch((err) => {
				res.send('Error');
			});
	}

    static database(req, res){
    const rootRef = firebase.database().ref().child('Groups');

    rootRef.once('value', snap => {
      const key = snap.key
      const data = snap.val()
      const groups = []
      let group = {}

      for (var i in data){
        group = {
          id: i,
          users: data[i].users,
        }
        groups.push(group)
       }      
       res.send(groups) 
    })
   
  }

  static messages(req, res) {
		const groupID = req.params.groupID;
    const user = req.params.user;
    const text = req.params.text;

				groupRef.child(groupID).child("Messages").push(
        {  
          user,
          text
        }
        ).then(() => {
						res.send('Message added successfully');
					}).catch((err) => {
				res.send('Error');
			});



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


