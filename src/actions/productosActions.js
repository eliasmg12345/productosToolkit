import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO
} from '../types'

//crear nuevos productos

/*
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch(agregarProducto())

        try {
            dispatch(agregarProductoExito(producto))
        } catch (error) {
            dispatch(agregarProductoError(producto))
        }
    }
}


const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})

const agregarProductoExito = () => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

*/