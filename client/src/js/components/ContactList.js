import React, {Component} from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import Contact from './Contact'



export default class ContactList extends Component {
    state={
    contacts: AppStore.getContacts()
  }
  
  render() {  
     

    return (  
        <div className='well'>  
            <h3>Add Contact</h3>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        
                        <th>Email</th>
                    
                        
                    </tr>
                </thead>

                <tbody>
                    {
                       this.state.contacts.map(function(contact, index){
                            return(
                                <Contact contact={contact} key={index} />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
  }
  _onChange(){
        this.setState({contacts: AppStore.getContacts()});
        console.log(this.state.contacts) 
    }   

}
