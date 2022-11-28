import { useState } from "react"
import { useRef } from "react";
import axios from 'axios'
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navigation from './Navigation';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ContentStyle.css';
import Content from "./ContentHome";
import '../css/ContentHome.css';
import Spinner from './SpinnerCircular';
const ApiHeroku=import.meta.env.VITE_API
import { io } from "socket.io-client";

const Home = () => {

    const baseURL = ApiHeroku+'api/profile/myInfo'
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const socket = useRef();


    const fetchUser = () => {
        axios.get(baseURL, { withCredentials: true })
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                navigate('/', { replace: true })
            })
    }

    useEffect(() => {
        fetchUser();
        socket.current = io("https://quienpaleer-socket-server.onrender.com");
    }, [])


    if (!user || !socket.current){
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}>
                <Spinner />
              </div>
        );
    }else{
        return (
            <div>
                <div className='layout'>
                    <div className='navegBar sticky-top'>
                        <Navigation {...user} />
                    </div>
                    <div className="side">
                        <SideBar/>
                    </div>
                    <div className="content">
                        {location.pathname === "/home" ? <Content /> : <Outlet context={{ userContext: [user, setUser], socket}}/>}
                    </div>
    
                    <div className="chat">
                    </div>
    
                    <div className="text-center mt-5 footer " style={{backgroundColor: '#ffcfa2'}}>
                        <div className="text-center text-black p-3">
                            © 2022 Copyright
                            <p>QuienPaLeer</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;