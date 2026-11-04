import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'

const CardTarea = ({ id, nombre, descripcion, estado, moverTarea, abrirModalEditar, eliminarTarea }) => {
    return (
        <Card>
            <Card.Body className="d-flex align-items-center">
                <div className="d-flex flex-column w-100 flex-grow-1 mx-3">
                    <div className="d-flex justify-content-between mb-2">
                        <Card.Title className="text-center fs-6 fw-bold mb-0">
                            {nombre}
                        </Card.Title>

                        <Dropdown align="end">
                            <Dropdown.Toggle
                            variant="link"
                            className="text-dark p-0 text-decoration-none">
                                ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=> {abrirModalEditar({id, nombre, descripcion, estado})}}>
                                    Editar
                                </Dropdown.Item>

                                <Dropdown.Item onClick={() => {eliminarTarea(id)}} className="text-danger">
                                    Eliminar
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="d-flex align-items-center">
                        {estado !== "pendiente" && <Button
                            onClick={() => moverTarea(id, "izquierda")}
                            style={{
                                backgroundColor: '#0dcaf0',
                                borderColor: '#0dcaf0',
                                color: '#000'
                            }}>
                            {"<"}
                        </Button>}
                        
                        <Card.Text className="my-0 px-3 fs-6 fw-light">
                            {descripcion}
                        </Card.Text>

                        {estado !== "completada" && <Button
                            onClick={() => moverTarea(id, "derecha")}
                            style={{
                                backgroundColor: '#0dcaf0',
                                borderColor: '#0dcaf0',
                                color: '#000'
                            }}>
                            {">"}
                        </Button>}
                    </div>


                </div>


            </Card.Body>
        </Card>
    )
}

export default CardTarea