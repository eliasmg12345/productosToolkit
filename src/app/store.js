import { configureStore } from '@reduxjs/toolkit'

import productoReducer from '../features/productos/productosSlice'
import alertaReducer from '../features/productos/alertaSlice'

export const store = configureStore({
    reducer: {
        productos: productoReducer,
        alertas: alertaReducer
    }
})


