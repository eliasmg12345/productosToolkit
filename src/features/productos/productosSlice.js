import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

//cada reducer tiene su propio state

const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null
}

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
        },
        obtenerProductoEliminar: (state, action) => {
            return {
                ...state,
                productoeliminar: action.payload
            }
        },
        eliminarProductoExito: (state, action) => {
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar: null
            }
        },
        productoEliminadoError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        obtenerProductoEditar: (state, action) => {
            return {
                ...state,
                productoeditar: action.payload
            }
        },
        comentarEdicionProducto: (state, action) => {
            return {
                ...state,
                productoeditar: action.payload
            }
        },
        productoEditadoExito: (state, action) => {
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
        },
        productoEditadoError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
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
            dispatch(descargarProductosError(true))
        }
    }
}

//selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async dispatch => {
        dispatch(obtenerProductoEliminar(id))
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            //si se elimina
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

        } catch (error) {
            dispatch(productoEliminadoError(true))
        }
    }
}

export function obtenerProductoAction(producto) {
    return dispatch => {
        dispatch(obtenerProductoEditar(producto))
    }
}

export function editarProductoAction(producto) {
    return async dispatch => {
        dispatch(comentarEdicionProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(productoEditadoExito(producto))
        } catch (error) {
            console.log(error);
            dispatch(productoEditadoError(true))
        }
    }
}


export const {
    agregarProducto,
    agregarProductoExito,
    agregarProductoError,
    descargarProductos,
    descargarProductosExitosa,
    descargarProductosError,
    obtenerProductoEliminar,
    eliminarProductoExito,
    productoEliminadoError,
    obtenerProductoEditar,
    comentarEdicionProducto,
    productoEditadoExito,
    productoEditadoError
} = productoSlice.actions

export default productoSlice.reducer