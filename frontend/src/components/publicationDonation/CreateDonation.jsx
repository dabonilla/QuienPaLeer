import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/CreateEvent.css';
import useValidationHook from '../ValidationHook.jsx';


const CreateDonation = ({ reloadPage, closeModal }) => {

    const { handleChange, saveData, handleChangeFile, errors } = useValidationHook("donation", "/donation/create",null, reloadPage, closeModal,null)

    return (
        <div className='container rounded border p-4'>
            <div className='container row border-bottom border-secondary ms-1'>
                <h1 className="fs-4 text-start col-8 ps-0 ms-0">Crear Donación</h1>
                <i className="col-4 text-end  bi-bag-heart "></i>
            </div>
            <form className="text-start mt-3" id="publicationForm">
                <label htmlFor="title" className="form-label">Título de la publicación</label><br />
                <input className="form-control" name="title" id="title" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.title}</p>

                <label htmlFor="name" className="form-label">Nombre del libro</label><br />
                <input className="form-control" name="name" id="name" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>

                <label htmlFor="author" className="form-label">Autor</label><br />
                <input className="form-control" name="author" id="author" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.author}</p>

                <label htmlFor="editorial" className="form-label">Editorial</label><br />
                <input className="form-control" name="editorial" id="editorial" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.editorial}</p>

                <label htmlFor="image" className="form-label">Imagen</label><br />
                <input className="form-control" type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={handleChangeFile}></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                <div className="d-flex justify-content-center mt-2">
                    <button className="btn btn-dark px-5" id='btnAddSellBookModal' variant="primary" onClick={saveData}>Agregar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateDonation
