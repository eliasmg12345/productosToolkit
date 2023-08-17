import { configureStore, createSlice } from '@reduxjs/toolkit'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import productoReducer from './reducers/productosReducer'

/*
const store = createStore(
    reducer,
    compose(applyMiddleware(thunk)),

typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)
*/


export const store = configureStore({
    reducer: {
        productos: productoReducer,
    }
})

