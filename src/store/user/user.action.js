import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

//creates and return back the action object
export const setCurrentUser = (user) => (createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));