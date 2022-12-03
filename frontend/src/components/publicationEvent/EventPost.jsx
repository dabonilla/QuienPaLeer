import React, { useState } from 'react'
import Spinner from '../SpinnerCircular';
import NoResultFound from '../NoResultFound';
import ViewEvent from './ViewEvent'
import '../css/PublicationPost.css'

export const EventPost = ({ posts, loading }) => {
    const [properties, setProperties] = useState({})
    if (loading) {
        return <div className='container'>
            <div className='col-auto p-5 text-center'> <Spinner /> </div>
        </div>
    }
    else {
        return <div className='container'>
            {posts.length == 0
                ? <NoResultFound />
                : <div>
                    <div className='row row-cols-2'>
                        {posts.map(post => (
                            <div>
                                <div key={post._id} className="col py-2 px-4 h-20 pb-4" id='infoEventsContainer'>
                                    <div className='row'>
                                        <input onClick={e => setProperties({ ...post })} type="image" data-bs-toggle="modal" data-bs-target="#modalViewEvent" className="rounded-5 imagen" src={post.image}></input>
                                    </div>
                                    <div className='row'>
                                        <p className='col text-start fw-bold'>{post.name}</p>
                                        <p className='col text-end gray-text'>{post.place}</p>
                                    </div>
                                    <p className='col text-dark text-start'>{post.startDate} - {post.endDate}</p>
                                </div>

                                <div className="modal fade" id="modalViewEvent" tabIndex={-1} aria-labelledby="modalViewEventLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="modalViewEventLabel">{properties.name}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <ViewEvent {...properties} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    }

}
export default EventPost