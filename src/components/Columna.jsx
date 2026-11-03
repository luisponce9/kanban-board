import CardTarea from "./CardTarea"
import Badge from 'react-bootstrap/Badge'

const Columna = ({ tipo, tareas, moverTarea, eliminarTarea }) => {
    return (
        <section className="d-flex flex-column card" style={{ width: "480px" }}>
            <div className="d-flex align-items-center">
                <h4 className="my-4 ms-4 me-3 fs-3 fw-light">{tipo}</h4>

                <Badge className="mt-1 ms-0" bg="secondary" pill
                    style={{ fontSize: "14px" }}>
                    {tareas.length}
                </Badge>
            </div>

            {tareas.length === 0 ? (
                <div className="p-3 text-center text-muted border border-dashed rounded mt-2 mb-4">
                    <small className="fst-italic">No hay tareas.</small>
                </div>
            ) : (
                <ul className="fw-normal fs-6 mb-3 list-unstyled mx-auto" style={{ maxWidth: "420px" }}>
                    {tareas.map((tarea) => (
                        <li key={tarea.id} className="mb-3">
                            <CardTarea
                                id={tarea.id}
                                nombre={tarea.nombre}
                                descripcion={tarea.descripcion}
                                estado={tarea.estado}
                                moverTarea={moverTarea}
                                eliminarTarea={eliminarTarea}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default Columna