import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_TREES, DELETE_TREE, CREATE_TREE, GET_TREE } from './types';
import { tokenConfig } from './auth';

//GET TREES
export const getTrees = () => (dispatch, getState) => {
    axios.get('/api/trees/', tokenConfig(getState)).then((res) => {
        dispatch({
            type: GET_TREES,
            payload: res.data,
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET TREE
export const getTree = (id) => (dispatch, getState) => new Promise((resolve, reject) => {
    axios.get(`/api/trees/${id}`, tokenConfig(getState)).then((res) => {
        dispatch({
            type: GET_TREE,
            payload: res.data,
        });
        resolve(res);
    }).catch(err => { reject(err); dispatch(returnErrors(err.response.data, err.response.status)) });
});

// DELETE TREE
export const deleteTree = (id) => (dispatch, getState) => {
    axios.delete(`/api/trees/${id}/`, tokenConfig(getState)).then((res) => {
        dispatch(createMessage({ deleteTree: "Tree Deleted" }));
        dispatch({
            type: DELETE_TREE,
            payload: id,
        });
    }).catch(err => console.log(err));
}

// CREATE TREE
export const createTree = (tree) => (dispatch, getState) => new Promise((resolve, reject) => {
    axios.post('/api/trees/', tree, tokenConfig(getState)).then((res) => {
        dispatch(createMessage({ createTree: "Tree Created!" }));
        dispatch({
            type: CREATE_TREE,
            payload: res.data,
        });
        resolve(res);
    }).catch(err => { reject(err); dispatch(returnErrors(err.response.data, err.response.status)) });
});