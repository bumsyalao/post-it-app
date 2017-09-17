import React, { Component } from 'react'
import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions'
import toastr from 'toastr'

export default class GoogleWelcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            databaseUsers: AppStore.getdatabaseUsers(),
            numbers: AppStore.getAllUsersNumber(),
            googleDetail: AppStore.getGoogleSignup()

        };
        this._onChange = this._onChange.bind(this)
    }


    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }

    componentUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    render() {
        const email = this.state.googleDetail.email
        const uid = this.state.googleDetail.uid
        const displayName = this.state.googleDetail.displayName
        return (
            <div>
                <h3> Welcome {displayName} </h3>
                <p>One more step, we need your phone number</p>
                <div className='well'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className='form-group' >
                            <input type="text" ref='username' className='form-control' value={displayName} required />
                        </div>
                        <div className='form-group'>
                            <input type="text" ref='email' className='form-control' value={email} required />
                        </div>
                        <div className='form-group'>
                            <input type="text" ref='number' className='form-control' placeholder='Phone Number: Ex 2348066098146' pattern="[234][0-9]{12}" title="It will contain only 13 numbers and must start with 234" required />
                        </div>

                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>

                </div>

            </div>

        )
    }


    handleSubmit(e) {
        e.preventDefault()
        const contact = {
            username: this.refs.username.value.trim(),
            email: this.refs.email.value.trim(),
            number: this.refs.number.value.trim(),
            uid: this.state.googleDetail.uid,
            password: null
        }
        if (this.state.numbers.includes(this.refs.number.value)) {
            toastr.error("The phone number already exist")
        } else {
            AppActions.googleSignup(contact);
            this.refs.username.value = '';
            this.refs.email.value = '';
            this.refs.number.value = '';
        }
    }



    _onChange() {
        this.setState({ databaseUsers: AppStore.getdatabaseUsers() });
        this.setState({ numbers: AppStore.getAllUsersNumber() });
        this.setState({ googleDetail: AppStore.getGoogleSignup() });

    }
}