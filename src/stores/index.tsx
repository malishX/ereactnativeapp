import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

/**
 * Redux Setting
 */
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: 100000,
};

const middleware = [thunk];
if (process.env.NODE_ENV === `development`) {
  // middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { store, persistor };
