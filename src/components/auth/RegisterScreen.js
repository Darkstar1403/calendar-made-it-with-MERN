import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: '',
        name: '',
        password: '',
        passwordConfirm: ''
    });

    const {email, name, password, passwordConfirm} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if(!/^\w{6,}$/.test(password)){
            return Swal.fire('Error', 'password must be at least 6 uppercase lowercase characters and numbers', 'error');
        }
        else if(password !== passwordConfirm){
            return Swal.fire('Error', 'Passwords do not match. Retry', 'error');
        }
        dispatch(startRegister(email, name, password));
    }

    return (
        <div className="container login-container">
            <div className="row justify-content-center">
            <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={name}
                                onChange={handleInputChange}
                                name='name'
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={email}
                                onChange={handleInputChange}
                                name='email'
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                value={password}
                                onChange={handleInputChange}
                                name='password'
                            />
                        </div>

                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                value={passwordConfirm}
                                onChange={handleInputChange}
                                name='passwordConfirm'
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                        <Link className='link' to='/auth/login'>
                             Already registered?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
