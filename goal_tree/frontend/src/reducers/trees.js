import { GET_TREES, DELETE_TREE, CREATE_TREE, CLEAR_TREES, GET_TREE } from '../actions/types.js';

const initialState = {
    trees: [],
    tree: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TREES:
            return {
                ...state,
                trees: action.payload,
            };
        case GET_TREE:
            return {
                ...state,
                tree: action.payload,
            };
        case DELETE_TREE:
            return {
                ...state,
                trees: state.trees.filter(tree => tree.id !== action.payload)
            };
        case CREATE_TREE:
            return {
                ...state,
                trees: [...state.trees, action.payload]
            };
        case CLEAR_TREES:
            return {
                ...state,
                trees: []
            };
        default:
            return state;
    }
}