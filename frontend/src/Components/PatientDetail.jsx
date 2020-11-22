import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

export const PatientDetail = () => {
    const params = useParams()
    const patient = useSelector((state)=> state.doc.patient)
    const target = patient.find(item => item._id === params.id)
    return (
        <div>
            <h2>{target && target.name}</h2>
            <h5>Medicine</h5>
            <p className="font-weight-bold">Name {" "} Quantity</p>
            {target && target.medicine.map(item => <p>{item.name}{" "} {item.quantity}</p>)}
            <Link to='/'>Go to home</Link>
        </div>
    )
}
