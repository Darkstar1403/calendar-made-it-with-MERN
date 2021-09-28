import React from 'react';
import './login.css';
import {useForm} from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { Link } from 'react-router-dom';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = formValues;

    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(startLogin(email,password));
    }

    return (
        <div className="container login-container">
            <div className="row justify-content-center">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='email'
                                value={email}
                                onChange={handleInputChange}
                                autoComplete= 'off'
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                value={password}
                                onChange={handleInputChange}
                                autoComplete= 'off'
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                        <Link className='link' to='/auth/register'>
                            Create new account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
