import React from 'react'
import { Route } from 'react-router-dom'
import { Login } from './Login'
import { Home } from './Home'
import { Signup } from './Signup'
import { PatientDetail } from './PatientDetail'
import { AddForm } from './AddForm'

export const Routes = () => {
    return (
        <div>
            <Route path='/' exact render={()=> <Login />}/>
            <Route path='/signup' render={()=> <Signup />}/>
            <Route path='/dashboard' render={()=> <Home />}/>
            <Route path='/add' render={()=> <AddForm />}/>
            <Route path='/details/:id' render={(props)=> <PatientDetail {...props}/>}/>
        </div>
    )
}
