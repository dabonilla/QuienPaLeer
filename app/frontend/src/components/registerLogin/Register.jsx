import React from 'react'
import '../../css/Register.css'
import LogoQPLBlack from '../../assets/img/QPL_Logo_Black.png';
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const ApiHeroku=import.meta.env.VITE_API
const baseURL = ApiHeroku+'api/auth/register'

function Register() {

  const [passwordShown, setPasswordShown] = useState(false);
  const [isChecked, setCheck] = useState(false);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleCheck = event => {
    if (event.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const handleChange = (event) => {
    setInputs(prevInput => {
      return {
        ...prevInput, [event.target.name]: event.target.value
      }
    })

    if (!!errors[event.target.name])
      setErrors({
        ...errors,
        [event.target.name]: null
      })
  }

  const validateForm = () => {
    const { name, lastName, email, phone, password, confirmPassword } = inputs
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordPattern = /^[A-Za-z0-9]{8,20}$/
    const phonePattern = /^3[0-9]{9}$/
    const newErrors = {}
    if (!name || name === '') newErrors.name = 'Ingresa un nombre'
    if (!lastName || lastName === '') newErrors.lastName = 'Ingresa un apellido'
    if (!email || email === '') newErrors.email = 'Ingresa un correo'
    if (!emailPattern.test(email)) newErrors.email = 'Ingrese un correo válido'
    if (!phone || phone === '') newErrors.phone = 'Ingrese un número telefónico'
    if (!phonePattern.test(phone)) newErrors.phone = 'Ingrese un número telefónico válido. Ej: 3001234567'
    if (!password || password === '') newErrors.password = 'Ingrese una contraseña'
    if (!passwordPattern.test(password)) newErrors.password = 'La contraseña debe tener almenos 8 carácteres del alfabeto ingles'
    if (!confirmPassword || confirmPassword === '') newErrors.confirmPassword = 'Ingrese la confirmación de la contraseña'
    if (confirmPassword !== password) newErrors.confirmPassword = 'Las contraseña no coincide'
    return newErrors
  }

  const handleSumbitRegister = (event) => {
    event.preventDefault()
    const formErros = validateForm();
    if (Object.keys(formErros).length > 0) {
      setErrors(formErros)
    } else {
      axios.post(baseURL, inputs)
        .then(async (response) => {

          // Registro exitoso

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          await Toast.fire({
            icon: 'success',
            title: 'Se ha registrado correctamente'
          })

          // Redirigir al login si todo sale bien
          navigate('/', { replace: true })

          await Toast.fire({
            icon: 'info',
            title: `Se ha enviado un correo de confirmación al correo ${inputs.email}`
          })


        })
        .catch((error) => {
          const errMessage = error.response.data.message
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
            icon: 'error',
            title: errMessage
          })


        });
    }
  }

  return (
    <div className='d-flex align-content-center justify-content-center vh-100'>
      <div className="card my-auto">
        <div className="card-header" style={{backgroundColor: '#ffcfa2', borderRadius: '19px 19px 0px 0px'}}>
          <div className="row">
            <div className="col-9">
              <div className="d-flex justify-content-start align-content-center">
                <div>
                  <div className="d-flex justify-content-start">
                    <b>
                      <span className="d-block signInTitle ps-3">Registro</span>
                    </b>
                  </div>
                  <div className="d-flex justify-content-Start">
                    <span className="d-block qplTitle ps-3">QuienPaLeer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="logoQPL">
                <img src={LogoQPLBlack} />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className='row mx-2'>
              <div className='col form-group'>
                <label className="pb-1" htmlFor="name">Nombre(s)</label>
                <input id="name" name="name" type="text" className='form-control' required autoFocus autoComplete='off' onChange={handleChange} />
                {errors.name
                  ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorName">{errors.name}</p>
                  : null}
              </div>
              <div className='col'>
                <label className="pb-1" htmlFor="lastName">Apellido(s)</label>
                <input id="lastName" name="lastName" type="text" className='form-control' required autoComplete='off' onChange={handleChange} />
                {errors.lastName
                  ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorLastName">{errors.lastName}</p>
                  : null}
              </div>
            </div>

            <div className='row mt-1 mx-2'>
              <div className='col form-group'>
                <label className="pb-1" htmlFor="email">Correo electrónico</label>
                <input id="email" name="email" type="email" className='form-control' required autoComplete='off' onChange={handleChange} />
                {errors.email
                  ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorEmail">{errors.email}</p>
                  : null}
              </div>
            </div>

            <div className='row mt-2 mx-2'>
              <div className='col form-group'>
                <label className="pb-1" htmlFor="phone">Teléfono</label>
                <input id="phone" name="phone" type="tel" className='form-control' required autoComplete='off' onChange={handleChange} />
                {errors.phone
                  ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorPhone">{errors.phone}</p>
                  : null}
              </div>
            </div>

            <div className='row mx-2 mt-2'>
              <div className='col form-group'>
                <div className='row'>
                  <div className='col-9'>
                    <label className="pb-1" htmlFor="password">Contraseña</label>
                  </div>
                  <div className='col'>
                    <FaEye onClick={togglePasswordVisiblity} />
                  </div>
                </div>
                <input id="password" name="password" type={passwordShown ? "text" : "password"} className='form-control' required autoComplete='off' onChange={handleChange} />
                {errors.password
                  ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorPassword">{errors.password}</p>
                  : null}
              </div>
              <div className='col'>
                <label className="pb-1 confirmPassLabel" htmlFor="confirmPassword">Confirmar contraseña</label>
                <input id="confirmPassword" name="confirmPassword" type={passwordShown ? "text" : "password"} className='form-control' required autoComplete='off' onChange={handleChange} />
                {errors.confirmPassword
                  ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorConfPassword">{errors.confirmPassword}</p>
                  : null}
              </div>
            </div>

            <div className='row mt-4 mx-2'>
              <div className='col form-group'>
                <input className="form-check-input ms-5" type="checkbox" id="checkbox" onChange={handleCheck} />
                <label className="form-check-label ms-2" htmlFor="checkbox" >
                  Acepto los términos y condiciones de uso de la WebApp.
                </label>
              </div>
            </div>

            <div className='row my-4 mx-2'>
              <div className='col form-group'>
                <button className='btn btn-sm' id='submitRegister' type='submit' disabled={isChecked ? false : true} onClick={handleSumbitRegister}>Registrarse</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-center align-content-center">
          <p className="textDontHaveAcc">¿Ya tienes una cuenta?</p>
          <Link className="linkRegister" to='/'>Entrar</Link>
        </div>
      </div>
    </div>
  )
}

export default Register