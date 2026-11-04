import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'

const FormularioTarea = ({ agregarTarea, editarTarea, tareaAEditar, cerrarModal }) => {
    const [nombre, setNombre] = useState("")
    const [descripcion, setDesc] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (tareaAEditar) {
            setNombre(tareaAEditar.nombre)
            setDesc(tareaAEditar.descripcion)
        } else {
            setNombre("")
            setDesc("")
        }
    }, [tareaAEditar])

    const validarDatos = (e) => {
        e.preventDefault()
        setError("")

        if (!nombre.trim() || !descripcion.trim()) {
            setError("Error: Nombre y/o descripcion vacios.")
            return
        }

        if (tareaAEditar) {
            editarTarea({
                id: tareaAEditar.id,
                nombre,
                descripcion
            })
        } else {
            agregarTarea({ nombre, descripcion })
        }

        setError("")
        setNombre("")
        setDesc("")

        if (cerrarModal) cerrarModal()
    }

    return (
        <Form onSubmit={validarDatos}>
            {error ? <p className="alert alert-danger mb-4">{error}</p> : null}

            <Form.Group className="mb-3">
                <Form.Label className="form-label">Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Nombre de la tarea'
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="form-label">Descripcion</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder='Descripcion de la tarea'
                    onChange={(e) => setDesc(e.target.value)}
                    value={descripcion} />
            </Form.Group>

            <button
                type="submit"
                className="btn btn-primary mt-2"
            >Enviar</button>
        </Form>
    )
}

export default FormularioTarea