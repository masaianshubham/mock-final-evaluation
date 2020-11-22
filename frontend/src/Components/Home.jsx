import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getPatient } from '../Redux/DocReducer/actions'
import Pagination from '@material-ui/lab/Pagination';
import { Cards } from './Cards'
import { logout } from '../Redux/AuthReducer/actions';

export const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const data = useSelector(state => state.doc.patient)
    const totalPage = useSelector(state => state.doc.totalPage)
    const [patient, setPatient] = useState([])
  const isAuth = useSelector(state => state.auth.isAuth)
    const history = useHistory()
    const [filter, setFilter] = useState(null)
    const [sort, setSort] = useState(null)
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPatient(data)
    }, [data])

    useEffect(() => {
        if(user._id){
            dispatch(getPatient(user._id,page,filter,sort))
        }
    }, [user,page,filter,sort])

    useEffect(() => {
        if(!isAuth){
            return history.push('/')
        }
    }, [isAuth])

    useEffect(() => {
        if(query!=="" && data){
            let ans = data
            let res = ans.filter(item => item.name.includes(query))
             setPatient(res)
        }
        else{
             setPatient(data)
        }
    }, [query])
    console.log(data)
    console.log(patient)
    const handleChange = (event, value) => {
        setPage(value);
      };
    const handleLogout = () => {
        dispatch(logout())
        history.push('/')
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-2">
                <div className="col-12">
                        <button className="btn btn-secondary float-right" onClick={handleLogout}>LOGOUT</button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row mt-4">
                    
                    <div className="col-12">
                    <div class="input-group mb-3">
                <input type="text" class="form-control" onChange={(e)=> setQuery(e.target.value)} placeholder="Patient's name" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                
            </div>
                    </div>
                </div>
            </div>
            <div style={{width:"60%", display:"flex",justifyContent:"space-around", margin:"20px auto"}}>
                <Link to="/add" ><button>Add</button></Link>
                <select onChange={(e)=> setFilter(e.target.value)}>Filter
                <option >Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
                <select onChange={(e)=> setSort(e.target.value)}>Filter
                <option >Sort By</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                </select>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Pagination count={totalPage} page={page} onChange={handleChange} />
            </div>
            {patient && patient.map(item => <Cards {...item} />)}
        </div>
    )
}
