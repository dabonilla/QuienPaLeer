import React, { useState } from 'react'
import ViewDonation from './ViewDonation'
import NoResultFound from '../NoResultFound';
import Spinner from '../SpinnerCircular';
import '../css/PublicationPost.css'

export const DonationPost = ({ posts, loading }) => {
    const [properties, setProperties] = useState({})
    if (loading) {
        return (<div className='container'>
            <div className='col-auto p-5 text-center'> <Spinner /> </div>
        </div>)
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
                                        <p className='col text-start fw-bold'>{post.title}</p>
                                    </div>
                                    <div className='row'>
                                        <input onClick={e => setProperties({ ...post })} type="image" data-bs-toggle="modal" data-bs-target="#Modal" className="rounded-5 imagen" id='imageInputSellBook' src={post.image}></input>
                                    </div>
                                    <div className='row mt-2'>
                                        <p className='col text-start fw-bold'>{post.name}</p>
                                        <p className='col text-end gray-text' id='priceSellBook'> {post.author}</p>
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
                                                <ViewDonation {...properties} />
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
export default DonationPost