import { createStore } from 'redux';
import { addName, checkName, customDragDrop } from './actions.js';
import { nameReducer } from './reducers';

const store = createStore(nameReducer);

const mapStateToProps = (state) => {
  return { name: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    newName: (id, name, date, flag) => {
      dispatch(addName(id, name, date, flag))
    },
    checkName: (id, flag) => {
      dispatch(checkName(id, flag))
    },
    customDragDropList: (list) => {
      dispatch(customDragDrop(list))
    }
  }
};

export { mapDispatchToProps, mapStateToProps, store }