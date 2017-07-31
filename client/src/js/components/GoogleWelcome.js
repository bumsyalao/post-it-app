import React, {Component} from 'react'
import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions' 

export default class GoogleWelcome extends Component {
   constructor(props) {
    super(props);
    this.state = {
       databaseUsers: AppStore.getdatabaseUsers(),
       numbers: AppStore.getAllUsersNumber(),

    };
     this._onChange= this._onChange.bind(this)
  }


   componentDidMount(){
        AppStore.addChangeListener(this._onChange);
    }

    componentUnmount(){
        AppStore.removeChangeListener(this._onChange);
    }

  render() {
    return (
      <div>
     <h3> Welcome {this.props.googleUser.username} </h3>
       <p>One more step, we need your phone number</p>
       <div className='well'>            
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group' >
                    <input type="text" ref='username' className='form-control' value= {this.props.googleUser.username} onChange={(e)=>this.props.onChange(e.target.value)} required/>
                </div>
                 <div className='form-group'>
                    <input type="email" ref='email' className='form-control' value= {this.props.googleUser.email} required/>
                </div>
                <div className='form-group'>
                    <input type="text" ref='number' className='form-control' placeholder='Phone Number: Ex 2348066098146' pattern="[234][0-9]{12}" title="It will contain only 13 numbers and must start with 234" required/>
                </div>
                  
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            
        </div>
    
      </div>

    )
  }
  onChange(e){
    e.preventDefault()
    console.log('handle change called');
    this.setState({username: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
     // Function to convert first letter of each word to capital letter   
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   } 

    // Implements the function
  const Uppercase = capitalizeFirstLetter(this.refs.username.value)

   const contact = {
          username: Uppercase.replace(" ", ""),
          email: this.refs.email.value.trim(),
          number: this.refs.number.value.trim(),
          uid: this.props.googleUser.uid,
          password: null
      }
            // Checks if Username and Phone number already exist
        if (this.state.databaseUsers.includes(Uppercase)){
        alert("The username already exist")  
        
        }else if(this.state.numbers.includes(this.refs.number.value)){
            alert("The phone number already exist")
        }else {     
       
              AppActions.google(contact);

            this.refs.username.value = '';
            this.refs.email.value = '';
            this.refs.number.value = ''; 
        }
    }
    
  

     _onChange(){
        this.setState({databaseUsers: AppStore.getdatabaseUsers()});
        this.setState({numbers: AppStore.getAllUsersNumber()});                  
    } 
}