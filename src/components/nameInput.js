import React, { Component } from 'react';

class ShowError extends Component {
    render() {
        if (!this.props.showErrorMsg) {
            return null;
        }
        return <p className='error-message'>*{this.props.error}</p>
    }
}
class NewName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            error: '',
            showErrorMsg: false,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChange(event) {
        event.preventDefault();
        this.setState({ input: event.target.value });
    }

    validateName() {
        let error = '';
        let list = JSON.parse(localStorage.getItem("List"));

        if (this.state.input === '') {
            error = 'Please enter a name';
        } else if (list.find((data) => { return data.name.toUpperCase() === this.state.input.toUpperCase() })) {
            error = 'Name already exists';
         }
        else {

            if (this.state.input.match(/\s/g) ? this.state.input.match(/\s/g).length > 1 : false) {
                error = 'Please limit the name to two words.'
            } if (/[^a-zA-Z\s]/g.test(this.state.input)) {
                error = 'Enter only alphabets'
            }
        }
        return error;

    }

    handleSubmit() {
        let validate = this.validateName();

        if (validate === '') {
            this.setState({ error: '', showErrorMsg: false })
            console.log("Added a new name: ", this.state.input.trim());

            let newName = {
                id: Math.floor((Math.random()*1000000000000)+1),
                name: this.state.input.trim(),
                flag: false,
            }

            let namelist = JSON.parse(localStorage.getItem("List"));
            namelist.push(newName);
            localStorage.setItem("List", JSON.stringify(namelist));
            this.props.updateList();

        } else {
            console.log("Error: ", this.state.error);
            this.setState({ error: validate, showErrorMsg: true });
        }
    }
    render() {
        return <div className='p-2'>
            <label htmlFor="inputName">Enter Name :
                <input type='text' id='inputName' placeholder='Name' onChange={this.onInputChange}></input>
                <button type='button' onClick={this.handleSubmit} >add</button>
            </label>
            <ShowError error={this.state.error} showErrorMsg={this.state.showErrorMsg} className='error-message' />
        </div>
    }
}

export { NewName };