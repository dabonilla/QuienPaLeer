import React from 'react'
import EventIcon from '@mui/icons-material/Event';
import '../css/CreateEvent.css'
import useValidationHook from '../ValidationHook.jsx';

const CreateEvent = ({reloadPage,closeModal}) => {

    const {handleChange,saveData,handleChangeFile,errors} = useValidationHook("event", "/event/create",null,reloadPage,closeModal,null)

    return (
        <div className='container rounded border p-4'>
            <div className='container row border-bottom border-secondary ms-1'>
                <h1 className="fs-4 text-start col-8 ps-0 ms-0">Crear evento</h1>
                <div className="col-4 text-end"><EventIcon /></div>
            </div>
            <form className="text-start mt-3" id="publicationForm">
                <label htmlFor="name" className="form-label">Nombre</label><br />
                <input className="form-control" name="name" id="name" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>
                <label htmlFor="description" className="form-label">Descripción</label><br />
                <textarea className="form-control" name="description" id="description" type="text" onChange={handleChange} ></textarea>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.description}</p>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="startDate" className="form-label">Fecha Inicio</label><br />
                        <input className="form-control" type="date" name="startDate" id="startDate" onChange={handleChange}></input>
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.startDate}</p>
                    </div>
                    <div className='col'>
                        <label htmlFor="endDate" className="form-label">Fecha Fin</label><br />
                        <input className="form-control" type="date" name="endDate" id="endDate" onChange={handleChange}></input>
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.endDate}</p>
                    </div>
                    <div className='col'>
                        <label htmlFor="hour" className="form-label">Hora</label><br />
                        <input className="form-control" type="time" name="hour" id="hour" onChange={handleChange} ></input>
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.hour}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="image" className="form-label">Imagen</label><br />
                        <input className="form-control" type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={handleChangeFile}></input>
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                    </div>
                    <div className='col'>
                        <label htmlFor="place" className="form-label">Lugar</label><br />
                        <input className="form-control" name="place" id="place" type="text" onChange={handleChange}></input>
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.place}</p>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-dark px-5" id='btnCreateEventModal' type="submit" onClick={saveData}>Crear</button>
                </div>

            </form>
        </div>
    )
}

export default CreateEvent
