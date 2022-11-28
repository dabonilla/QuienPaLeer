import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePublication from '../DatePublication.jsx';
import "../css/ViewPublication.css"
import { useState } from 'react'
import { publicRequest } from '../../requestMethods.js';
import Swal from 'sweetalert2'

const ViewEvent = (props) => {
    const [comment, setComment] = useState('')
    const navigate = useNavigate();
    const hideModal = () => {
        setTimeout(() => {
            navigate(`profile/${props.userId}`)
        }, 100);
    }

    function handleChange(event) {
        setComment(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault()
        const newComment = { eventId: props._id, comment: comment }
        //console.log(newComment);
        publicRequest.put("/event/comment", newComment, { withCredentials: true });
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Comentario agregado.'
        })
        document.getElementById('eventForm').reset()
        reloadPage();
        console.log('Comentario agregado.')
    }

    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src={props.image} />
            </div><br />
            <div className='row'>
                <div className='col'>
                    <h5 className='text-start'>Descripción</h5>
                    <p className='text-start'>{props.description}</p>
                </div>
                <div className='col'>
                    <div className='d-flex align-content-center justify-content-end'>
                        <Link data-bs-dismiss="modal" aria-label="Close" onClick={hideModal} className='text-black rounded-3 btn text-decoration-none' style={{ backgroundColor: '#ffcfa2' }}>
                            <i className="bi bi-person"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
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
            <div className='text-center mt-4'>
                <DatePublication dateCreatedAt={props.createdAt} />
            </div>
            <div className="mt-4">Comentarios</div>
            <div className='row'>
                {props.comments && props.comments.map((comment, i) => (
                    <div className='container border mt-3 p-2 ms-2 me-3 rounded' style={{ background: "#F5F5F5" }}>
                        <h6>{comment.nameUser}</h6>
                        <p className='mb-0'>{comment.comment}</p>
                    </div>
                ))}
            </div>
            <form className="text-start mt-3 row" id="commentForm">
                <label htmlFor="comment" className="comment-label"></label><br />
                <input className="form-control col px-4" name="comment" id="comment" type="text" onChange={handleChange} placeholder="Escribe un comentario..."></input>
                <div className="text-center col">
                    <button className="btn btn-dark px-2 text-black" id='btnCreateComment' type="submit" onClick={handleClick} style={{ backgroundColor: '#ffcfa2' }}>Agregar comentario</button>
                </div>
            </form>
        </div>
    )
}
// to={`profile/${props.userId}`}
export default ViewEvent
