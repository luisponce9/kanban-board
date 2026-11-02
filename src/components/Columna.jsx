import CardTarea from "./CardTarea"

const Columna = ({ tipo, tareas, moverTarea, eliminarTarea }) => {
    return (
        <section className="d-flex flex-column card" style={{width:"480px"}}>
            <h4 className="m-4 fs-3 fw-light">{tipo}</h4>

            <ul className="fw-normal fs-6 mb-3 list-unstyled mx-auto" style={{maxWidth:"420px"}}>
                {tareas.map( (tarea) => (
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

        </section>
    )
}

export default Columna