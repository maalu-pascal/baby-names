import React, { Component } from 'react';
import './App.css';
import {NewName} from './components/nameInput.js'
import {List} from './components/nameList.js'

class App extends Component {
  constructor(props){
    super(props);
    if(!localStorage.getItem("List")){
      localStorage.setItem("List",JSON.stringify([]));
    }

    this.state = {
      babyNameList: ''
    }
    
    this.updateList = this.updateList.bind(this)
  }

  updateList() {
    this.setState({babyNameList: JSON.parse(localStorage.getItem('List'))});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            BABY NAMES
          </p>
        </header>
        <main>
          <NewName updateList={this.updateList}/>
          <List />
        </main>
      </div>
    );
  }
}

export default App;
