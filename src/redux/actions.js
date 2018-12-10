//Actions
const CHECK = 'CHECK';
const ADD_NAME = 'ADD_NAME';
const DRAG_DROP = 'DRAG_DROP';

//Action creators
const checkName = (id, flag) => {
    return {
        type: CHECK, 
        id,
        flag,
    }
}

const addName = (id, name, date, flag) => {
    return {
        type: ADD_NAME,
        id,
        name,
        date,
        flag
    }
}

const customDragDrop = (list)=> {
    return {
        type: DRAG_DROP,
        list
    }
}

export { checkName, addName, customDragDrop, ADD_NAME, CHECK, DRAG_DROP }