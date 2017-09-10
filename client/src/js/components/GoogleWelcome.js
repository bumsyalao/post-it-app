import React, {Component} from 'react'
import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions' 


/**
 * This component allows users to complete the Registration form after sign in with Google
 * 
 * @export
 * @class GoogleWelcome
 * @extends {Component}
 */
export default class GoogleWelcome extends Component {
   constructor(props) {
    super(props);
    this.state = {
       databaseUsers: AppStore.getdatabaseUsers(),
       numbers: AppStore.getAllUsersNumber(),
    };
     this.onChange = this.onChange.bind(this)
  }

   /**
    * @method componentWillMount
    * Adds an event Listener to the Store and fires when the component is fully mounted.
    *
    * @return {void}
    * @memberof GoogleWelcome
    */
   componentDidMount(){
        AppStore.addChangeListener(this.onChange);
    }

   /**
    * @method componentWillUnmount
    * Removes event Listener from the Store
    * 
    * @memberof GoogleWelcome
    */
    componentUnmount(){
        AppStore.removeChangeListener(this.onChange);
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
          userName: Uppercase.replace(" ", ""),
          email: this.refs.email.value.trim(),
          number: this.refs.number.value.trim(),
          uid: this.props.googleUser.uid,
          password: null
      }
            // Checks if Username and Phone number already exist
        if (this.state.databaseUsers.includes(Uppercase)){
            toastr.error("The username already exist")  
        
        }else if(this.state.numbers.includes(this.refs.number.value)){
            toastr.error("The phone number already exist")
        }else {     
       
              AppActions.google(contact);

            this.refs.username.value = '';
            this.refs.email.value = '';
            this.refs.number.value = ''; 
        }
    }

    /**
     * @method setSignUp
     * Monitors changes in the components and change the state
     * 
     * @memberof Signup
     */
    onChange(){
        this.setState({databaseUsers: AppStore.getdatabaseUsers()});
        this.setState({numbers: AppStore.getAllUsersNumber()});                  
    } 

/**
   * @method render
   * Render react component
   * 
   * @returns {String} The HTML markup for the Register
   * @memberof GoogleWelcome
   */
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
     <center><h3> Welcome {this.props.googleUser.username} </h3>
       <p>One more step, we need your phone number</p></center>
       <div>           
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group' >
                    <input type="text" ref='username' className='form-control' 
                    value= {this.props.googleUser.username} required/>
                </div>
                 <div className='form-group'>
                    <input type="email" ref='email' className='form-control' 
                    value= {this.props.googleUser.email}  required/>
                </div>
                <div className='form-group'>
                    <input type="text" ref='number' className='form-control' 
                    placeholder='Phone Number: Ex 2348066098146' 
                    pattern="[234][0-9]{12}" 
                    title="It will contain only 13 numbers and must start with 234" required/>
                </div>
                  
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            
        </div>
    
      </div>

    )
  }
  
}