import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    alerta: null,

}

export const alertaSlice = createSlice({
    name: 'alertas',
    initialState,
    reducers: {
        crearAlerta: (state, action) => {
            return {
                ...state,
                alerta: action.payload
            }
        },
        ocultarAlerta: (state, action) => {
            return {
                ...state,
                alerta: null
            }
        },
    }
})

export function mostrarAlertaAction(alerta) {
    return dispatch => {
        dispatch(crearAlerta(alerta))
    }
}

export function ocultarAlertaAction() {
    return dispatch => {
        dispatch(ocultarAlerta())
    }
}

export const {
    crearAlerta,
    ocultarAlerta
} = alertaSlice.actions

export default alertaSlice.reducer