import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LogoQPLBlack from "../assets/img/QPL_Logo_Black.png";
import '../css/Navigation.css'
import { LinkContainer } from 'react-router-bootstrap'
import { AnimatedPageNavBar } from './AnimationPage';
import axios from 'axios';
import Swal from 'sweetalert2';
import profileUnknown from '../assets/img/profileUnknown.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ApiHeroku=import.meta.env.VITE_API

const baseURL = ApiHeroku + 'api/auth/logout'

function Navigation(user) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ place: 'events' })
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);
    const reloadPage = () => setReload(reload + 1);
    const [seed, setSeed] = useState(1);

    const handleChange = async (event) => {
        setInputs(prevInput => {
            return {
                ...prevInput, [event.target.name]: event.target.value
            }
        })
        console.log(inputs);
    }

    const handleSearch = async (event) => {
        if (inputs.filter == '') {
            navigate(`${inputs.place}/search/undefined`)
        } else {
            navigate(`${inputs.place}/search/${inputs.filter}`)
        }
    }
    const onEnter = async (event) => {
        navigate(`${inputs.place}/search/${inputs.filter}`)
    }
    // Controlador para cuando el usuario le de click al icono de cerrar sesión
    const handleLogout = async () => {

        axios.get(baseURL, { withCredentials: true })
            .then(async (response) => {
                const sucessMessage = response.data.message;

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
                    icon: 'warning',
                    title: sucessMessage
                })

                // Redirigir al login si todo sale bien
                navigate('/', { replace: true })


            })
            .catch((error) => {
                const errMessage = error.response.data.message;
            })


    };

    return (
        <AnimatedPageNavBar>
            <Navbar bg="light" variant="light" className="py-3 border border-bottom shadow-sm h-100" >

                <Navbar.Brand className="px-4 d-flex align-items-center" id='qplContainer' href="/home">
                    <span><img src={LogoQPLBlack} id='qplLogoNavBar' className='' /></span>
                    <span id='qplTitle'>QuienPaLeer</span>
                </Navbar.Brand>
                <div className="vr ms-2"></div>

                <Container>
                    <Nav>
                        <Form.Select id="selectTypeSearch" onChange={handleChange} name='place'>
                            <option value="events">Eventos</option>
                            <option value="buyBooks">Compra/Venta de libros</option>
                            <option value='changeBooks'>Cambio de libros</option>
                            <option value='donationBooks'>Donación de libros</option>
                            <option value='recommendationBooks'>Recomendación de libros</option>
                        </Form.Select>

                        <InputGroup className="ps-3">
                            <Form.Control
                                type="search"
                                placeholder="Buscar..."
                                id='searchNavBar'
                                name='filter'
                                onChange={handleChange}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                            />
                            <Button id="btnSearchNavBar" onClick={handleSearch}>
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Nav>

                    <Nav>
                        <div className="btn-group me-3">
                            <LinkContainer to={`profile/${user._id}`}>
                                <Nav.Link className='navBarLinks py-0 d-flex align-items-center' id='userNameNavContainer'>
                                    {user.name ? user.name + ' ' + user.lastName : 'Cargando...'}
                                    <div className='ms-3 text-center' id='userProfilePhoto' style={user.photo ? {backgroundImage: "url(" + user.photo +")"} : {backgroundImage: "url(" + profileUnknown +")"}}/>
                                </Nav.Link>
                            </LinkContainer>
                            <button type="button" className="btn" id='btnDropMenu' data-bs-toggle="dropdown"><i className="bi bi-caret-down-fill"></i></button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Nav.Link onClick={handleLogout} className='d-flex justify-content-center align-items-center'>
                                        <i className="navBarLinks bi bi-x-lg me-2" style={{ fontSize: 20 }}></i>
                                        Cerrar Sesión
                                    </Nav.Link>
                                </li>
                            </ul>
                        </div>
                    </Nav>

                </Container>
            </Navbar>
        </AnimatedPageNavBar>
    )
}

export default Navigation