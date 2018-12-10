import React, { Component } from 'react';
import './App.css';
import { NewName } from './components/nameInput.js';
import { List } from './components/nameList.js';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps} from './redux/store.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      babyNameList: '',
      sort: 'alphabetic',
    }
    this.changeSort = this.changeSort.bind(this);
  }

  changeSort(event) {
    this.setState({ sort: event.target.value });
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
          <NewNameContainer updateList={this.updateList} />
          <br />
          <div onChange={this.changeSort} >
            <label>Sort: </label>&nbsp;
            <label htmlFor="alphabetic"><input id="alphabetic" type="radio" name="nameSort" value='alphabetic' defaultChecked />Alphabetic</label>
            <label htmlFor="time"><input id="time" type="radio" name="nameSort" value='time' />Time created </label>
            <label htmlFor="custom"><input id="customized" type="radio" name="nameSort" value='custom' />Custom </label>
          </div>
          <br />
          <ListContainer sort={this.state.sort} updateList={this.updateList} />
        </main>
      </div>
    );
  }
}

let NewNameContainer = connect(mapStateToProps, mapDispatchToProps)(NewName);
let ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default App;

