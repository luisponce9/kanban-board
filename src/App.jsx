import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import FormularioTarea from './components/FormularioTarea';
import Columna from './components/Columna'
import { tareasIniciales } from './tareasIniciales'
import { useState } from 'react'

function App() {
  const [listaTareas, setListaTareas] = useState(tareasIniciales)
  const [mostrarForm, setMostrarForm] = useState(false)

  const agregarTarea = (nuevaTarea) => {
    setListaTareas([...listaTareas, { id: Date.now(), nombre: nuevaTarea.nombre, descripcion: nuevaTarea.descripcion, estado: "pendiente" }])
    setMostrarForm(false)
  }

  const eliminarTarea = (id) => {
    const nuevaLista = [...listaTareas]
    setListaTareas(nuevaLista.filter((el => el.id !== id)))
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

  return (
    <main className="min-vh-100 bg-primary">
      <h2 className="p-3 text-white">Kanban Board</h2>

      <div className="d-flex justify-content-around mx-3">
        <Columna
          tipo="Pendiente"
          tareas={listaTareas.filter(el => el.estado === "pendiente")}
          moverTarea={moverTarea}
          eliminarTarea={eliminarTarea} />

        <Columna
          tipo="En proceso"
          tareas={listaTareas.filter(el => el.estado === "en_proceso")}
          moverTarea={moverTarea} 
          eliminarTarea={eliminarTarea}/>

        <Columna
          tipo="Completadas"
          tareas={listaTareas.filter(el => el.estado === "completada")}
          moverTarea={moverTarea}
          eliminarTarea={eliminarTarea} />
      </div>

      <div className="container text-end my-3">
        <Button
          variant="danger"
          onClassName="mb-3"
          onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Cerrar" : "+ Nueva Tarea"}
        </Button>

        {mostrarForm && <FormularioTarea agregarTarea={agregarTarea}/>}
      </div>
    </main>
  )
}

export default App
