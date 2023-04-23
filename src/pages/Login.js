import avatar from '../styles/img/laptop.png'
import PictureLogin from '../styles/img/Picture1.png'
import wave from '../styles/img/wave.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2'
import React, { useState,useEffect } from 'react';
import Menu from './Menu';
import NotFound from './Error404';

const Login = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isMaster, setIsMaster] = useState(true);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
    } else if (window.location.pathname !== '/Home') {
      // Si hay datos de usuario en el localStorage pero la página actual no es Home, redirigir al usuario a Home.
      window.location.href = '/Home';
    }
  }, []);
  
  const navigator = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/loginMaster", data)
      .then((response) => {
        console.log(response.data);
        setUserDetails(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem("miValorBooleano", true);

        navigator("/Home");



        Swal.fire({
          title: "Bienvenido!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          //return <Navigate to="/home"/>

        });
      })
      .catch(() => {
        axios
          .post("http://localhost:5000/login", data)
          .then((response) => {
            console.log(response.data);
            setUserDetails(response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));
            localStorage.setItem("miValorBooleano", false);

            navigator("/Home");


            Swal.fire({
              title: "Bienvenido!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "Continuar",
            }).then(() => {


            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.response.data.message,
              icon: "error",
              confirmButtonText: "Continuar",
            });
          });
      });
  };
  console.log("2 ." + isMaster)

  return (

    <div>
    
        <div>
          <div>
            <img className='wave' src={wave} alt="wave"></img>
            <div className='container '>
              <div className='img'>
                <img src={PictureLogin} alt="login"></img>
              </div>

              <div className='login-content'>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <img src={avatar} alt="avatar"></img>
                  <h2 className="title">Login</h2>

                  <div className="form-group">
                    <input type="text" className="form-input" id="correo" placeholder="Correo" required {...register("correo", {
                      required: {
                        value: true,
                        message: "El campo requerido",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalido correo"
                      }
                    })} />
                    {errors.correo && <span className="text-danger">{errors.correo.message}</span>}
                    <label htmlFor="correo" className="form-label">Correo</label>
                  </div>
                  <div className="form-group">
                    <input type='password' className='form-input' id='contraseña' placeholder='Contraseña' required {...register("contraseña", {
                      required: {
                        value: true,
                        message: "El campo requerido",
                      },
                      minLength: {
                        value: 4,
                        message: "La contraseña debe tener minimo 4 caracteres"
                      }
                    })} />
                    <label htmlFor="password" className="form-label">Password</label>
                    {errors.contraseña && <span className="text-danger">{errors.contraseña.message}</span>}
                  </div>
                  <Link to="/SignUp">¿estas registrado? ¡Registrate aqui!</Link>
                  <button type="submit" className="form-submit" >Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    
    </div>
  )
}

export default Login;
