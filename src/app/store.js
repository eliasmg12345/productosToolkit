import { configureStore } from '@reduxjs/toolkit'

import productoReducer from '../features/productos/productosSlice'

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

