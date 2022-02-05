import {combineReducers, createStore} from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import {composeWithDevTools} from 'redux-devtools-extension';

/**
 * Redux reducers combined.
 */
const reducers = combineReducers({
  auth: authReducer,
})

/**
 * Saves redux state to local storage.
 * @param state
 */
const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {

  }
}

/**
 * Reads redux state from local storage.
 * @returns {any|undefined}
 */
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

/**
 * Application store. Contains global data of the application.
 */
const store = createStore(
  reducers,
  loadFromLocalStorage(),
  composeWithDevTools()
)
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch