import React, {Component} from 'react'
import AppActions from '../../actions/AppActions'


/**
 * Component for displaying list of groups to Users
 * 
 * @export
 * @class Groups
 * @extends {Component}
 */
export default class Groups extends Component {
render() {
      return (
           <div onClick={() => AppActions.searchUserMessage(this.props.KeyName.groupName)}>  
              <a href="#/dashboard" className="text-decoration">  {this.props.KeyName.groupName}</a>
          </div>  
      )
    }
}