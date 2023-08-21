import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { obtenerProductosAction } from "../features/productos/productosSlice"
import Producto from "./Producto"



const Productos = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        //consultar api
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
        // eslint-disable-next-line
    }, [])

    //obtener state
    const productos = useSelector(state => state.productos.productos)
    const error = useSelector(state => state.productos.error)
    const cargando = useSelector(state => state.productos.loading)

    return (
        <>
            <h2 className="text-center my-5">Listado de Produtos</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            {cargando ? <p className="text-center">Cargando</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>

                </thead>
                <tbody>
                    {productos.length === 0 ? 'no hay productos' : (
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

export default Productos