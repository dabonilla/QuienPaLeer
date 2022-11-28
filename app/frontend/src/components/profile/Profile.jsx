import React from 'react'
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import EditProfile from './EditProfile';
import '../css/Profile.css';
import * as bootstrap from 'bootstrap';
import LogoQPLBlack from '../../assets/img/QPL_Logo_Black.png';
import { AnimatedPageSmoothY, AnimatedPageNavBar } from '../AnimationPage';
import profileUnknown from '../../assets/img/profileUnknown.jpg';
import axios from 'axios';
const ApiHeroku=import.meta.env.VITE_API

export async function loader({ params }) {
    return await publicRequest.get(`profile/view/${params.userId}`)
}

const Profile = ({ myProfile }) => {
    const user = useLoaderData().data.user;
    const events = useLoaderData().data.events;
    const books = useLoaderData().data.books;
    const donations = useLoaderData().data.donations;
    const swaps = useLoaderData().data.swaps;
    const navigate = useNavigate();
    const context = useOutletContext();
    const [currentUser, setCurrentUser] = context.userContext;

    console.log({ user, events, books, donations, swaps });
    const handleShow = () => {
        const myModal = new bootstrap.Modal(document.getElementById('modalEditProfile'))
        myModal.show();
    };
    const hideModal = () => {
        const myModal = document.getElementById('modalEditProfile');
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
    };
    const handleSendMessage = async() => {

        // Crea una nueva conversación entre los dos participantes
        try {
            await axios.post(ApiHeroku+"api/chat/conversations",{receiverId: user._id}, {withCredentials: true})
        } catch (error) {
            console.log(error);
        }

        navigate('/home/messenger', {
            replace: true,
        })
    };
    const showMessageButton = () => {
        if (currentUser && user) {
            if (currentUser._id !== user._id )
                return <button className='btn' id='btnSendMessage' onClick={handleSendMessage}>Enviar Mensaje</button>
        }else{
            null
        }
    };

    const currentDate = new Date();
    return (
        <div>
            <AnimatedPageSmoothY>
                <div className='row mb-5'>
                    <div className='col-3 d-flex justify-content-center align-items-center mt-4 ms-5' style={{ backgroundColor: '#ffcfa2', borderRadius: '15px' }}>
                        <div id='userProfilePhotoView' style={user.photo ? { backgroundImage: "url(" + user.photo + ")" } : { backgroundImage: "url(" + profileUnknown + ")" }} />
                    </div>
                    <div className=' col mt-4 me-5 ms-2 rounded-4 text-center' style={{ backgroundColor: '#ffcfa2' }}>
                        <div className='m-5 p-4 d-flex flex-column align-content-center justify-content-center'>
                            <p className='lead fs-2'>{user.name} {user.lastName}</p>
                            <p className='lead fs-6 text-muted'>Usuario desde el {currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</p>
                            <span>
                                {myProfile && <button className='btn' id='btnEditProfile' onClick={handleShow}>Editar</button>}
                                {showMessageButton()}
                            </span>
                        </div>
                    </div>
                </div>


                <div className='mx-5 d-flex flex-row fs-6'>
                    <div className='col text-center'>
                        <h6 className='text-muted'>Correo Electrónico</h6>
                        <span className='fw-lighter'>{user.email}</span>
                    </div>
                    <div className="vr"></div>

                    <div className='col text-center'>
                        <h6 className='text-muted'>Teléfono</h6>
                        <span className='fw-lighter'>{user.phone}</span>
                    </div>
                </div>
            </AnimatedPageSmoothY>

            <AnimatedPageNavBar>
                <h5 className='fw-bold text-center mt-5'>Cantidad de publicaciones creadas</h5>
                <p className='text-center'>(en cada sección)</p>
                <div className='container-fluid d-flex justify-content-evenly align-content-center mb-2 pb-5'>
                    <div className='row mt-3 pt-3'>
                        <div className='col mx-5 fs-6 text-center p-4 px-3 rounded-4' style={{ backgroundColor: '#ffcfa2' }}>
                            <h4 className='fw-bold'>{books.length}</h4>
                            <p>Compra de Libros</p>
                        </div>
                        <div className='col mx-5 text-center p-3 px-3 rounded-4' style={{ backgroundColor: '#ffcfa2' }}>
                            <h4 className='fw-bold'>{swaps.length}</h4>
                            <p>Intercambio de Libros</p>
                        </div>
                        <div className='col mx-5 text-center p-4 px-3 rounded-4' style={{ backgroundColor: '#ffcfa2' }}>
                            <h4 className='fw-bold'>{donations.length}</h4>
                            <p>Donación de Libros</p>
                        </div>
                    </div>
                </div>
                <div className='mx-5' style={{ borderTop: '3px solid #ffcfa2' }}></div>
            </AnimatedPageNavBar>




            <div className='row'>
                <div className='col mt-5 pt-3'>
                    <div>
                        <p className='fs-6 text-center'>Publicaciones en <b>Compra</b> de Libros</p>
                    </div>
                    <div className='d-flex justify-content-center align-content-center'>
                        <div className='wrapper'>
                            {books.map((book, i) => (
                                <div className='item' style={{ backgroundImage: "url(" + book.image + ")", backgroundSize: 'cover' }}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='mt-5 mx-5 text-center pt-3'>
                        <div>
                            <p className='fs-6'>Publicaciones en <b>Cambio</b> de Libros</p>
                        </div>
                        <div className='d-flex justify-content-center align-content-center'>
                            <div className='wrapper'>
                                {swaps.map((book, i) => (
                                    <div className='item' style={{ backgroundImage: "url(" + book.image + ")", backgroundSize: 'cover' }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='my-5 mx-5 text-center pt-3 '>
                <div>
                    <p className='fs-6'>Publicaciones en <b>Donación</b> de Libros</p>
                </div>
                <div className='d-flex justify-content-center align-content-center'>
                    <div className='wrapper'>
                        {donations.map((book, i) => (
                            <div className='item' style={{ backgroundImage: "url(" + book.image + ")", backgroundSize: 'cover' }}></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditProfile" tabIndex={-1} aria-labelledby="modalEditProfileLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="modalEditProfileLabel">Editar perfil</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <EditProfile closeModal={hideModal} />
                        </div>
                        <div className='modal-footer'>
                            <span><img src={LogoQPLBlack} id='qplLogoNavBar' className='' /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Profile
