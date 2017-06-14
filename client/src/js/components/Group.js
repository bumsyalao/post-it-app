import React, {Component} from 'react';

// import { group } from '../authentication/authentication'
// import { usersRef, firebaseAuth, groupRef } from '../firebase/firebase';

class Group extends Component {

  state = {
    groups: ['']
   }

     handleSubmit(e){
        e.preventDefault();
       var groupID = this.refs.group.value;
       let groupRef = this.refs.group
       let groupname = groupRef.value;
       groupRef.value = "";
        if (typeof groupname === 'string' && groupname.length > 0){
           group(groupID) 

    }
}
    componentDidMount() {
   
      groupRef.once('value', (snapshot) => {
        let groups = [];
        snapshot.forEach(function(item,index){
          let group = item.val().id
          groups.push(group);
          });
      console.log(groups);
      
      groups = this.setState.groups



    })
    }

  render(){
       var groups = this.state.groups
     groupRef.once('value', (snapshot) => {
        snapshot.forEach(function(item,index){
          let group = item.val().id
          groups.push(group);
         return(
               <TodoItem item={item} key={index} /> 
              );
            }.bind(this)); 
})





    return (
      <div>
       
      <section className="centralize">
          <p>Create a Group</p>
           <form onSubmit={this.handleSubmit.bind(this)}>
        
        <input type="text" name="groupname" ref= "group"/>
       
        
        <input type="submit" defaultValue="Create Group" />
      </form>

      
        </section>
         <section className="centralize">
          <p>Add Users to a Group</p>
           <form >
        
        <input type="text" name="groupname" defaultValue="Group Name" />
     
        
        <input type="text" name="Add member" defaultValue="Add User" />
      
        <input type="submit" defaultValue="Add User" />
      </form>
        
        </section>

      </div>
    )
  }
}

var TodoItem = React.createClass({
  render: function(){
    return(
      <li>
        <div className="todo-item">
          <span className="item-name">{this.props.item}</span>
        </div>
      </li>
    )
  }
})
export default Group;