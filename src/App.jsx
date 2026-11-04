import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FormularioTarea from './components/FormularioTarea';
import Columna from './components/Columna'
import { tareasIniciales } from './tareasIniciales'

import { useState, useEffect } from 'react'


function App() {
  const [listaTareas, setListaTareas] = useState(() => {
    const listaGuardada = localStorage.getItem('tareas_kanban')
    return listaGuardada ? JSON.parse(listaGuardada) : tareasIniciales
  })
  const [mostrarModal, setMostrarModal] = useState(false)
  const [tareaAEditar, setTareaAEditar] = useState(null)

  useEffect(() => {
    localStorage.setItem('tareas_kanban', JSON.stringify(listaTareas))
  }, [listaTareas])

  const agregarTarea = (nuevaTarea) => {
    setListaTareas([...listaTareas, { id: Date.now(), nombre: nuevaTarea.nombre, descripcion: nuevaTarea.descripcion, estado: "pendiente" }])
  }

  const eliminarTarea = (id) => {
    const nuevaLista = [...listaTareas]
    setListaTareas(nuevaLista.filter((el => el.id !== id)))
  }

  const editarTarea = (tareaEditada) => {
    const listaEditada = listaTareas.map((tarea) => {
      if (tarea.id === tareaEditada.id) {
        return {
          ...tarea,
          nombre: tareaEditada.nombre,
          descripcion: tareaEditada.descripcion,
        }
      }
      return (tarea)
    })

    setListaTareas(listaEditada)
  }

  const moverTarea = (id, direccion) => {
    const nuevaLista = listaTareas.map((tarea) => {
      if (tarea.id === id) {
        if (direccion === "derecha") {
          if (tarea.estado === "pendiente") {
            return { ...tarea, estado: "en_proceso" }
          }
          else {
            return { ...tarea, estado: "completada" }
          }
        }

        else {
          if (tarea.estado === "completada") {
            return { ...tarea, estado: "en_proceso" }
          }
          else {
            return { ...tarea, estado: "pendiente" }
          }
        }
      }
      return (tarea)
    })

    setListaTareas(nuevaLista)
  }

  const abrirModalCrear = () => {
    setTareaAEditar(null)
    setMostrarModal(true)
  }

  const abrirModalEditar = (tarea) => {
    setTareaAEditar(tarea)
    setMostrarModal(true)
  }

  const cerrarModal = () => {
    setMostrarModal(false)
    setTareaAEditar(null)
  }

  return (
    <main className="min-vh-100 bg-primary">
      <h2 className="p-3 text-white">Kanban Board</h2>

      <div className="d-flex justify-content-around mx-3">
        <Columna
          tipo="Pendiente"
          tareas={listaTareas.filter(el => el.estado === "pendiente")}
          moverTarea={moverTarea}
          abrirModalEditar={abrirModalEditar}
          eliminarTarea={eliminarTarea} />

        <Columna
          tipo="En proceso"
          tareas={listaTareas.filter(el => el.estado === "en_proceso")}
          moverTarea={moverTarea}
          abrirModalEditar={abrirModalEditar}
          eliminarTarea={eliminarTarea} />

        <Columna
          tipo="Completadas"
          tareas={listaTareas.filter(el => el.estado === "completada")}
          moverTarea={moverTarea}
          abrirModalEditar={abrirModalEditar}
          eliminarTarea={eliminarTarea} />
      </div>

      <Modal
        show={mostrarModal}
        onHide={cerrarModal}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {tareaAEditar ? 'Editar tarea' : 'Nueva tarea'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioTarea
            agregarTarea={agregarTarea}
            editarTarea={editarTarea}
            tareaAEditar={tareaAEditar}
            cerrarModal={cerrarModal} />
        </Modal.Body>
      </Modal>


      <div className="container text-end mt-3 mb-0 pb-4">
        <Button
          variant="danger"
          onClassName="ms-auto"
          onClick={abrirModalCrear}>
          + Nueva Tarea
        </Button>
      </div>


    </main>
  )
}

export default App
