import React, {Component} from 'react'

export default class GoogleWelcome extends Component {
  render() {
    return (
      <div>
     <h3>One more step to sign up, we need your phone number</h3>
       <div className='well'>  
            
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group'>
                    <input type="text" ref='username' className='form-control' placeholder='Username' required/>
                </div>
                 <div className='form-group'>
                    <input type="email" ref='email' className='form-control' placeholder='Email' required/>
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

  handleSubmit(e){
    e.preventDefault()
    console.log('SWitch to Google Component')
  }
}