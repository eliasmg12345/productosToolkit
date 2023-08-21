import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { borrarProductoAction, obtenerProductoAction } from "../features/productos/productosSlice"

//redux


const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto

  const dispatch = useDispatch()
  const navigate = useNavigate() //habilitar para redireccion

  //confirmar si desea eliminar
  const confirmarEliminarProducto = id => {
    //preguntar al usuario
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        //pasar al action
        dispatch(borrarProductoAction(id))
      }
    })

  }

  //funcion que redirige de forma programada

  const redireccionarEdicion = producto => {
    dispatch(obtenerProductoAction(producto))
    navigate(`/productos/editar/${producto.id}`)
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td><span className="font-weight-bold">$ {precio}</span></td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Producto