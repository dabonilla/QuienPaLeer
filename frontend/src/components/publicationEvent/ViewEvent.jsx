import React from 'react'
import "../css/ViewEvent.css"
import DatePublication from '../DatePublication.jsx';

const ViewEvent = (props) => {
    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src={props.image} />
            </div><br />
            <h5 className='text-start'>Descripción</h5>
            <p className='text-start'>{props.description}</p>
            <div className='row'>
                <div className='col'>
                    <h5>Fecha</h5>
                    <p>{props.startDate} - {props.endDate}</p>
                </div>
                <div className='col'>
                    <h5>Hora</h5>
                    <p>{props.hour}</p>
                </div>
                <div className='col'>
                    <h5>Lugar</h5>
                    <p>{props.place}</p>
                </div>
            </div>
            <DatePublication dateCreatedAt={props.createdAt}/>
        </div>
    )
}

export default ViewEvent
