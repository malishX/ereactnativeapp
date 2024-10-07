import { combineReducers } from "redux";
import AuthReducer from "./auth";
import HomeReducer from './home';

export default combineReducers({
  // application: ApplicationReducer,
  auth: AuthReducer,
  home: HomeReducer,
});
