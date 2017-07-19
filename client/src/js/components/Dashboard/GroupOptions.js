import React, {Component} from 'react'
import AppActions from '../../actions/AppActions'

export default class GroupOptions extends Component {
  render() {
      return (
          <option>  
         {this.props.keyName.groupName}
             </option>  
      )
    }

}