import React, {Component} from 'react'
import AppActions from '../../actions/AppActions'

export default class Groups extends Component {
  render() {

      return (

           <div onClick={() => AppActions.searchUserMessage(this.props.KeyName.groupName)}>  
                      <a href="#/dashboard" className="btn btn-default">  {this.props.KeyName.groupName}</a>
             </div>  
       

      )
    }

}