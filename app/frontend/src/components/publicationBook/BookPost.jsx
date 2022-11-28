import React, { useState } from 'react'
import NoResultFound from '../NoResultFound';
import Spinner from '../SpinnerCircular';
import ViewBook from './ViewBook'
import 'bootstrap-icons/font/bootstrap-icons.css';
import FormBook from './AddBookSale.jsx';
import * as bootstrap from 'bootstrap';
import '../css/PublicationPost.css'

export const BookPost = ({ posts, loading, reloadPage }) => {
    const [properties, setProperties] = useState({})
    const [pub, setPub] = useState([])
    // const [reload, setReload] = useState(0);
    const [book, setBook] = useState({})
    // const reloadPage = () => setReload(reload + 1);
    const handleClick = (id) => {
        //console.log('Se hizo click', id);
        setBook(id)
        console.log("Libro:",id)
        document.getElementById('publicationForm').name.value = id.name
        document.getElementById('publicationForm').title.value = id.title
        document.getElementById('publicationForm').author.value = id.author
        document.getElementById('publicationForm').price.value = id.price
        document.getElementById('publicationForm').editorial.value = id.editorial
        document.getElementById('publicationForm').year.value = id.year
        document.getElementById('publicationForm').author.value = id.author
        document.getElementById('publicationForm').image.file = id.image
        const myModal = new bootstrap.Modal(document.getElementById('ModalEdit'))
        myModal.show();
    }
    const hideModal = () => {
        const myModal = document.getElementById('ModalEdit');
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
    };
    if (loading) {
        return (<div className='container'>
            <div className='col-auto p-5 text-center'> <Spinner /> </div>
        </div>)
    }
    else {
        return (
            <div className='container'>
                {posts.length == 0
                    ? <NoResultFound />
                    : <div>
                        <div className='row row-cols-2'>
                            {posts.map(post => (
                                <div>
                                    <div key={post._id} className="col py-2 px-4 h-20 pb-4" id='infoEventsContainer'>
                                        <div className='row'>
                                            <p className='col text-start fw-bold'>{post.title}</p>
                                        </div>
                                        <div className='row'>
                                            <input onClick={e => setProperties({ ...post })} type="image" data-bs-toggle="modal" data-bs-target="#Modal" className="rounded-5 imagen" src={post.image}></input>
                                        </div>
                                        <div className='row mt-2'>
                                            <p className='col text-start fw-bold'>{post.name}</p>
                                            <p className='col text-end gray-text' id='priceSellBook'>$ {post.price}</p>
                                            {post.actualUserId ?
                                                (<div className="col">

                                                    <button className="btn bg-info text-white border py-0 px-1" onClick={() => handleClick(post)}
                                                        data-toggle="tooltip" data-placement="bottom" title="Editar" >
                                                        <i className="bi bi-pencil-square p-2"></i>
                                                    </button>
                                                </div>) : <></>}
                                        </div>
                                    </div>
                                    <div className="modal fade" id="Modal" tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ModalLabel">{properties.title}</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <ViewBook {...properties} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                <div className="modal fade" id="ModalEdit" tabIndex={-1} aria-labelledby="ModalCreateLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <FormBook reloadPage={reloadPage} closeModal={hideModal} bookSended={book} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}
export default BookPost