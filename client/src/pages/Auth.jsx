import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
const Auth = ({ isAuthenticated }) => {
  if(isAuthenticated) {
      return  <Redirect to ='/'/>
     }
    return (
        <div>
            <Login/>
                If You Dont Have An account, Created Now 
            <Register/>
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps) (Auth)