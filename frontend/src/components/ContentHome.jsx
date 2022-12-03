import homeReading from '../assets/img/homeReading.png';
import homeEvent from '../assets/img/homeEvent.jpg';
import homeBuy from '../assets/img/homeBuy.jpg';
import homeTalk from '../assets/img/homeTalking.jpg';
import homeExchange from '../assets/img/homeExchange.jpg';
import homeHeart from '../assets/img/homeHeart.jpg';

const Content = () => {
    return (
        <div>
            <div className=" py-4 d-flex justify-content-center align-content-center mt-4 h-50 w-100" style={{ backgroundColor: '#ffcfa2', borderRadius: '10px' }}>
                <div className="row d-flex justify-content-center align-content-center">
                    <div className="col ms-5 m-auto">
                        <h3 className="fw-bold">Una Comunidad Literaria</h3>
                        <h6 className="fw-light">QuienPaLeer es una WebApp que te permite interactuar con diversos usuarios interesados por el mundo del arte que conlleva la lectura.</h6>
                    </div>
                    <div className="col text-center">
                        <img className='img-fluid w-50' src={homeReading} />
                    </div>
                </div>
            </div>

            <div className='text-center mt-3'>
                <i className="bi bi-chevron-down"></i>
            </div>

            <div className='row mt-5 center mx-5'>
            <h3 className='fw-bold text-center' style={{ borderBottom: 'solid 3px #ffcfa2' }}>Interactúa</h3>
                <h6 className='text-center fw-light'>Valora las publicaciones de los demás usuarios de la comunidad y genera Chats con aquellos usuarios que te apetezca acertar acuerdos sobre algún texto o simplemente crear contactos pertenecientes a la comunidad de QuienPaLeer. </h6>
                <div className="col text-center">
                    <img className='img-fluid w-50' src={homeTalk} />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col ms-5 m-auto'>
                    <img className='ms-5 img-fluid w-50' src={homeEvent} />
                </div>
                <div className='col mt-5'>
                    <h3 className='me-5 fw-bold text-end' style={{ borderBottom: 'solid 3px #ffcfa2' }}>Eventos de Interes</h3>
                    <h6 className='me-5 text-end fw-light'>Publica y visualiza aquellos eventos relacionados a la lectura que sean de interes para la comunidad en general.</h6>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col mt-5'>
                    <h3 className='ms-5 fw-bold text-start' style={{ borderBottom: 'solid 3px #ffcfa2' }}>Compra de Libros</h3>
                    <h6 className='ms-5 text-start fw-light'>Publica y visualiza aquellos textos que estén a disposición de venta. </h6>
                </div>
                <div className='col m-auto text-end me-5 mb-3'>
                    <img className='img-fluid w-50' src={homeBuy} />
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col ms-5 m-auto'>
                    <img className='ms-5 img-fluid w-50' src={homeExchange} />
                </div>
                <div className='col mt-5'>
                    <h3 className='fw-bold text-end' style={{ borderBottom: 'solid 3px #ffcfa2' }} >Intercambio de Libros</h3>
                    <h6 className='text-end fw-light'> Muéstrale a toda la comunidad aquellos textos que desees cambiar por otro elemento literario.</h6>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col mt-5'>
                    <h3 className='ms-5 fw-bold text-start' style={{ borderBottom: 'solid 3px #ffcfa2' }}>Donación de Libros</h3>
                    <h6 className='ms-5 text-start fw-light'>Ten una buena acción con alguien más, dona aquellos textos que sientas que le harán falta a otro usuario.</h6>
                </div>
                <div className='col m-auto text-end'>
                    <img className='img-fluid w-50' src={homeHeart} />
                </div>
            </div>


        </div>

    )
}

export default Content;