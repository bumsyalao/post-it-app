import React, {Component} from 'react'
import AppStore from '../../stores/AppStore'

export default class ArchivedBox extends Component {
        constructor(props){
        super(props);
        this.state ={
           archives: AppStore.getArchiveMessage()    
        };
         this._onChange= this._onChange.bind(this)
    }

    componentWillMount ()  {
     AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount () {
      AppStore.removeChangeListener(this._onChange);
    } 

  render() {
    return (
      <div>
        <h1> Archive</h1>

      </div>

    )
  }
      _onChange(){
        this.setState({archives: AppStore.getArchiveMessage()});
    } 
}