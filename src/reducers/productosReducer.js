import { createSlice } from '@reduxjs/toolkit';
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO
} from '../types'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

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
        agregarProducto: (state, action) => {
            return {
                ...state,
                loading: action.payload
            }
        },
        agregarProductoExito: (state, action) => {
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        },
        agregarProductoError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        descargarProductos: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        descargarProductosExitosa: (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        },
        descargarProductosError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
})

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            //insertar en la api
            await clienteAxios.post('/productos', producto)

            //si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))

            //alerta
            Swal.fire(
                'Corecto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true))

            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un erorr, intenta de nuevo'
            })
        }
    }

}

export function obtenerProductosAction() {
    return async dispatch => {
        dispatch(descargarProductos())

        try {
            const { data } = await clienteAxios.get('/productos')
            dispatch(descargarProductosExitosa(data))
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError())
        }
    }
}

export const {
    agregarProducto,
    agregarProductoExito,
    agregarProductoError,
    descargarProductos,
    descargarProductosExitosa,
    descargarProductosError
} = productoSlice.actions

export default productoSlice.reducer