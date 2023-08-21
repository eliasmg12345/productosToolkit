import { configureStore } from '@reduxjs/toolkit'

import productoReducer from '../features/productos/productosSlice'

export const store = configureStore({
    reducer: {
        productos: productoReducer,
    }
})

