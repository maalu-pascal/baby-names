import { CHECK, ADD_NAME, DRAG_DROP } from './actions.js'

const nameReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_NAME:
            let newNameDetails = {
                id: action.id,
                name: action.name,
                date: action.date,
                flag: false,
            }
            return [...state, newNameDetails];

        case CHECK:
            let modifiedList = state.map((nameDetails) => {
                if (nameDetails.id === action.id) {
                    nameDetails.flag = action.flag;
                }
                return nameDetails;
            });
            return [...modifiedList];

        case DRAG_DROP:
            return [...action.list];

        default:
            return [...state];
    }
}

export { nameReducer };
