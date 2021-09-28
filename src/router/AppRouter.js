import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if( checking ){
        return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center text-secondary' style={{height:'100vh'}}>
            <div className="spinner-border " style={{width: '6rem', height: '6rem'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        )
      }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={!!uid} path='/auth' component={AuthRouter}/>
                    <PrivateRoute isAuthenticated={!!uid} exact path='/' component={CalendarScreen}/>

                    <Redirect to='/auth/login'/>
                </Switch>
            </div>
        </Router>
    )
}
