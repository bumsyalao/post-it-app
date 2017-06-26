const { usersRef, groupRef, firebase, notesRef, baseRef } = require('../config');



class Group {
  static createGroup(req, res) {
    const groupID = req.body.groupname; 
    groupRef.child(groupID).once('value', (snapshot) => {
      if (!snapshot.exists()) {
          groupRef.child(groupID).set({
            id: groupID,
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

				groupRef.child(groupID).child("users").push(userName).then(() => {
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

}


module.exports = Group;
