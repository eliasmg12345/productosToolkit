import { createSlice } from '@reduxjs/toolkit';
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO
} from '../types'

//cada reducer tiene su propio state

const initialState = {
    productos: [],
    error: null,
    loading: false
}

/*

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
*/

export const productoSlice = createSlice({
    name: 'productos',
    initialState,
    reducers: {
        crearNuevoProductoAction: (state, action) => {
            console.log(action);
        }
    }
})

export const { crearNuevoProductoAction } = productoSlice.actions

export default productoSlice.reducer