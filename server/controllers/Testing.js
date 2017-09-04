const { db, firebase } = require('../config');



class Testing {
    static one() {
        // const { groupName, user } = req.body;   
        const testGroup = db.ref('Testing/');
      
        // Creating Data
        testGroup.set ({
            John: {
               number: 1,
               age: 30
            },
             
            Amanda: {
               number: 2,
               age: 20
            }
         });

         // Updating Data
         var johnRef = firebase.database().ref("Testing/John");        
         johnRef.update ({
            "number": 10
         });
     
    }


    static two() { 
      
  
        // Create User
        // two.child('1234').set({
        //     userName: 'Bello',
        //     email: 'bello@gmail.com',
        //     uid: '1234',
        //     phoneNumber: '23456789066'
        //   });

        //   two.child('1235').set({
        //     userName: 'lo',
        //     email: 'lo@gmail.com',
        //     uid: '1235',
        //     phoneNumber: '2345675666'
        //   });


    


        // Create Group
        //  const groupKey = room.push({
        //         groupName: 'MAnh',
        //         createdBy: 'llo',
        //       }).key;

        // two.child('1235').child('Group').push ({
        //     name: "Dake",
        //     uid: groupKey,        
        //  }); 


        // Add User to the Group
        //  room.child('-Kt6ymPZYA-AT92ZjFRs').child('Users').push('777')   // groupKey and uid


        //Create Message
         // Add Message to Group
         room.child('-Kt6ymPZYA-AT92ZjFRs').child('Message').push({
             Message: 'Hi, i am a message',
             User: 'llo',
             Piority: 'Urgent'
         })

        two.child('1235').child('Message').push ({
            Message: 'Hi, i am a message',
            User: 'llo',
            Piority: 'Urgent',
            Group: 'Dale'       
        }); 

    }

    static getMethod(){

        const two = db.ref('players/1235/Message');
        const twoGroup = db.ref('players/1235/Group');
        const twoUsers = db.ref('Room/');
        const room = db.ref('Room/');
        const playRef = db.ref('players/');
        
        // Get Messages
        // const messages= []
        // let message = {}
        // two.orderByValue().on("value", function(data) {   

        // data.forEach(function(data) {
        //     message = {
        //         messageKey: data.key,
        //         Message: data.val().Message,
        //         piority: data.val().Piority,
        //         poster: data.val().User
        //     }
        //     messages.push(message);
        // });
        // console.log(messages)   
        //  });

        // // Get Groups
        //  const groups= []
        //  let group = {}
        //  twoGroup.orderByValue().on("value", function(data) {   
 
        //  data.forEach(function(data) {
        //     group = {
        //          name: data.val().name,
        //          uid: data.val().uid,
        //      }
        //      groups.push(group);
        //  });
        //  console.log(groups)   
        //   });

          

          //Get Users
          const users= []
          let user = {}         
          twoUsers.child('-Kt6ymPZYA-AT92ZjFRs').child('Users').orderByValue().on("value", function(data) {              
            data.forEach(function(data) {
                users.push(data.val())
            });
            console.log(users)
             
        //     const apple = []
        //      users.forEach((entry) => {
        //         db.ref(`/players/${entry}`).once("child_added", function(data) {
        //             apple.push(data.val().userName)   
        //          });
        //          console.log(apple)
        //      }) 
        //   });

        var ref = firebase.database().ref().child('players/');
            //  users.forEach((entry) => {
            //         const apple = []
            //         let app = {}
            //     ref.orderByKey().once("child_added", function(data) {          
                            
            //                 apple.push(data.val().userName);   
            //                 console.log(data.val().userName);              
                   
            //         // console.log(apple)
            //      });
            //  }) 

            //   const apple = []
            //  users.forEach((entry) => {
            //     var ref = firebase.database().ref().child('players');
            //     ref.once("value", function(snapshot) {
    
            //         snapshot.forEach((childSnapShot) => {
            //             // console.log({
                          
            //             //   userId: childSnapShot.val(),
            //             // });
            //             apple.push(childSnapShot.val().email)
            //         })
            //         console.log(apple)
                  
            //      }, function (error) {
            //         console.log("Error: " + error.code);
            //      });
            
            //  }) 
  


        
        // ref.orderByKey().on("child_added", function(data) {          
        //     if( data.key == entry ) {           
        //             console.log(data.val().userName);               
        //     }
        //  });
      
       
        //  ref.orderByValue().on("value", function(data) {   
        //     ref.orderByChild("userName").equalTo("lo").on("child_added", function(data) {
        //       users.push(data.val().userName)
        //       });
        // console.log(users)        
          });

       

          
        



    }

    static three() { 
        // The Key Method
        const two = db.ref('players/');
        var playerRef = firebase.database().ref("players");  
        var playersKey = playerRef.key;
        console.log(playersKey);

        // Write Transactional Data
        var johnAge = firebase.database().ref("players").child('-Kt5vqyRtIDm9GFiL8ul').child('age');
        johnAge.transaction(function(currentAge) {
            return currentAge + 1;
         });   
    }

    static four() { 
        // Reading Data 
        var ref = firebase.database().ref().child('players');

        ref.on("value", function(snapshot) {
            console.log(snapshot.val());
         }, function (error) {
            console.log("Error: " + error.code);
         });
    }

    static five() { 
        // Reading Data 
        var ref = firebase.database().ref().child('players');
        ref.on("child_added", (data, prevChildKey) => {
            var newPlayer = data.val();
            console.log("name: " + newPlayer.name);
            console.log("age: " + newPlayer.age);
            console.log("number: " + newPlayer.number);
            console.log("Previous Player: " + prevChildKey);
         });
    }

    static six() { 
        // Query Data 
        var ref = firebase.database().ref().child('players');
 

        //Order by Child
        ref.orderByChild("name").on("child_added", function(data) {
            console.log(data.val().name);
         });
         
         //Order by Key
         ref.orderByKey().on("child_added", function(data) {
            console.log(data.key);
         });

        var ref = firebase.database().ref().child('players');
        const users = []
         ref.orderByValue().on("value", function(data) {           
            data.forEach(function(data) {
                users.push(data.key);
            });
            console.log(users)
         });

        const usersO = []
        let user = {}
         ref.orderByValue().on("value", function(data) {   

                data.forEach(function(data) {
                    user = {
                        uid: data.key,
                        name: data.val().name,
                        age: data.val().age,
                        number: data.val().number
                    }
                    usersO.push(user);
                });
                console.log(usersO) 
         });

            Filter
         ref.orderByChild("name").equalTo("John").on("child_added", function(data) {
           console.log({
                                uid: data.key,
                                name: data.val().name,
                                age: data.val().age,
                                number: data.val().number
                            })
    
         });
     
    }

    static seven(){
        
                var ref = firebase.database().ref().child('players/Group');

                const users = []
                 ref.orderByValue().on("value", function(data) {           
                    data.forEach(function(data) {
                        users.push(data.val().name);
                    });
                    console.log(users)
                 });
        
            }
    
}

module.exports = Testing;