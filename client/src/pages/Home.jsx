import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {  getUsers, deleteUser  } from '../redux/userActions'
import CreateUser from '../components/CreateUser'
import UpdateUser from '../components/UpdateUser'
import Button from '@material-ui/core/Button';
const Home = ({ isAuthenticated,  users, getUsers, deleteUser }) => {
    const [hideForm, setHideForm] = useState(false)
    useEffect(() => {
       getUsers()
    }, [getUsers])
 
    if(!isAuthenticated) {
        return  <Redirect to ='/auth'/>
       }
    return (
        <div>
            <h3> Home Page</h3>
            {
                users.map(user =>{
                  return   <div  key ={user.id}>
                      <h1>{user.name}</h1>
                       <Button variant="contained" color="success" onClick= {() => deleteUser(user.id)}>Delete</Button>
                     
                       <UpdateUser userData={user}/>
                       
                       </div>
                })
            }
            <div onClick={()=>setHideForm(!hideForm)}>Create New User</div>
           {hideForm&&  <CreateUser /> }   
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    users: state.auth.users
 })
export default connect(mapStateToProps, {  getUsers, deleteUser })(Home)