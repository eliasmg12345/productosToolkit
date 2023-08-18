//actions de redux
import { useDispatch, useSelector } from "react-redux"
//import { crearNuevoProductoAction } from "../actions/productosActions"
import { useState } from "react"
import { crearNuevoProductoAction } from "../reducers/productosReducer"
import { useNavigate } from "react-router-dom"

const NuevoProducto = ({ history }) => {

    //state del componente
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')

    //utilizar usedispatch
    const dispatch = useDispatch()

    //accerder al state del state
    const cargando = useSelector(state => state.productos.loading)
    console.log(cargando);
    const error = useSelector(state => state.productos.error)

    const navigate = useNavigate()
    //mandart llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))

    //cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault()
        //validar formulario
        if (nombre.trim() === '' || precio <= 0) {
            return
        }
        //si no hay errores

        //crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        //redireccionar
        navigate('/')
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre    Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="percio">Precio    Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}

                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>

                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un Error</p> : null}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default NuevoProducto