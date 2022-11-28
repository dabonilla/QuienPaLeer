import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import '../css/CreateBookSale.css'
import useValidationHook from '../ValidationHook.jsx';

const ApiHeroku = import.meta.env.VITE_API

function FormBook({ reloadPage, closeModal, bookSended }) {
  let re = /^\d+$/;
  const {saveData,handleChange,handleChangeFile,errors} = useValidationHook("booksale","/book/create","book/edit",reloadPage,closeModal,bookSended)



  return (
    <div className="px-4 ">
      <div className='container row border-bottom border-secondary ms-1 '>
        <h1 className="fs-4 text-start col-8 ps-0 ms-0">Agregar libro</h1>
        <div className="col-4 text-end"><AttachMoneyIcon /></div>
      </div>
      <br />
      <Form onSubmit={saveData} id='publicationForm' >

        <Form.Group className="mb-3" controlId="formTitle"  >
          <Form.Label>Título de la venta</Form.Label>
          <Form.Control type="text" name="title"  onChange={handleChange} maxlength="50" />
          <p className="errorContainer ms-1 mt-2 text-danger">{errors.title}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre del libro</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} maxlength="60"/>
          <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Autor</Form.Label>
          <Form.Control type="text" name="author"  onChange={handleChange} maxlength="50" />
          <p className="errorContainer ms-1 mt-2 text-danger">{errors.author}</p>
        </Form.Group>

        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="formEditorial" >
              <Form.Label>Editorial</Form.Label>
              <Form.Control type="text" name="editorial"onChange={handleChange} maxlength="50" />
              <p className="errorContainer ms-1 mt-2 text-danger">{errors.editorial}</p>
            </Form.Group>
          </Col>
          <Col sm={4}><Form.Group className="mb-3" controlId="formYear">
            <Form.Label>Año</Form.Label>
            <Form.Control type="number" maxlength="4" min="1" max="9999" name="year"  onChange={handleChange} />
            <p className="errorContainer ms-1 mt-2 text-danger">{errors.year}</p>
          </Form.Group></Col>
        </Row>


        <Row>
          <Col>
            <Form.Label>Categoría</Form.Label>
            <Form.Select aria-label="Default select example" name="cathegory" onChange={handleChange}>
              <option>Seleccione la categoría</option>
              <option value="Biografias">Biografias</option>
              <option value="Ciencia">Ciencia</option>
              <option value="Comics">Comics</option>
              <option value="Cuentos">Cuentos</option>
              <option value="Otros">Otros</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label className='fw-bold' style={{ color: "#ffa44f" }}>Precio</Form.Label>
              <Form.Control type="text" name="price" onChange={handleChange} />
              <p className="errorContainer ms-1 mt-2 text-danger">{errors.price}</p>
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

export default FormBook;