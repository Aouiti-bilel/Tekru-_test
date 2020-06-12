import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {  getUsers, deleteUser  } from '../redux/userActions'
import CreateUser from '../components/CreateUser'
import UpdateUser from '../components/UpdateUser'
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import './home.css'
import Register from '../components/Register'
const Home = ({ isAuthenticated,  users, getUsers, deleteUser, me, loading }) => {
 
   
    const [hideForm, setHideForm] = useState(false)
    useEffect(() => {
       getUsers()
    }, [getUsers])
 
    if(!isAuthenticated) {
        return  <Redirect to ='/login'/>
       }

    return !me ? "wait..." : (
        <div>
            <h3> Home Page</h3>
              <table  >
              <thead>
              <tr>
            <th>Name</th>
            <th>Family Name</th>
            <th>EDit User</th>
            <th>Delete User</th>
            <th>Last Login Date</th>
            <th>Created AT</th>
             </tr>
            </thead>
            {  
                users.map(user =>{
                  return   <tbody key ={user.id}>
                      <tr>
                       <td>{user.name}</td>
                       <td>{user.famiy_name}</td>
                       <td  style={{ backgroundColor: 'white'}}> <UpdateUser userData={user}/></td>
                       <td>{me[0].id !== user.id ? (<Button variant="contained" color="secondary"  onClick= {() =>deleteUser(user.id)}>Delete</Button>) : null}</td>
                       <td> <Moment fromNow>{user.last_login}</Moment></td>
                       <td> <Moment format='YYYY/MM/DD'>{user.last_login}</Moment></td>
                      
                       </tr>
                       </tbody>
                      
                })
            }
            </table>
            <Button variant="contained" color="secondary" onClick={()=>setHideForm(!hideForm)}>Create New User</Button>
           {hideForm&& <Button ><CreateUser/></Button>  }   
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    users: state.auth.users,
    me: state.auth.user,
    loading: state.auth.loading,

 })
export default connect(mapStateToProps, {  getUsers, deleteUser })(Home)