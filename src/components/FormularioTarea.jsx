import Form from 'react-bootstrap/Form'
import { useState } from 'react'

const FormularioTarea = ({ agregarTarea }) => {
    const [nombre, setNombre] = useState("")
    const [descripcion, setDesc] = useState("")
    const [error, setError] = useState("")

    const validarDatos = (e) => {
        e.preventDefault()
        setError("")

        if (!nombre.trim() || !descripcion.trim()) {
            setError("Error: Nombre y/o descripcion vacios.")
            return
        }

        agregarTarea({ nombre, descripcion })

        setError("")
        setNombre("")
        setDesc("")
    }

    return (
        <section className="card p-2 mx-auto my-3 bg-light"
        style={{maxWidth:"500px"}}>
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
        </section>
    )
}

export default FormularioTarea