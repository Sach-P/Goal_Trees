import { combineReducers } from "redux";
import trees from "./trees";
import errors from "./errors"
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
    trees,
    errors,
    messages,
    auth
});