import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addPatient } from '../Redux/DocReducer/actions'

export const AddForm = () => {
    const [med, setMedicine] = useState("")
    const [qty, setQuantity] = useState("")
    const user = useSelector(state => state.auth.user)
    const [payload, setPayload] = useState({name: "", age:"", picture:"", gender:"", medicine:[],doctorId:user._id})
    const dispatch = useDispatch()
    const history = useHistory()


    const handleChange = (e) =>{
        setPayload({
            ...payload,
            [e.target.name] : e.target.value
        })
    }

    const handleClick = () => {
        let obj = {
            name: med,
            quantity: qty
        }
        console.log(obj)
        setPayload({
            ...payload,
            medicine: [...payload.medicine, obj]
        })
        setMedicine("")
        setQuantity("")
    }

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(addPatient(user._id, payload))
        alert("Added successfully")
        history.push('/dashboard')
    }

    console.log(payload)
    return (
        <div className="container">
            <div className="row my-3">
                <div className="col-12">
                    <h4>Add new patient</h4>
                </div>
            <div className="col-12">
            <form onSubmit={handleAdd}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="inputName4">Name</label>
                    <input type="text" className="form-control" id="inputName4" name="name" value={payload.name} onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                    <label for="inputAge">Age</label>
                    <input type="text" className="form-control" id="inputAge" name="age" value={payload.age} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-8">
                    <label for="inputAddress">Image URL</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Enter Image URL" name="picture" value={payload.picture} onChange={handleChange} required/>
                </div>
                <div className="form-group col-md-4">
                        <label for="inputState">Gender</label>
                        <select id="inputState" className="form-control" name="gender" value={payload.value} onChange={handleChange} required>
                            <option selected>Choose.</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    
                    <div className="form-group col-md-6">
                    <label for="inputCity">Medicine</label>
                    <input type="text" className="form-control" id="inputCity" value={med} onChange={(e)=> setMedicine(e.target.value)}/>
                    </div>
                    
                    <div className="form-group col-md-2">
                    <label for="inputZip">Quantity</label>
                    <input type="text" className="form-control" id="inputZip" value={qty} onChange={(e)=> setQuantity(e.target.value)}/>
                    </div>
                    <div className="col-md-1 mt-4 pt-1">
                        <div className="btn btn-secondary " onClick={handleClick}>+</div>
                    </div>
                </div>
                <div style={{textAlign:"left"}}>
                    {payload.medicine && payload.medicine.map(item => <p>{item.name} {" "} {item.quantity}</p>)}
                </div>
                <button type="submit" className="btn btn-primary btn-lg" >Add</button>
                </form>
            </div>
        </div>
        </div>
    )
}
