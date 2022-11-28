import React from "react";
import '../../css/Login.css';
import LogoQPLBlack from "../../assets/img/QPL_Logo_Black.png";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate, Link } from "react-router-dom";
const ApiHeroku=import.meta.env.VITE_API
const baseURL = ApiHeroku+'api/auth/login'
const Login = () => {

  const [passwordShown, setPasswordShown] = useState(false);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


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
    const { email, password } = inputs
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordPattern = /^[A-Za-z0-9]{8,20}$/
    const newErrors = {}
    if (!email || email === '') newErrors.email = 'Ingresa un correo'
    if (!emailPattern.test(email)) newErrors.email = 'Ingrese un correo válido'
    if (!password || password === '') newErrors.password = 'Ingrese una contraseña'
    if (!passwordPattern.test(password)) newErrors.password = 'La contraseña debe tener almenos 8 carácteres del alfabeto ingles'

    return newErrors
  }

  const handleSumbitLogin = (event) => {
    event.preventDefault()
    const formErros = validateForm();
    if (Object.keys(formErros).length > 0) {
      setErrors(formErros)
    } else {
      axios.post(baseURL, {
        email: inputs.email,
        password: inputs.password
      },
      {withCredentials: true})
      .then((response) => {

        // Logueo exitoso

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
          title: 'Inicio de sesión sastifactorio'
        })

        // Redirigir al home si todo sale bien
        navigate('/home', { replace: true })


      })
      .catch((error) => {
        const errMessage = error.response.data.message
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
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


  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="d-flex align-content-center justify-content-center vh-100">
      <div className="card my-auto">
        <div className="card-header" style={{backgroundColor: '#ffcfa2', borderRadius: '19px 19px 0px 0px'}}>
          <div className="row">
            <div className="col-4">
              <div className="logoQPL">
                <img src={LogoQPLBlack} />
              </div>
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-end align-content-center">
                <div>
                  <div className="d-flex justify-content-end">
                    <b>
                      <span className="d-block signInTitle">Login</span>
                    </b>
                  </div>
                  <div className="d-flex justify-content-end">
                    <span className="d-block qplTitle fw-lighter">QuienPaLeer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className="inputEmailContainer mb-3 mx-3">
              <label htmlFor="email" className="label-form">
                Correo electrónico
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="email"
                id="email"
                required
                autoFocus
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.email
                ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorLoginEmail">{errors.email}</p>
                : null}
            </div>

            <div className="inputPasswordContainer mb-4 mx-3">
              <div className="d-flex justify-content-between align-content-between">
                <div>
                  <label htmlFor="contraseña" className="label-form">
                    Contraseña
                  </label>
                </div>
                <div className="iconEyePass">
                  <FaEye onClick={togglePasswordVisiblity} />
                </div>
              </div>
              <input
                type={passwordShown ? "text" : "password"}
                className="form-control"
                placeholder=""
                name="password"
                id="password"
                required
                onChange={handleChange}
              />
              {errors.password
                ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorLoginEmail">{errors.password}</p>
                : null}
            </div>

            <div className="d-flex justify-content-center align-content-center">
              <button
                type="submit"
                id="btnLogin"
                className="btn btn-sm mx-3 mt-2"
                onClick={handleSumbitLogin}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-center align-content-center">
          <p className="textDontHaveAcc">¿Aún no tienes una cuenta?</p>
          <Link className="linkRegister" to='/register'>Registrar</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
