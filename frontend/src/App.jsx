//import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/ContentStyle.css';
import Login from './components/registerLogin/Login'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './components/SpinnerCircular';
const ApiHeroku=import.meta.env.VITE_API



function App() {

  const baseURL = "https://127.0.0.1:5000/"+'api/profile/myInfo';
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(null);
  const navigate = useNavigate();

  // Verifica si el usuario tiene el cookie activo y funcionando
  // Si el cookie sigue funcionando se redirige de una vez al home
  // caso contrario, despliega la vista del login.
  const isUserAlreadyLogged  = async () => {

    try {
      if (response.status === 200) {
        navigate('/home', { replace: true });
      }
    } catch (err) {
      setAlreadyLoggedIn(false);
    }
  }

  useEffect(() => {
    console.log(baseURL)
    isUserAlreadyLogged();
  }, []);


  if (alreadyLoggedIn === false) {
    return (
      <div>
        <Login />
      </div>
    )
  }
  else if (alreadyLoggedIn === null) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <Spinner />
      </div>
    )
  }

}

export default App;
