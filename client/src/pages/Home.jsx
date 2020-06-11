import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout, getUsers, deleteUser  } from '../redux/userActions'
const Home = ({ isAuthenticated, logout, users, getUsers, deleteUser }) => {
    useEffect(() => {
       getUsers()
    }, [getUsers])
 
    if(!isAuthenticated) {
        return  <Redirect to ='/auth'/>
       }
    return (
        <div>
            <h3> here is where you wanna List the table of all users</h3>
            <button onClick={()=>logout()}>Logout</button>
            {
                users.map(user =>{
                  return   <div><h1 key ={user.id}>{user.name}</h1> <button onClick= {() => deleteUser(user.id)}>Delete</button></div>
                })
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    users: state.auth.users
 })
export default connect(mapStateToProps, { logout, getUsers, deleteUser })(Home)