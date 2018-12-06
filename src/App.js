import React, { Component } from 'react';
import './App.css';
import { NewName } from './components/nameInput.js'
import { List } from './components/nameList.js'
import { ListApp } from './components/trial.js'

class App extends Component {

  constructor(props) {
    super(props);
    if (!localStorage.getItem("List")) {
      localStorage.setItem("List", JSON.stringify([]));
    }
    this.state = {
      babyNameList: '',
      sort: 'alphabetic',
    }
    this.updateList = this.updateList.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  updateList() {
    this.setState({ babyNameList: JSON.parse(localStorage.getItem('List')) });
  }

  changeSort(event) {
    this.setState({sort: event.target.value});
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
          <br />
          <NewName updateList={this.updateList} />
          <br />
          <div onChange={this.changeSort} >
          <label>Sort: </label>&nbsp;
            <label htmlFor="alphabetic"><input id="alphabetic" type="radio" name="nameSort" value='alphabetic' defaultChecked />Alphabetic</label>
            <label htmlFor="time"><input id="time" type="radio" name="nameSort" value='time' />Time created </label>
            <label htmlFor="custom"><input id="customized" type="radio" name="nameSort" value='custom' />Custom </label>
          </div>
          <br />
          <List sort={this.state.sort} updateList={this.updateList} />
          <ListApp />
        </main>
      </div>
    );
  }
}

export default App;
