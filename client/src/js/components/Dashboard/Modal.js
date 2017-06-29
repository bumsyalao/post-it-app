import React, {Component} from 'react'

export default class Modalar extends Component {

  
  render() {
    return (
      <div>
         <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
  
               <form onSubmit={this.createGroup.bind(this)}>
                <div className='form-group'>
                    <input type="text" ref='group' className='form-control' placeholder='GroupName' required/>
                </div>
                               
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>

           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>

    )
  }
}