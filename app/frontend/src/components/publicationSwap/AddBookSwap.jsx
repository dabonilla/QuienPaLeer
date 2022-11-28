
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AttachMoneyIcon from '@mui/icons-material/ChangeCircleOutlined';
import '../css/CreateBookSale.css'
import useValidationHook from '../ValidationHook.jsx';


const ApiHeroku=import.meta.env.VITE_API


function FormSwap({ reloadPage, closeModal }) {
    
    const { handleChange, saveData, handleChangeFile, errors } = useValidationHook("swap", "/swap/create",null, reloadPage, closeModal,null)
    
    return (
        <div className="px-4 ">
            <div className='container row border-bottom border-secondary ms-1 '>
                <h1 className="fs-4 text-start col-8 ps-0 ms-0">Agregar libro</h1>
                <div className="col-4 text-end"><AttachMoneyIcon /></div>

            </div>
            <br />
            <Form onSubmit={saveData} id="publicationForm">

                <Form.Group className="mb-3" controlId="formTitle"  >
                    <Form.Label>Nombre del libro</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange} />
                    <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAuthor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text" name="author" onChange={handleChange} />
                    <p className="errorContainer ms-1 mt-2 text-danger">{errors.author}</p>
                </Form.Group>

                <Row>
                    <Col >
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Descripción </Form.Label>
                            <Form.Control as="textarea" rows={2} name="description" onChange={handleChange} />
                            <p className="errorContainer ms-1 mt-2 text-danger">{errors.description}</p>
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group className="mb-3" controlId="formInterest">
                            <Form.Label>Interés</Form.Label>
                            <Form.Control as="textarea" rows={2} name="interest" onChange={handleChange} />
                            <p className="errorContainer ms-1 mt-2 text-danger">{errors.interest}</p>
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Form.Label htmlFor="image" className="form-label">Imagen</Form.Label>
                        <Form.Control className="form-control" type="file" name="image" accept="image/png,  image/jpeg" onChange={handleChangeFile} />
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                    </Col>
                </Row>

                <div className="d-flex justify-content-center mt-2">
                    <style>

                    </style>
                    <Button className="mt-4" id='btnAddSellBookModal' variant="primary" type="submit" style={{ border: "none" }}>
                        Agregar
                    </Button>
                </div>

            </Form>
        </div>)
}
export default FormSwap;